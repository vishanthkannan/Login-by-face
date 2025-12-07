import os
import cv2
import json
import base64
import numpy as np

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FACE_DIR = os.path.join(BASE_DIR, "registered_faces")
USER_FILE = os.path.join(BASE_DIR, "users.json")

if not os.path.exists(FACE_DIR):
    os.makedirs(FACE_DIR)

if not os.path.exists(USER_FILE):
    with open(USER_FILE, "w") as f:
        json.dump({}, f)


def load_users():
    with open(USER_FILE, "r") as f:
        return json.load(f)


def save_users(users):
    with open(USER_FILE, "w") as f:
        json.dump(users, f, indent=4)


def decode_base64_image(base64_string):
    try:
        header, encoded = base64_string.split(",", 1)
        img_bytes = base64.b64decode(encoded)
        img_array = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        return img
    except:
        return None
