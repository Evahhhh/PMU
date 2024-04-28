import React, { useState } from "react";
import Login from "../components/welcome/Login";
import Signup from "../components/welcome/Signup";
import ForgotPassword from "../components/welcome/ForgotPassword";

function Welcome() {
  const [showLogin, setShowLogin] = useState(true);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const toggleForgotPasswordModal = () => {
    setShowForgotPasswordModal(!showForgotPasswordModal);
  };

  return (
    <div className="welcome">
      {showLogin ? <Login /> : <Signup />}
      <div className="btnContainer">
        <button
          className="secondaryButton"
          onClick={() => setShowLogin(!showLogin)}
        >
          {showLogin ? "S'inscrire" : "Se connecter"}
        </button>
        {showLogin && (
          <button onClick={toggleForgotPasswordModal} className="linkButton">
            Mot de passe oublié ? Par ici
          </button>
        )}
      </div>
      {showForgotPasswordModal && (
        <ForgotPassword
          showPopup={showForgotPasswordModal}
          closePopup={() => setShowForgotPasswordModal(false)}
        />
      )}
    </div>
  );
}

export default Welcome;
