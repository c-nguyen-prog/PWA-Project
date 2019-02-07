import subprocess
import sys

import tornado.ioloop
import tornado
import tornado.web
import tornado.gen
import tornado.httpserver
import tornado.escape
import tornado.websocket
import json
import bcrypt
import motor.motor_tornado
import pymongo
import requests

import os
import ssl
import datetime
import random
from concurrent.futures import ThreadPoolExecutor
from tornado import options
from Push import send_web_push
from PushSettings import *
from TransactionScheduler import Scheduler

executor = ThreadPoolExecutor(8)  # declare 8 threads
scheduler = None

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("IONIC SERVER REST API")


"""
POST /login
Function to handle login process, json format:
    {
        "email": String,
        "password": String
    }
"""
class LogInHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.set_header("Access-Control-Allow-Headers", "access-control-allow-origin,authorization,content-type")

    def get(self):
        print("get")

    # Function to handle HTTP POST Request for Log in from Client side
    async def post(self):

        data = json.loads(self.request.body)                                       # Get body of POST request
        username = data["email"]
        password = data["password"]
        print("SIGNIN REQ: " + str(data))
        executor.submit(await self.check(username, password))

    async def check(self, username, password):
        try:
            client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')  # Connect to MongoDB Server
            db = client.progappjs                                                  # Get database progappjs
            document = await db.users.find_one({"username": username})             # Search username DB
            if document is not None:                                               # Found matching user in DB
                print(document)
                if document["status"] == "active":                                 # User account is active
                    salt = document["salt"]                                        # Get user's salt from DB
                    hashed_pass = bcrypt.hashpw(password.encode("utf8"), salt)     # Hash input password with salt

                    if hashed_pass == document["password"]:                        # Input password matches
                        json_response = {
                            "status": 'success',
                            "user": {
                                "name": document["username"]
                            }
                        }
                        self.write(json.dumps(json_response))
                        self.set_header('Content-Type', 'application/json')
                        print(json_response)
                        self.finish()

                    else:                                                          # Input password wrong
                        json_response = {
                            "status": 'fail',
                            "reason": "no-match"
                        }
                        self.write(json.dumps(json_response))
                        self.set_header('Content-Type', 'application/json')
                        print(json_response)
                        self.finish()
                else:                                                              # User account pending/inactive
                    json_response = {
                        "status": 'fail',
                        "reason": "inactive"
                    }
                    self.write(json.dumps(json_response))
                    self.set_header('Content-Type', 'application/json')
                    print(json_response)
                    self.finish()

            else:                                                                  # User doesn't exist
                json_response = {
                    "status": "fail",
                    "user": {
                        "name": "N/A"
                    }
                }
                self.write(json.dumps(json_response))
                self.set_header('Content-Type', 'application/json')
                print(json_response)
                self.finish()
        except:
            print("error")


