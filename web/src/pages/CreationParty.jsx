import React, { useState } from "react";

function CreationParty() {
  const [showFormOnline, setShowFormOnline] = useState(true);
  const [showFormLocal, setShowFormLocal] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Traitez les données du formulaire ici
  };
  const [rangeval, setRangeval] = useState(2);

  return (
    <div className="accordeon">
      <button
        className="btn-crea"
        onClick={() => setShowFormOnline(true) & setShowFormLocal(false)}
      >
        Mode en ligne
      </button>

      {showFormOnline && (
        <form className="form" onSubmit={handleSubmit}>
          <label>
            <p>Dificulté:</p>
            <select>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </label>
          <label>
            <p>Nombre de joueur:</p>
            <div className="range">
              <p>{rangeval}</p>
              <input
                type="range"
                className="range-input"
                min="2"
                max="12"
                value={rangeval}
                onChange={(event) => setRangeval(event.target.value)}
              />
            </div>
          </label>
          <button type="submit">Créer</button>
        </form>
      )}

      <button
        className="btn-crea"
        onClick={() => setShowFormLocal(true) & setShowFormOnline(false)}
      >
        Mode local
      </button>

      {showFormLocal && (
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Select:
            <select>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </label>
          <label>
            Texte:
            <input type="text" />
            <button type="button">+</button>
          </label>
          <button type="submit">Créer</button>
        </form>
      )}
    </div>
  );
}

export default CreationParty;
