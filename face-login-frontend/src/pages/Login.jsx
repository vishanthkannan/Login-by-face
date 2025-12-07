import { useState, useRef } from "react";
import WebcamCapture from "../components/webcamCapture";
import Loader from "../components/Loader";
import SuccessPopup from "../components/SuccessPopup";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const camRef = useRef(null);
  const navigate = useNavigate();

  const loginUser = async () => {
    if (!email) {
      setStatus("Enter your email.");
      return;
    }

    setLoading(true);
    setStatus("");

    const image = camRef.current.capture();

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, image }),
    });

    const data = await res.json();

    setLoading(false);

if (data.status === "success") {
  localStorage.setItem("username", data.name);   // Save username
  setSuccess(true);

  setTimeout(() => {
    navigate("/dashboard");
  }, 1500);
} else {
  setStatus(data.message);
  document.querySelector(".container").classList.add("shake");

  setTimeout(() => {
    document.querySelector(".container").classList.remove("shake");
  }, 500);
}
    };

  return (
    <div className="container">
      {loading && <Loader />}
      {success && <SuccessPopup message="Login Successful!" />}

      <h1 className="title">Login</h1>

      <div className="input-box">
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
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
