import { useRef, forwardRef, useImperativeHandle } from "react";
import Webcam from "react-webcam";

const WebcamCapture = forwardRef((props, ref) => {
  const webcamRef = useRef(null);

  // Allows parent to call capture()
  useImperativeHandle(ref, () => ({
    capture() {
      return webcamRef.current.getScreenshot();
    }
  }));

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
    </div>
  );
});

export default WebcamCapture;
