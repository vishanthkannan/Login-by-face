import { useState, useRef } from "react";
import WebcamCapture from "../components/webcamCapture";

function Login() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const camRef = useRef(null);

  const loginUser = async () => {
    if (!email) {
      setStatus("Enter your email.");
      return;
    }

    const image = camRef.current.capture();

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
        <input type="email" placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)} />
      </div>

      <WebcamCapture ref={camRef} />

      <button className="btn" onClick={loginUser}>
        Login
      </button>

      <div className="status">{status}</div>
    </div>
  );
}

export default Login;