"""
POST /signup
Function to handle sign up request, json format: 
{
    title = String
    first_name = String
    last_name = String
    birthday = String
    email = String
    password = String
    phone = String
    address = String
    zip = String
    city = String
    tin = String
    nationality = String
}
"""
class SignUpHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.set_header("Access-Control-Allow-Headers", "access-control-allow-origin,authorization,content-type")

    def get(self):
        print("get")

    # Function to handle HTTP POST Request for Sign up from client
    async def post(self):
        data = json.loads(self.request.body)                                       # Get body of POST request
        print("SIGNUP REQ: " + str(data))
        executor.submit(await self.check(data))

    async def check(self, data):
        title = data["title"]
        first_name = data["name"]
        last_name = data["surName"]
        birthday = data["birthdate"]
        username = data["email"]
        password = data["password"]
        phone = data["phone"]
        address = data["address"]
        zip = data["zipcode"]
        city = data["city"]
        tin = data["tin"]
        nationality = data["nationality"]
        client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')      # Connect to MongoDB server
        db = client.progappjs                                                      # Get database progappjs
        document = await db.users.find_one({"username": username})                 # Checks DB for username
        if document is not None:                                                   # Username already existed
            print(document)
            json_response = {
                "status": "fail"
            }
            self.write(json.dumps(json_response))                                  # Return fail response
            self.set_header('Content-Type', 'application/json')
            print(json_response)
            self.finish()

        else:                                                                      # Username is available
            salt = bcrypt.gensalt()                                                # Generate a random salt
            hashed_pass = bcrypt.hashpw(password.encode("utf8"), salt)             # Hash the password with salt
            generated_iban = self.generate_iban()
            print(generated_iban)
            new_user = await db.users.insert_one({"_id": username,
                                                  "username": username,
                                                  "password": hashed_pass,
                                                  "salt": salt,
                                                  "name": {
                                                      "title": title,
                                                      "last_name": last_name,
                                                      "first_name": first_name
                                                  },
                                                  "birthday": birthday,
                                                  "phone": phone,
                                                  "address": {
                                                      "co": "co",
                                                      "address": address,
                                                      "zip": zip,
                                                      "city": city
                                                  },
                                                  "tax_id": tin,
                                                  "nationality": nationality,
                                                  "iban": generated_iban,
                                                  "balance": 0,
                                                  "type": "user",
                                                  "status": "pending",
                                                  "pending_transaction": [],
                                                  "subscription_info": [],
                                                  "online": False
                                                  })
            json_response = {
                "status": "success"
            }
            self.write(json.dumps(json_response))
            self.set_header('Content-Type', 'application/json')
            print(json_response)
            self.finish()

    def generate_iban(self):
        client = pymongo.MongoClient('mongodb://localhost:27017')           # Connect to MongoDB server
        db = client.progappjs                                               # Get database progappjs
        land_code = "131400"                                                # Land code: DE00
        bank_code = "50030100"                                              # BLZ: 500 = Hessen, 3 = Privatbank, 0100
        created = False
        while not created:
            random_number = random.sample(range(0, 10), 10)                 # 10-digit bank account number
            account_number = ""
            for number in random_number:
                account_number += str(number)
            temp_iban = bank_code + account_number + land_code              # 24-digit code
            check_digit = 98 - int(temp_iban) % 97
            if check_digit < 10:
                check_digit = str(check_digit) + "0"
            iban = "DE" + str(check_digit) + str(bank_code) + str(account_number)
            document = db.users.find_one({"iban": iban})
            if document is not None:                                        # if iban already existed in DB
                created = False
            else:
                created = True

        return iban


"""
POST /transaction
Function to handle request for a new transaction, json format: 
{
    "source": String source_username,
    "destination": String iban,
    "amount": Float amount,
    "type": String [now/date/standing]
    "date": String date YY-MM-DD,
    "reference": String reference
}
"""
class TransactionHandler(tornado.web.RequestHandler):

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.set_header("Access-Control-Allow-Headers", "access-control-allow-origin,authorization,content-type")

    def get(self):
        pass

    def options(self):
        self.set_status(204)
        self.finish()

    async def post(self):
        client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')  # Connect to MongoDB server
        db = client.progappjs                                                  # Get database progappjs

        data = json.loads(self.request.body)                                   # Get json request for transaction
        print("TRANSACTION REQ:" + str(data))

        source = data["source"]
        destination = data["destination"]
        amount = data["amount"]
        type = data["type"]
        date = data["date"]
        reference = data["reference"]
        now = datetime.datetime.now()
        created_date = str(now.year) + "-" + str(now.month) + "-" + str(now.day)
        source_user = await db.users.find_one({"username": source})
        source_name = source_user["name"]["first_name"] + " " + source_user["name"]["last_name"]

        destination_user = await db.users.find_one({"iban": destination})
        if destination_user is not None:
            destination_username = destination_user["username"]
            destination_name = destination_user["name"]["first_name"] + " " + destination_user["name"]["last_name"]
            transaction = {
                            "source": source,                                       # Create new transaction: initial
                            "source_name": source_name,
                            "destination": destination,
                            "destination_username": destination_username,
                            "destination_name": destination_name,
                            "amount": amount,
                            "type": type,
                            "date": date,
                            "reference": reference,
                            "created_date": created_date,
                            "status": "initial"}

            db.transactions.insert_one(transaction)                                # Add new transaction to db
            executor.submit(await self.pending_transaction(transaction))           # Set transaction as pending
            json_response = {
                "status": "OK"
            }
        else:
            print("Destination IBAN not found")
            json_response = {
                "status": "fail"
            }
        self.write(json.dumps(json_response))
        self.set_header('Content-Type', 'application/json')
        print(json_response)
        self.finish()

    # TODO: Error handling for wrong sender info
    async def pending_transaction(self, transaction):
        client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')  # Connect to MongoDB server
        db = client.progappjs                                                  # Get transactions collection
        source = await db.users.find_one({"username": transaction["source"]})
        update_transaction = await db.transactions.update_one(
                {"_id": transaction["_id"]}, {"$set": {"status": "pending"}})


