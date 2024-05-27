import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

function CreationParty() {
  const [showFormOnline, setShowFormOnline] = useState(true);
  const [showFormLocal, setShowFormLocal] = useState(false);

  const [online, setOnline] = useState();

  const handleSubmitOnline = (event) => {
    event.preventDefault();
    setOnline(true);
    // Traitez les données du formulaire ici
  };

  const handleSubmitLocal = (event) => {
    event.preventDefault();
    setOnline(false);
    // Traitez les données du formulaire ici
  };

  sessionStorage.setItem("online", online);

  const [rangeval, setRangeval] = useState(2);

  const [number, setNumber] = useState(2);

  const [FormData, setFormData] = useState({
    users: [],
  });

  const handleUserChange = (e, index) => {
    const updatedUsers = [...FormData.users];
    updatedUsers[index][e.target.name] = e.target.value;
    setFormData({ ...FormData, users: updatedUsers });
  };

  const handlePlus = () => {
    const maxPlayer = 12;
    if (FormData.users.length < maxPlayer - 2) {
      const newPlayer = { pseudo: "" };
      setFormData({ ...FormData, users: [...FormData.users, newPlayer] });
      setNumber((prevState) => {
        if (prevState < maxPlayer) {
          return prevState + 1;
        } else {
          return prevState;
        }
      });
    } else {
      alert(`Vous ne pouvez pas ajouter plus de ${maxPlayer} joueurs.`);
    }
  };
  const handleMoins = (index) => {
    const updatedUsers = [...FormData.users];
    updatedUsers.splice(index, 1);
    setFormData({ ...FormData, users: updatedUsers });
    setNumber((prevState) => {
      if (prevState > 2) {
        return prevState - 1;
      } else {
        return prevState;
      }
    });
  };
  const pseudo = sessionStorage.getItem("pseudo");

  return (
    <div className="accordeon">
      <button
        className="btn-crea"
        onClick={() => setShowFormOnline(true) & setShowFormLocal(false)}
      >
        Mode en ligne
      </button>

      {showFormOnline && (
        <form className="form" onSubmit={handleSubmitOnline}>
          <label>
            <p>Dificulté:</p>
            <select>
              <option value="7">Shot (7)</option>
              <option value="9">Pinte (9)</option>
              <option value="12">Girafe (12)</option>
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
        <form className="form" onSubmit={handleSubmitLocal}>
          <label>
            <p>Dificulté:</p>
            <select>
              <option value="7">Shot (7)</option>
              <option value="9">Pinte (9)</option>
              <option value="12">Girafe (12)</option>
            </select>
          </label>
          <label>
            <p>Ajouter un joueur:</p>
            <div className="btn-nb-joueur">
              <button className="remove" type="button">
                <FontAwesomeIcon icon={faMinus} onClick={handleMoins} />
              </button>
              <div className="number">{number}</div>
              <button className="add" type="button">
                <FontAwesomeIcon icon={faPlus} onClick={handlePlus} />
              </button>
            </div>
            <div className="result">
              <div className="param">
                <p className="admin">Vous ({pseudo})</p>
                <input className="parie" type="number" min="1"></input>
              </div>
              <div className="param">
                <input className="pseudo" type="text"></input>
                <input className="parie" type="number" min="1"></input>
              </div>
              {FormData.users.map((user, index) => (
                <div className="param" key={index}>
                  <input
                    type="text"
                    name="pseudo"
                    className="pseudo"
                    value={user.pseudo}
                    onChange={(e) => handleUserChange(e, index)}
                  ></input>
                  <input className="parie" type="number" min="1"></input>
                </div>
              ))}
            </div>
          </label>
          <button type="submit">Lancer la partie</button>
        </form>
      )}
    </div>
  );
}

export default CreationParty;
