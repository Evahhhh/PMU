import React from "react";
import { useNavigate } from "react-router-dom";

function Footer({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <footer>
      <div className="divFooter">
        <p>Auteurs: Lisa, Hugo, Eve-Anne</p>
        <p>Catégories associées: Card Game, Drinking game, Party game</p>
        {isLoggedIn && (
          <button className="negativeButton" onClick={handleLogout}>
            Déconnexion
          </button>
        )}
      </div>
    </footer>
  );
}

export default Footer;
