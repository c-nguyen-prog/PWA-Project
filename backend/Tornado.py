import tornado.ioloop
import tornado
import tornado.web
import tornado.gen
import tornado.httpserver
import tornado.escape
import tornado.websocket
import json
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
        json_data = [{"name": "b", "age": 21}, {"name": "a", "age": 10}]
        self.write(json.dumps(json_data))
    def post(self):
        pass

class Application(tornado.web.Application):
    def __init__(self):

        handlers = [
            (r"/", MainHandler),
            (r"/websocket", WebSocket),
            (r"/api/users", UserHandler),
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
