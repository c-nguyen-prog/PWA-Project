import tornado.ioloop
import tornado
import tornado.web
import tornado.gen
import tornado.httpserver
import tornado.escape
import tornado.websocket
import json
import os
import bcrypt
import motor.motor_tornado
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
    @tornado.gen.coroutine
    def get(self):
        self.write("visit /api for api")

    def post(self):
        date = str(self.get_body_arguments("date", True))[2:-2]
        result = "Nothing started"


class UserHandler(tornado.web.RequestHandler):
    def get(self):
        pass

    def post(self):
        pass


"""
Function to handle login process
"""
class LogInHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.set_header("Access-Control-Allow-Headers", "access-control-allow-origin,authorization,content-type")

    def get(self):
        print("get")

    """ 
    Function to handle HTTP POST Request for Log in from Client side
    json format:
    {
        "email": email,
        "password": password
    }
    """
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
Function to handle sign up process
"""
class SignUpHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.set_header("Access-Control-Allow-Headers", "access-control-allow-origin,authorization,content-type")

    def get(self):
        print("get")

    """
    Function to handle HTTP POST Request for Sign up from client
    json format: (temp)
    {
        "name": name,
        "email": email,
        "password": password
    }
    """
    async def post(self):
        data = json.loads(self.request.body)                                           # Get body of POST request
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
                                                  "bank": {
                                                      "iban": "iban",              # TODO: Generate IBAN
                                                      "balance": 0
                                                  },
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


class TransactionHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.set_header("Access-Control-Allow-Headers", "access-control-allow-origin,authorization,content-type")

    def get(self):
        pass

    """
    Function to handle HTTP POST Request for a transaction
    json format: (temp)
    {
        "source": source_username,
        "destination": destination_username,
        "amount": amount
    }
    """
    async def post(self):
        data = json.loads(self.request.body)
        source = data["source"]
        destination = data["destination"]
        amount = data["amount"]
        client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')  # Connect to MongoDB server
        db = client.progappjs                                                  # Get database progappjs
        transaction = {"source": source,                                       # Create new transaction, status initial
                       "destination": destination,
                       "amount": amount,
                       "status": "initial"
                       }
        db.transactions.insert_one(transaction)                                # Add new transaction to db
        executor.submit(await self.pending_transaction(transaction))
        executor.submit(await self.commit_transaction(transaction))


    async def pending_transaction(self, transaction):
        client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')  # Connect to MongoDB server
        db = client.progappjs                                                  # Get transactions collection
        update_transaction = await db.transactions.update_one({"_id": transaction["_id"]},
                                                              {"$set": {"status": "pending"}})

        update_source = await db.users.update_one({"username": transaction["source"],
                                      "pending_transaction": {"$ne": transaction["_id"]},
                                      "balance": {"$gte" : transaction["amount"]}
                                      }, {
                                    "$inc": {"balance": -transaction["amount"]},
                                    "$push": {"pending_transaction": transaction["_id"]}})

        update_dest = await db.users.update_one({"username": transaction["destination"],
                                                 "pending_transaction": {"$ne": transaction["_id"]}
                                                 }, {
                                    "$inc": {"balance": +transaction["amount"]},
                                    "$push": {"pending_transaction": transaction["_id"]}})

    async def commit_transaction(self, transaction):
        client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')  # Connect to MongoDB server
        db = client.progappjs                                                  # Get database progappjs
        update_transaction = await db.transactions.update_one({"_id": transaction["_id"]},
                                                              {"$set": {"status": "committed"}})

        update_source = await db.users.update_one({"username": transaction["source"]},
                                                  {"$pull": {"pending_transaction": transaction["_id"]}})

        update_dest = await db.users.update_one({"username": transaction["destination"]},
                                                {"$pull": {"pending_transaction": transaction["_id"]}})

        update_transaction = await db.transactions.update_one({"_id": transaction["_id"]},
                                                              {"$set": {"status": "done"}})


class Application(tornado.web.Application):
    def __init__(self):

        handlers = [
            (r"/", MainHandler),
            (r"/websocket", WebSocket),
            (r"/api", UserHandler),
            (r"/login", LogInHandler),
            (r"/signup", SignUpHandler),
            (r"/transaction", TransactionHandler),
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