"""
POST /user/info
Function to handle request for user info (Settings), json format:
{
    "username": String,
    //session_id
}
"""
class UserInfoHandler(tornado.web.RequestHandler):

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.set_header("Access-Control-Allow-Headers", "access-control-allow-origin,authorization,content-type")

    def get(self):
        pass

    # Function to handle HTTP POST Request for user info
    async def post(self):
        data = json.loads(self.request.body)                                   # Get json request for transaction
        print(data)
        username = data["username"]
        client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')  # Connect to MongoDB server
        db = client.progappjs                                                  # Get database progappjs
        document = await db.users.find_one({"username": username})             # Search username in DB
        if document is not None:
            name = document["name"]
            address = document["address"]
            json_response = {
                "title": name["title"],
                "last_name": name["last_name"],
                "first_name": name["first_name"],
                "birthday": document["birthday"],
                "phone": document["phone"],
                "tax_id": document["tax_id"],
                "nationality": document["nationality"],
                "address": address["address"],
                "co": address["co"],
                "zip": address["zip"],
                "city": address["city"]
            }
            self.write(json.dumps(json_response))
            self.set_header('Content-Type', 'application/json')
            print(json_response)
            self.finish()


"""
POST /user/transactions
Function to handle request for a user's transaction list (Overview Page), json format:
{
    "username": String,
    //session_id
}
"""
class UserTransactionsHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.set_header("Access-Control-Allow-Headers", "access-control-allow-origin,authorization,content-type")

    def get(self):
        pass

    def options(self):
        self.set_status(204)
        self.finish()

    # Function to handle HTTP POST Request for user transaction
    async def post(self):
        data = json.loads(self.request.body)                                   # Get json request for transaction
        print(data)
        username = data["username"]
        client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')  # Connect to MongoDB server
        db = client.progappjs                                                  # Get database progappjs
        document = await db.users.find_one({"username": username})             # Search username in DB
        #print(document)
        balance = document["balance"]
        iban = document["iban"]
        cursor = db.transactions.find({"$or": [{"destination": iban}, {"source": username}]}, {"_id": 0})
        cursor.sort('_id', pymongo.DESCENDING)
        docs = await cursor.to_list(length=1000)
        json_response = {
            "balance": balance,
            "transactions": docs
        }
        print(json_response)
        self.write(json.dumps(json_response))
        self.set_header('Content-Type', 'application/json')
        self.finish()


class ContactHandler(tornado.web.RequestHandler):

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.set_header("Access-Control-Allow-Headers", "access-control-allow-origin,authorization,content-type")

    def get(self):
        pass

    # Function to handle HTTP POST Request for user info
    async def post(self):
        data = json.loads(self.request.body)                                   # Get json request for transaction
        print("USER TRANSACTIONS REQ" + str(data))
        name = data["name"]
        email = data["email"]
        phone = data["phoneNumber"]
        message = data["message"]
        client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')  # Connect to MongoDB server
        db = client.progappjs                                                  # Get database progappjs

        user_message = {
            "name": name,
            "email": email,
            "phone": phone,
            "message": message
        }
        json_response = {
            "status": "success"
        }

        db.messages.insert_one(user_message)                                    # Add new message to db

        self.write(json.dumps(json_response))
        self.set_header('Content-Type', 'application/json')
        print(json_response)
        self.finish()


