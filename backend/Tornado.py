import pprint

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
        self.write("visit /api/users for api")

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

        data = json.loads(self.request.body)
        username = data["email"]
        password = data["password"]
        print("Request from client: " + str(data))
        executor.submit(await self.check(username, password))

    # TODO: Implement salt and password hashing using bcrypt
    async def check(self, username, password):
        try:
            client = motor.motor_tornado.MotorClient('mongodb://localhost:27017') # Connect to MongoDB Server
            db = client.progappjs                                                 # Get database progappjs
            document = await db.users.find_one({"username": username})            # Search username DB
            if document is not None:                                              # Found matching user in DB
                print(document)
                salt = document["salt"]
                print(salt)
                hashed_pass = bcrypt.hashpw(password.encode("utf8"), salt)
                print(hashed_pass)
                if hashed_pass == document["password"]:
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
                else:
                    json_response = {
                        "status": 'fail',
                        "user": {
                            "name": document["username"]
                        }
                    }
                    self.write(json.dumps(json_response))
                    self.set_header('Content-Type', 'application/json')
                    print(json_response)
                    self.finish()
            else:                                                                 # User doesn't exist
                json_response = {"status": "fail"}
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

    # TODO: Get sign up info from frontend, checks username with database -> if available -> create new
    # TODO: if not then send response username not available to frontend
    async def post(self):
        data = json.loads(self.request.body)
        name = data["name"]
        username = data["email"]
        password = data["password"]
        print("Request from client: " + str(data))
        executor.submit(await self.check(username, password))

    async def check(self, username, password):
            client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')
            db = client.progappjs
            document = await db.users.find_one({"username": username})
            if document is not None:                                                 # Found username already existed
                print(document)
                json_response = {
                    "status": "fail"
                }
                self.write(json.dumps(json_response))
                self.set_header('Content-Type', 'application/json')
                print(json_response)
                self.finish()

            # TODO: Function to create username in database w/ hashed pass
            else:                                                                       # Username is available
                salt = bcrypt.gensalt()
                hashed_pass = bcrypt.hashpw(password.encode("utf8"), salt)
                print(salt)
                print(hashed_pass)
                new_user = await db.users.insert_one({"username": username,
                                                      "password": hashed_pass,
                                                      "salt": salt,
                                                      "status": "pending"})
                json_response = {
                    "status": "success"
                }
                self.write(json.dumps(json_response))
                self.set_header('Content-Type', 'application/json')
                print(json_response)
                self.finish()



class Application(tornado.web.Application):
    def __init__(self):

        handlers = [
            (r"/", MainHandler),
            (r"/websocket", WebSocket),
            (r"/api/users", UserHandler),
            (r"/login", LogInHandler),
            (r"/signup", SignUpHandler),
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
