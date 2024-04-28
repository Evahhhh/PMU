import React, { useState } from "react";

function Login() {
  return (
    <div className="login">
      <h2>CONNEXION</h2>
      <form>
        <label className="textField">
          <p className="label">Adresse mail:</p>
          <input type="email" name="email" className="inputText" />
        </label>
        <label className="textField">
          <p className="label">Mot de passe:</p>
          <input type="password" name="password" className="inputText" />
        </label>
        <input type="submit" value="Se connecter" className="primaryButton" />
      </form>
    </div>
  );
}

export default Login;
