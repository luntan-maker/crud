from flask import Flask, request
import flask
from flask_cors import CORS, cross_origin

from myDB import *

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    user = request.args.get('data')
    response = flask.jsonify({'response': user})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/getAll")
def getAllOf():
    data = getAll()
    response = flask.jsonify({'response': data})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
@app.route("/changeOne")
def changeIt():
    id = request.args.get('id')
    data = request.args.get('data')
    ret = changeOne(id, data)
    response = flask.jsonify({'response': ret})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
@app.route("/deleteOne")
def deleteIt():
    id = request.args.get('id')
    ret = deleteOne(id)
    response = flask.jsonify({'response': ret})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
@app.route("/createOne")
def createOne():
    name = request.args.get('data')
    ret = submitData(name)
    response = flask.jsonify({'response': ret})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
