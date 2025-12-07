import { useRef } from "react";
import Webcam from "react-webcam";

function App() {
  const webcamRef = useRef(null);

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

      <button style={styles.button}>Login</button>
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
