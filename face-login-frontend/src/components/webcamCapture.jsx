import { useRef } from "react";
import Webcam from "react-webcam";

function WebcamCapture({ onCapture }) {
  const webcamRef = useRef(null);

  const captureImage = () => {
    const img = webcamRef.current.getScreenshot();
    onCapture(img);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "15px" }}>
      <div className="webcam-frame">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          width="100%"
          videoConstraints={{ facingMode: "user" }}
        />
      </div>

      <button className="btn" onClick={captureImage}>
        Capture Face
      </button>
    </div>
  );
}

export default WebcamCapture;
