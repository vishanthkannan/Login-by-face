function Dashboard() {
  const username = localStorage.getItem("username");

  return (
    <div className="container">
      <h1 className="title">Welcome {username ? username : "User"}!</h1>

      <p style={{ textAlign: "center", fontSize: "20px" }}>
        You have logged in using Face Authentication
      </p>
    </div>
  );
}

export default Dashboard;
