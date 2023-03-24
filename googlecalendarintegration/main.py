from insertGoogleEvents import insertGoogleEventsIntoFirebase
from flask import Flask, jsonify


# Restful API using Flask.
app = Flask(__name__)

@app.route("/syncGoogleEvents")
def syncGoogleEvents():
    return jsonify(insertGoogleEventsIntoFirebase())

