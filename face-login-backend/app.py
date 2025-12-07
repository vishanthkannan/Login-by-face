from flask import Flask, request, jsonify
from deepface import DeepFace
import cv2
import numpy as np
import base64

app = Flask(__name__)

REGISTERED_FACE = "registered_faces/vishanth.jpg"

def decode_base64_image(base64_string):
    try:
        # Remove header "data:image/jpeg;base64,"
        base64_data = base64_string.split(",")[1]
        img_bytes = base64.b64decode(base64_data)
        img_array = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        return img
    except Exception as e:
        print("Decode error:", e)
        return None

@app.route("/verify", methods=["POST"])
def verify_face():
    data = request.get_json()

    if data is None or "image" not in data:
        return jsonify({"status": "error", "message": "Image not provided"}), 400

    captured_image = decode_base64_image(data["image"])

    if captured_image is None:
        return jsonify({"status": "error", "message": "Invalid image data"}), 400

    try:
        result = DeepFace.verify(
            img1_path=captured_image,
            img2_path=REGISTERED_FACE,
            enforce_detection=False
        )

        if result["verified"]:
            return jsonify({"status": "success", "message": "Face matched"})

        return jsonify({"status": "failed", "message": "Face not matched"})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Face Login Backend Running"}), 200

if __name__ == "__main__":
    app.run(port=5000, debug=True)
