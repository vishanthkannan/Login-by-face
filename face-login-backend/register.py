from flask import Blueprint, request, jsonify
import os
import cv2
from utils import load_users, save_users, decode_base64_image, BASE_DIR, FACE_DIR

register_bp = Blueprint('register_bp', __name__)

@register_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    if "email" not in data or "name" not in data or "image" not in data:
        return jsonify({"status": "error", "message": "Missing fields"}), 400

    email = data["email"]
    name = data["name"]
    image = data["image"]

    users = load_users()

    if email in users:
        return jsonify({"status": "error", "message": "User already exists"}), 400

    img = decode_base64_image(image)
    if img is None:
        return jsonify({"status": "error", "message": "Invalid image"}), 400

    user_image_path = os.path.join(FACE_DIR, f"{email}.jpg")
    cv2.imwrite(user_image_path, img)

    users[email] = {"name": name, "image": user_image_path}
    save_users(users)

    return jsonify({"status": "success", "message": "User registered successfully"})
