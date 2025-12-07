import { useState, useRef } from "react";
import WebcamCapture from "../components/webcamCapture";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const camRef = useRef(null);

  const registerUser = async () => {
    if (!email || !name) {
      setStatus("Please enter name & email.");
      return;
    }

    const image = camRef.current.capture();

    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, image }),
    });

    const data = await res.json();
    setStatus(data.message);
  };

  return (
    <div className="container">
      <h1 className="title">Create Account</h1>

      <div className="input-box">
        <input type="text" placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="input-box">
        <input type="email" placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)} />
      </div>

      <WebcamCapture ref={camRef} />

      <button className="btn" onClick={registerUser}>
        Register
      </button>

      <div className="status">{status}</div>
    </div>
  );
}

export default Signup;
