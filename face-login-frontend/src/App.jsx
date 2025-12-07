function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Face Login System</h1>

      <div style={styles.box}>
        <p style={styles.info}>Webcam preview will appear here soon...</p>
      </div>

      <button style={styles.button}>Login with Face ID</button>
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
    backgroundColor: "#f9f8d8ff", // Added a light background to see the centering better
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  box: {
    width: "350px",
    height: "260px",
    margin: "0 auto",
    border: "2px dashed #605e60ff",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    color: "#494949ff",
    fontSize: "16px",
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
