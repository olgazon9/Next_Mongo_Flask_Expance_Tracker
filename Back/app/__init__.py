from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/project_2"
mongo = PyMongo(app)

CORS(app)  # Enable CORS for all routes

from app import views
