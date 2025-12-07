import { useRef,useState } from "react";
import Webcam from "react-webcam";

function App() {
  const webcamRef = useRef(null);
  const [status, setStatus] = useState("");

  // Capture image and send to backend
  const captureAndVerify = async () => {
    setStatus("Verifying...");

       // Capture Base64 image
    const imageSrc = webcamRef.current.getScreenshot();

        // Send to Flask backend
    const response = await fetch("http://localhost:5000/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageSrc }),
    });

        const data = await response.json();
    console.log(data);

    if (data.status === "success"){
      setStatus("Login Successful!");
    } else if (data.status === "failed"){
      setStatus("Login Failed. Try Again.");
    } else {
      setStatus("Error: " + data.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Face Login System</h1>

      {/* Webcam Preview */}
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        width={350}
        videoConstraints={{ facingMode: "user" }}
        style={styles.webcam}
      />

      <button style={styles.button} onClick={captureAndVerify}>Login</button>
      <h2 style={styles.status}>{status}</h2>

    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column", // Stacks items vertically
    alignItems: "center",     // Centers items horizontally (Left/Right)
    justifyContent: "center", // Centers items vertically (Top/Bottom)
    minHeight: "100vh",       // Makes the container take up full screen height
    padding: "30px",
    fontFamily: "Arial",
    backgroundColor: "#e6e5ddff", // Added a light background to see the centering better
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },
    webcam: {
    width: "360px",
    height: "270px",
    margin: "0 auto",
    border: "3px dashed #8078e8ff",
    borderRadius: "20px",
    display: "flex",
  },
  button: {
    marginTop: "25px",
    padding: "12px 25px",
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "100px",
    border: "none",
    backgroundColor: "#0ffa1fa0",
    color: "white",
  },
};

export default App;