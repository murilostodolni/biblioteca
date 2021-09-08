from flask import Flask, Blueprint
from flask_restx import Api

from marshmallow import ValidationError


class Server():
    def __init__(self):
        self.app = Flask(__name__)
        self.bluePrint = Blueprint('api', __name__, url_prefix='/api')
        self.api = Api(self.bluePrint, doc='/doc', title='Gerenciamento biblioteca')
        self.app.register_blueprint(self.bluePrint)

        super().__init__()

    def run(self, ):
        self.app.run(
            port=5000,
            debug=True,
            host='127.0.0.1'
        )


server = Server()