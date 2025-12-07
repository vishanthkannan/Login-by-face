from flask import Blueprint, request, jsonify
from deepface import DeepFace
from utils import load_users, decode_base64_image

login_bp = Blueprint('login_bp', __name__)

@login_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if "email" not in data or "image" not in data:
        return jsonify({"status": "error", "message": "Missing email or image"}), 400

    email = data["email"]
    image = data["image"]

    users = load_users()

    if email not in users:
        return jsonify({"status": "error", "message": "User not found"}), 404

    stored_image_path = users[email]["image"]

    img = decode_base64_image(image)
    if img is None:
        return jsonify({"status": "error", "message": "Invalid image"}), 400

    try:
        result = DeepFace.verify(
            img1_path=img,
            img2_path=stored_image_path,
            enforce_detection=False
        )

        if result["verified"]:
            return jsonify({"status": "success", "message": "Login successful"})
        else:
            return jsonify({"status": "failed", "message": "Face mismatch"})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
