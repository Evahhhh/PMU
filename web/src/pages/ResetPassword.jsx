import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [decodedToken, setDecodedToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    try {
      setDecodedToken(jwtDecode(token));
    } catch (err) {
      enqueueSnackbar("Token invalide", { variant: "error" });
      navigate("/");
    }
  }, [location, navigate, enqueueSnackbar]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      enqueueSnackbar("Les mots de passe ne correspondent pas", {
        variant: "error",
      });
      return;
    }

    console.log(decodedToken);
  };

  return (
    <div className="welcome">
      <div className="login">
        <h2>REINITIALISER LE MOT DE PASSE</h2>
        <form onSubmit={handleSubmit}>
          <label className="textField">
            <p className="label">Nouveau mot de passe:</p>
            <input
              type="password"
              name="password"
              className="inputText"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              required
            />
          </label>
          <label className="textField">
            <p className="label">Confirmer le mot passe:</p>
            <input
              type="password"
              name="password"
              className="inputText"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
              required
            />
          </label>
          <input
            type="submit"
            value="Réinitialiser"
            className="primaryButton"
          />
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
