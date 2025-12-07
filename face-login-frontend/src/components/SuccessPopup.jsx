function SuccessPopup({ message }) {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>✔ {message}</h2>
      </div>
    </div>
  );
}

export default SuccessPopup;
