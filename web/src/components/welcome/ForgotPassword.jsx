import React from "react";

function ForgotPassword({ showPopup, closePopup }) {
  return (
    <div className={`modal${showPopup ? "" : " hidden"}`}>
      {showPopup && (
        <>
          <div className="forgotpassword">
            <button className="close-btn" onClick={closePopup}>
              X
            </button>
            <h2>REINITIALISER LE MOT DE PASSE</h2>
            <form>
              <label className="textField">
                <p className="label">Adresse mail:</p>
                <input type="email" name="email" className="inputText" />
              </label>
              <input
                type="submit"
                value="Réinitialiser"
                className="primaryButton"
              />
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
