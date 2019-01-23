import datetime
import time
import pymongo


def increment_date(date):

    """
    This method calculate the next date in a standing order transaction.
    :param date: current execution date of the transaction
    :return: execution date in next month of the transaction (in String)
    """

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
            if date.day > 28:
                new_day = 29
            else:
                new_day = date.day
        else:
            if date.day > 27:
                new_day = 28
            else:
                new_day = date.day

    else:
        new_day = date.day

    new_date = str(new_year) + "-" + str(new_month) + "-" + str(new_day)
    return new_date


def get_transactions():
    """
    This method finds all pending transactions in the database, sort them after created date and returns them as a list
    :return: list of pending transactions
    """

    client = pymongo.MongoClient("mongodb://localhost:27017")
    db = client.progappjs
    pending_transactions = db.transactions.find({"status": "pending"})
    pending_transactions.sort([("created_date", pymongo.ASCENDING)])
    return pending_transactions


def do_transaction(transaction):
    """
    This method executes a pending transaction
    :param transaction: the input pending transaction
    :return: None
    """

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
            {"username": transaction["destination_username"],
             "pending_transaction": {"$ne": transaction["_id"]}},
            {"$inc": {"balance": +transaction["amount"]},
             "$push": {"pending_transaction": transaction["_id"]}})

        update_transaction = db.transactions.update_one(
            {"_id": transaction["_id"]}, {"$set": {"status": "committed"}})

        update_source = db.users.update_one(
            {"username": transaction["source"]},
            {"$pull": {"pending_transaction": transaction["_id"]}})

        update_dest = db.users.update_one(
            {"username": transaction["destination_username"]},
            {"$pull": {"pending_transaction": transaction["_id"]}})

        update_transaction = db.transactions.update_one(
            {"_id": transaction["_id"]},
            {"$set": {"status": "done"}})
    else:
        print("Source is BROKE, transaction canceled")
        update_transaction = db.transactions.update_one(
            {"_id": transaction["_id"]}, {"$set": {"status": "cancelled"}})


def do_standing_order(old_transaction):
    """
    This method executes a pending standing order transaction.
    It executes the transaction as a normal transaction and creates a new one with next execution date
    :param old_transaction: the transaction that is to be executed
    :return: None
    """

    client = pymongo.MongoClient("mongodb://localhost:27017")
    db = client.progappjs

    new_date = increment_date(old_transaction["date"])
    new_transaction = {"source": old_transaction["source"],
                       "destination": old_transaction["destination"],
                       "destination_username": old_transaction["destination_username"],
                       "amount": old_transaction["amount"],
                       "type": old_transaction["type"],
                       "date": new_date,
                       "reference": old_transaction["reference"],
                       "created_date": old_transaction["created_date"],
                       "status": "pending"}
    db.transactions.insert_one(new_transaction)
    do_transaction(old_transaction)


if __name__ == '__main__':
    while True:
        now = datetime.datetime.now()
        pending_transactions = get_transactions()

        for transaction in pending_transactions:
            if transaction["type"] == "now":
                print(transaction)
                do_transaction(transaction)

            else:
                if now.hour == 9 and now.minute == 0 and now.second == 0:
                    transaction_date = datetime.datetime.strptime(transaction["date"], "%Y-%m-%d")
                    if transaction_date.year == now.year and transaction_date.month == now.month \
                            and transaction_date.day == now.day:
                        if transaction["type"] == "date":
                            print(transaction)
                            do_transaction(transaction)
                        elif transaction["type"] == "standing":
                            print(transaction)
                            do_standing_order(transaction)

        time.sleep(2)
