from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# --- Replace this connection string after you set up Atlas ---
client = MongoClient("mongodb+srv://user1:pass1234@cluster0.q8tipu9.mongodb.net/overlay_db?retryWrites=true&w=majority&appName=Cluster0")
db = client["overlay_db"]
overlays = db["overlays"]

@app.route("/api/overlays", methods=["GET"])
def get_overlays():
    return jsonify(list(overlays.find({}, {"_id": 0})))

@app.route("/api/overlays", methods=["POST"])
def create_overlay():
    data = request.json
    overlays.insert_one(data)
    return jsonify({"message": "created"}), 201

@app.route("/api/overlays/<string:name>", methods=["DELETE"])
def delete_overlay(name):
    overlays.delete_one({"name": name})
    return jsonify({"message": "deleted"})

if __name__ == "__main__":
    app.run(debug=True)
