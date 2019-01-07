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
import datetime
import random
import pymongo
from concurrent.futures import ThreadPoolExecutor
from tornado import options

executor = ThreadPoolExecutor(8)  # declare 8 threads
json_data = []


class WebSocket(tornado.websocket.WebSocketHandler):
    global json_data

    @tornado.gen.coroutine
    def open(self):
        try:
            while True:
                yield self.write_message(json.dumps(json_data))
                yield tornado.gen.sleep(3)
        except tornado.websocket.WebSocketClosedError:
            print("")

    def on_message(self, message):
        pass

    def data_received(self, message):
        pass

    def on_close(self):
        pass


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("visit /api for api")


class UserHandler(tornado.web.RequestHandler):
    def get(self):
        pass

    def post(self):
        pass


"""
Function to handle login process, json format:
    {
        "email": email,
        "password": password
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
        print("Request from client: " + str(data))
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
Function to handle sign up request, TEMP json format: 
{
    title = data["title"]
    first_name = data["name"]
    last_name = data["surName"]
    birthday = data["birthdate"]
    email = data["email"]
    password = data["password"]
    phone = data["phone"]
    address = data["address"]
    zip = data["zipcode"]
    city = data["city"]
    tin = data["tin"]
    nationality = data["nationality"]
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
        print("Request from client: " + str(data))
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
                                                  "pending_transaction": []
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
Function to handle request for a transaction, json format: 
{
    "source": source_username (or iban),
    "destination": iban,
    "amount": amount,
    "type": type (now/date/standing)
    "date": date YY-MM-DD,
    "reference": reference
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

    async def post(self):
        data = json.loads(self.request.body)                                   # Get json request for transaction
        print(data)
        source = data["source"]
        destination = data["destination"]
        amount = data["amount"]
        type = data["type"]
        date = data["date"]
        reference = data["reference"]
        now = datetime.datetime.now()
        created_date = str(now.year) + "-" + str(now.month) + "-" + str(now.day)
        transaction = {"source": source,                                       # Create new transaction, status initial
                       "destination": destination,
                       "amount": amount,
                       "type": type,
                       "date": date,
                       "reference": reference,
                       "created_date": created_date,
                       "status": "initial"}

        client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')  # Connect to MongoDB server
        db = client.progappjs                                                  # Get database progappjs
        db.transactions.insert_one(transaction)                                # Add new transaction to db
        executor.submit(await self.pending_transaction(transaction))           # Set transaction as pending

    # TODO: Error handling for wrong sender info
    async def pending_transaction(self, transaction):
        client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')  # Connect to MongoDB server
        db = client.progappjs                                                  # Get transactions collection
        source = await db.users.find_one({"username": transaction["source"]})
        update_transaction = await db.transactions.update_one(
                {"_id": transaction["_id"]}, {"$set": {"status": "pending"}})


"""
Function to handle request for user info, json format:
{
    "username": username,
    //session_id
}
"""
# TODO: User changes info
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
Function to handle request for a user's transaction list, json format:
{
    "username": username,
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

    # Function to handle HTTP POST Request for user info
    @tornado.gen.coroutine
    def post(self):
        data = json.loads(self.request.body)                                   # Get json request for transaction
        print(data)
        username = data["username"]
        print(username)
        client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')  # Connect to MongoDB server
        db = client.progappjs                                                  # Get database progappjs
        cursor = db.transactions.find({"source": username}, {"_id": 0})                    # Search username in DB
        docs = yield cursor.to_list(10)
        print(docs)

        self.write(json.dumps(docs))
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
        print(data)
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


class Application(tornado.web.Application):
    def __init__(self):

        handlers = [
            (r"/", MainHandler),
            (r"/websocket", WebSocket),
            (r"/api", UserHandler),
            (r"/login", LogInHandler),
            (r"/signup", SignUpHandler),
            (r"/transaction", TransactionHandler),
            (r"/user/info", UserInfoHandler),
            (r"/user/transactions", UserTransactionsHandler),
            (r"/contact", ContactHandler)
            # Add more paths here
        ]

        settings = {
            "debug": True,
        }

        tornado.web.Application.__init__(self, handlers, **settings)


if __name__ == "__main__":
    tornado.options.parse_command_line()
    app = Application()
    server = tornado.httpserver.HTTPServer(app)
    server.listen(8888)
    print("Listening on http://localhost:8888")
    print("http://localhost:8888")
    tornado.ioloop.IOLoop.current().start()
