import sys
import datetime
import time
import pymongo


def increment_date(date):
    date = datetime.datetime.strptime(date, "%Y-%m-%d")
    new_month = date.month % 12 + 1

    if date.month == 12:
        new_year = date.year + 1
    else:
        new_year = date.year

    if date.month == 3 or date.month == 5 or date.month == 8 or date.month == 10:
        if date.day == 31:
            new_day = 30
        else:
            new_day = date.day

    elif date.month == 1:
        if date.year % 4:
            if date.day > 27:
                new_day = 28
            else:
                new_day = date.day
        else:
            if date.day > 26:
                new_day = 27
            else:
                new_day = date.day

    else:
        new_day = date.day

    new_date = str(new_year) + "-" + str(new_month) + "-" + str(new_day)
    return new_date


def get_transactions():
    client = pymongo.MongoClient("mongodb://localhost:27017")
    db = client.progappjs
    pending_transactions = db.transactions.find({"status": "pending"})
    pending_transactions.sort([("created_date", pymongo.ASCENDING)])
    return pending_transactions


# TODO: Error handling for wrong sender info
def do_transaction(transaction):
    client = pymongo.MongoClient("mongodb://localhost:27017")
    db = client.progappjs
    source = db.users.find_one({"username": transaction["source"]})

    if source["balance"] >= transaction["amount"]:
        update_source = db.users.update_one(
            {"username": transaction["source"],
             "pending_transaction": {"$ne": transaction["_id"]}},
            {"$inc": {"balance": -transaction["amount"]},
             "$push": {"pending_transaction": transaction["_id"]}})

        update_dest = db.users.update_one(
            {"username": transaction["destination"],
             "pending_transaction": {"$ne": transaction["_id"]}},
            {"$inc": {"balance": +transaction["amount"]},
             "$push": {"pending_transaction": transaction["_id"]}})

        update_transaction = db.transactions.update_one(
            {"_id": transaction["_id"]}, {"$set": {"status": "committed"}})

        update_source = db.users.update_one(
            {"username": transaction["source"]},
            {"$pull": {"pending_transaction": transaction["_id"]}})

        update_dest = db.users.update_one(
            {"username": transaction["destination"]},
            {"$pull": {"pending_transaction": transaction["_id"]}})

        update_transaction = db.transactions.update_one(
            {"_id": transaction["_id"]},
            {"$set": {"status": "done"}})
    else:
        print("Source is BROKE, transaction canceled")
        update_transaction = db.transactions.update_one(
            {"_id": transaction["_id"]}, {"$set": {"status": "cancelled"}})


def do_standing_order(old_transaction):
    client = pymongo.MongoClient("mongodb://localhost:27017")
    db = client.progappjs

    new_date = increment_date(old_transaction["date"])
    new_transaction = {"source": old_transaction["source"],
                       "destination": old_transaction["destination"],
                       "amount": old_transaction["amount"],
                       "type": old_transaction["type"],
                       "date": new_date,
                       "reference": old_transaction["reference"],
                       "created_date": old_transaction["created_date"],
                       "status": "pending"}
    db.transactions.insert_one(new_transaction)
    do_transaction(old_transaction)


if __name__ == '__main__':
    # TODO: ONLY RUNS ON WORK DAY!
    while True:
        now = datetime.datetime.now()
        pending_transactions = get_transactions()

        for transaction in pending_transactions:
            if transaction["type"] == "sofort":
                print(transaction)
                do_transaction(transaction)

            else:
                if now.hour == 9 and now.minute == 0 and now.second == 0:
                    transaction_date = datetime.datetime.strptime(transaction["date"], "%Y-%m-%d")
                    if transaction_date.year == now.year and transaction_date.month == now.month \
                            and transaction_date.day == now.day:
                        if transaction["type"] == "normal":
                            print(transaction)
                            do_transaction(transaction)
                        elif transaction["type"] == "standing_order":
                            print(transaction)
                            do_standing_order(transaction)

        time.sleep(3)
