from flask import Flask
from flask_pymongo import PyMongo
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/project_2"
mongo = PyMongo(app)
socketio = SocketIO(app, cors_allowed_origins="*")

CORS(app)

from app import views  # Import views after initializing app to avoid circular dependency
