from flask import Flask, request, jsonify
from flask_cors import CORS
from deepface import DeepFace
import cv2
import numpy as np
import base64
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


# ✅ SET ABSOLUTE PATH TO REGISTERED FACE
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
REGISTERED_FACE = os.path.join(BASE_DIR, "registered_faces", "vishanth.jpg")

print("REGISTERED_FACE PATH:", REGISTERED_FACE)


# ✅ Base64 → Image converter
def decode_base64_image(base64_string):
    try:
        header, encoded = base64_string.split(",", 1)
        img_bytes = base64.b64decode(encoded)
        img_array = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        return img
    except Exception as e:
        print("Decode error:", e)
        return None


@app.route("/verify", methods=["POST"])
def verify_face():
    data = request.get_json()

    if not data or "image" not in data:
        return jsonify({"status": "error", "message": "Image not provided"}), 400

    # Decode incoming webcam Base64 image
    captured_image = decode_base64_image(data["image"])
    if captured_image is None:
        return jsonify({"status": "error", "message": "Invalid image data"}), 400

    # DEBUG: Test if registered face loads correctly
    test_img = cv2.imread(REGISTERED_FACE)
    print("Image loaded:", test_img is not None)
    print("Image path:", REGISTERED_FACE)

    if test_img is None:
        return jsonify({
            "status": "error",
            "message": "Registered face image not found or unreadable"
        }), 500

    try:
        # Verify face
        result = DeepFace.verify(
            img1_path=captured_image,
            img2_path=REGISTERED_FACE,
            enforce_detection=False
        )

        if result.get("verified"):
            return jsonify({"status": "success", "message": "Face matched"})
        else:
            return jsonify({"status": "failed", "message": "Face not matched"})

    except Exception as e:
        print("Verification error:", e)
        return jsonify({
            "status": "error",
            "message": "DeepFace error: " + str(e)
        }), 500


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend Running"})


if __name__ == "__main__":
    app.run(port=5000, debug=True)
