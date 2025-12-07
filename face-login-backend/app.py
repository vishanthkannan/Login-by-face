from flask import Flask, jsonify
from flask_cors import CORS
from register import register_bp
from login import login_bp

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(register_bp)
app.register_blueprint(login_bp)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend Running"})


if __name__ == "__main__":
    app.run(port=5000, debug=True)
