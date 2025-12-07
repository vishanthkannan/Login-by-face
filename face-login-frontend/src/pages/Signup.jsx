import { useState } from "react";
import WebcamCapture from "../components/webcamCapture";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");

  const handleSignup = async () => {
    if (!email || !name || !image) {
      setStatus("Please fill all fields and capture your face.");
      return;
    }

    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, image }),
    });

    const data = await res.json();
    setStatus(data.message);
  };

  return (
    <div className="container">
      <h1 className="title">Create Account</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-box">
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <WebcamCapture onCapture={(img) => setImage(img)} />

      <button className="btn" onClick={handleSignup}>
        Register Account
      </button>

      <h3 className="status">{status}</h3>
    </div>
  );
}

export default Signup;