"""
POST /subscription
Function to handle request for push notification subscription, json format:
{
    username: String,
    subscription_info: {
                         "endpoint": "https://updates.push.services.mozilla.com/push/v1/gAA...",
                         "keys": {
                                    "auth": "k8J...",
                                    "p256dh": "BOr..."
                                 }
                       }
}
"""
class PushSubscriptionHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.set_header("Access-Control-Allow-Headers", "access-control-allow-origin,authorization,content-type")

    def get(self):
        pass

    def options(self):
        self.set_status(204)
        self.finish()

    # TODO: Check for duplicate before adding to DB
    async def post(self):
        data = json.loads(self.request.body)
        print(data)
        username = data["username"]
        subscription_info = data["subscription_info"]
        client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')  # Connect to MongoDB server
        db = client.progappjs
        document = await db.users.find_one({"username": username})
        if document is not None:
            result = await db.users.update_one({"username": username},
                                               {"$push": {"subscription_info": subscription_info}})
            json_response = {
                "status": "OK",
                "public_key": PUBLIC_KEY
            }
        else:
            json_response = {
                "status": "fail"
            }
        print(json_response)
        self.write(json.dumps(json_response))
        self.set_header('Content-Type', 'application/json')
        self.finish()


"""
POST /push
Function to handle request for push notification, json format:
{
    username: String,
    message: String
}
"""
class PushHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.set_header("Access-Control-Allow-Headers", "access-control-allow-origin,authorization,content-type")

    def get(self):
        pass

    def options(self):
        self.set_status(204)
        self.finish()

    # TODO: Add sending notification when receiving transaction, add to DB when user is offline
    async def post(self):
        data = json.loads(self.request.body)
        print(data)
        username = data["username"]
        client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')  # Connect to MongoDB server
        db = client.progappjs
        document = await db.users.find_one({"username": username})
        if document is not None:
            subscription_infos = document["subscription_info"]
            if len(subscription_infos) > 0:
                for subscription_info in subscription_infos:
                    status = send_web_push(subscription_info, data["message"])

        json_response = {
            "status": status
        }
        print(json_response)
        self.write(json.dumps(json_response))
        self.set_header('Content-Type', 'application/json')
        self.finish()


class PushTestHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.set_header("Access-Control-Allow-Headers", "access-control-allow-origin,authorization,content-type")

    def get(self):
        pass

    def options(self):
        self.set_status(204)
        self.finish()

    async def post(self):
        subscription_info = []
        # local chrome
        subscription_info.append({
            "endpoint":"https://fcm.googleapis.com/fcm/send/c37QRTHs__w:APA91bGASHOs8eUJp35gNK80s1lBZoYye4Gj7LpmzrTbZ32U3s-I1IyBUGEMf53DbLXP2MMwtGFS9A_dShFAIWtzhFICkoZHa2MSR8jj1sC6kF2Imxl6X8eHTjN3gs6eO1HkMpLGXPcs",
            "expirationTime": "null",
            "keys": {
                        "p256dh":"BGhR6uT-mVsCZyQ19qhd5MM6JqHO5JLWzO4XLd-o8k5_Z73Qk7cDxSer9i4FC21Dw_o79SFqezJcjoymIx_u0dQ",
                        "auth":"QJeM08qGmHypxOMSy2jzTA"
                    }
         })
        # local firefox
        subscription_info.append({
            "endpoint": "https://updates.push.services.mozilla.com/wpush/v2/gAAAAABcUu-gHfn_2wLAVI3c8TRGNAKbgfjM0ffq6G8WPuL23f67FEwXAYq6wQrogNUlKNSeIsP4WZHcOSUuD9SxB9jc0BUsAfcECVrDVlJIWptLln1mw5EiyAeMl5cmBEqTYLXRCKLbGS1hrKb4nNbge9PoJRweeIb96FXnox-blk7s7cw6XL0",
            "keys": {
                "auth": "CUWP9340yuCzRtOSUmm-UQ",
                "p256dh": "BLuI7_4iZQoUNV-QJlwQsNt0IptbZYfx0tqhDpEpWvCh7agF3Wud0hiB8Cvxmwc0JLQV-pfQGgoaOcV-kptgveA"
            }
        })
        for sub in subscription_info:
            status = send_web_push(sub, "You have received 1000€ XD")
            json_response = {
                "status": status
            }
        print(json_response)
        self.write(json.dumps(json_response))
        self.set_header('Content-Type', 'application/json')
        self.finish()


