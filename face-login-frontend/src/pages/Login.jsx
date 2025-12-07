import { useState } from "react";
import WebcamCapture from "../components/webcamCapture";

function Login() {
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");

  const handleLogin = async () => {
    if (!email || !image) {
      setStatus("Enter email and capture your face.");
      return;
    }

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, image }),
    });

    const data = await res.json();
    setStatus(data.message);
  };

  return (
    <div className="container">
      <h1 className="title">Login</h1>

      <div className="input-box">
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <WebcamCapture onCapture={(img) => setImage(img)} />

      <button className="btn" onClick={handleLogin}>
        Login
      </button>

      <h3 className="status">{status}</h3>
    </div>
  );
}

export default Login;
