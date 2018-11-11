import pprint

import tornado.ioloop
import tornado
import tornado.web
import tornado.gen
import tornado.httpserver
import tornado.escape
import tornado.websocket
import json
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
        json_data = {"Name": "Goethe in Frankfurt",
                     "Fachgebiet": "Literatur",
                     "Beschreibung": "Beschreibung der Aktivitaeten von J.W.v.Goethe in Frankfurt am Main",
                     "Preis": "1,75",
                     "ID": "1234566789"}
        self.write(json.dumps(json_data))

    def post(self):
        pass


class LogIn(tornado.web.RequestHandler):
    async def get(self):
        username = str(self.get_body_arguments("username", True))[2:-2]
        hashed_password = str(self.get_body_arguments("password", True))[2:-2]
        username = "admin"
        password = "admin"
        query = {"username": username, "password": password}
        executor.submit(self.check())

    def post(self):
        pass

    @tornado.gen.coroutine
    def check(self):
        client = motor.motor_tornado.MotorClient('mongodb://localhost:27017')
        db = client.progappjs
        document = yield db.users.find_one({"username": "chi", "password": "hashedpass"})
        if document is not None:
            print(document)
            #self.write("Send successful acknowledgement API")
        else:
            #self.write("User data not found")


class SignUp(tornado.web.RequestHandler):
    def get(self):
        pass
    def post(self):
        pass


class Application(tornado.web.Application):
    def __init__(self):

        handlers = [
            (r"/", MainHandler),
            (r"/websocket", WebSocket),
            (r"/api/users", UserHandler),
            (r"/login", LogIn),
            (r"/signup", SignUp),
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