class LoggingHandler(tornado.websocket.WebSocketHandler):
    def __init__(self, *args, **kwargs):
        super(LoggingHandler, self).__init__(*args, **kwargs)
        self.username = ""
        self.set_offline = False

    def check_origin(self, origin):
        print("Connection Received from ", origin)
        return True

    def open(self):
        pass

    async def on_message(self, message):
        data = json.loads(message)
        self.username = data["username"]
        status = data["status"]
        client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')  # Connect to MongoDB server
        db = client.progappjs
        document = await db.users.find_one({"username": self.username})
        if status == "online":
            if document is not None:
                if not document["online"]:
                    print(self.username + " went Online")
                    await self.set_user_offline(self.username, True)
                    messages = document["pending_notifications"]
                    if messages is not None:
                        for message in messages:
                            subscription_infos = document["subscription_info"]
                            if len(subscription_infos) > 0:
                                for subscription_info in subscription_infos:
                                    push_notification = send_web_push(subscription_info, message)
                                    remove_message = db.users.update_one(
                                         {"username": self.username},
                                         {"$pull": {"pending_notifications": message}})
        else:
            if not self.set_offline:
                print(self.username + " went Offline")
                await self.set_user_offline(self.username, False)
                self.set_offline = True

    @tornado.gen.coroutine
    def on_close(self):
        if not self.set_offline:
            print(self.username + " went Offline")
            yield self.set_user_offline(self.username, False)
            self.set_offline = True

    async def set_user_offline(self, username, state):
        client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')  # Connect to MongoDB server
        db = client.progappjs
        document = await db.users.find_one({"username": username})
        if document is not None:
            db.users.update_one({"username": username},
                                {"$set": {"online": state}})


"""
POST /user/activate
Endpoint to handle request for activating an user account, json format:
{
    username: String,
}
"""
class UserActivateHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.set_header("Access-Control-Allow-Headers", "access-control-allow-origin,authorization,content-type")

    def get(self):
        pass

    def options(self):
        self.set_status(204)
        self.finish()

    # TODO:  add to DB when user is offline
    async def post(self):
        status = "fail"
        data = json.loads(self.request.body)
        print(data)
        username = data["username"]
        client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')  # Connect to MongoDB server
        db = client.progappjs
        document = await db.users.find_one({"username": username})
        if document is not None:
            status = "OK"
            update_transaction = db.users.update_one(
                {"username": username},
                {"$set": {"status": "active"}})
        json_response = {
            "status": status
        }
        print(json_response)
        self.write(json.dumps(json_response))
        self.set_header('Content-Type', 'application/json')
        self.finish()


class SchedulerHandler(tornado.web.RequestHandler):
    global scheduler

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.set_header("Access-Control-Allow-Headers", "access-control-allow-origin,authorization,content-type")

    def options(self):
        self.set_status(204)
        self.finish()

    async def get(self):
        print("Scheduler get")
        if scheduler is not None:
            status = "fail"
        else:
            executor.submit(self.start_transaction_scheduler())
            status = "OK"

        json_response = {
            "status": status
        }
        print(json_response)
        self.write(json.dumps(json_response))
        self.set_header('Content-Type', 'application/json')
        self.finish()

    def start_transaction_scheduler(self):
        s = Scheduler()
        s.start()
        print("Scheduler started")

    async def post(self):
        pass


class Application(tornado.web.Application):
    def __init__(self):

        handlers = [
            (r"/", MainHandler),
            (r"/login", LogInHandler),
            (r"/signup", SignUpHandler),
            (r"/transaction", TransactionHandler),
            (r"/user/info", UserInfoHandler),
            (r"/user/transactions", UserTransactionsHandler),
            (r"/contact", ContactHandler),
            (r"/subscription", PushSubscriptionHandler),
            (r"/push", PushHandler),
            (r"/pushtest", PushTestHandler),
            (r"/logging", LoggingHandler),
            (r"/user/activate", UserActivateHandler),
            (r"/scheduler", SchedulerHandler)
            # Add more paths here
        ]

        settings = {
            "debug": True,
        }

        tornado.web.Application.__init__(self, handlers, **settings)

        s = Scheduler()
        s.start()


if __name__ == "__main__":
    tornado.options.parse_command_line()
    app = Application()
    location = os.path.join(os.getcwd(), "certs")
    ssl_ctx = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
    ssl_ctx.load_cert_chain(os.path.join(location, "server.crt"),
                            os.path.join(location, "server.key"))
    server = tornado.httpserver.HTTPServer(app, ssl_options=ssl_ctx)
    server.listen(8888)
    print("REST API Server started on: https://localhost:8888")
    tornado.ioloop.IOLoop.current().start()
