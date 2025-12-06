from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Face Login Backend Running"}), 200

if __name__ == "__main__":
    app.run(port=5000, debug=True)
