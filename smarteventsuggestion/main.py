from flask import Flask, jsonify, request

from categorySuggestion import suggestCategory
from eventSuggestion import suggestEvent

# Restful API using Flask.
app = Flask(__name__)

@app.route("/suggestCategory")
def suggestCategoryCall():
    fromTime = float(request.args.get('from'))
    toTime = float(request.args.get('to'))
    user = request.args.get('user')
    return jsonify(suggestCategory(fromTime,toTime,user))
    



@app.route("/suggestEvent")
def suggestEventCall():
    fromTime = float(request.args.get('from'))
    toTime = float(request.args.get('to'))
    user = request.args.get('user')
    category = request.args.get('category')
    return jsonify(suggestEvent(fromTime,toTime,user,category))