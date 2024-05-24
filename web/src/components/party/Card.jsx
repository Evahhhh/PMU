import React, { useEffect } from 'react';

export default function Card({FontAwesomeIcon, socket, faFlagCheckered, stateInconvenient, useState, deck, setDeck, discard, setDiscard, positionHorse, setPositionHorse, modifyCurrentGame, lengthRun, finishParty, setFinishParty, inconvenientCard}) {
  const [showPopup, setShowPopup] = useState(false); // État pour contrôler l'affichage de la popup
  
  const handleCardClick = () => {
    if(finishParty === false) {
      if (deck.length > 0) {
        const horseIndex = positionHorse.findIndex((el) => el.type === deck[0].type);
        if(horseIndex !== -1) {
          const updatedPositionHorse = [...positionHorse];
          updatedPositionHorse[horseIndex].position += 1;
          setPositionHorse(updatedPositionHorse);
        }
        const newDeck = deck.slice(1); // Créer une copie de `deck` sans le premier élément
        const newDiscard = [deck[0], ...discard];
        setDiscard(newDiscard);
        setDeck(newDeck); // Mettre à jour `deck` avec la nouvelle valeur
        modifyCurrentGame(newDeck, newDiscard, inconvenientCard); // Passer la nouvelle valeur de `deck` à `modifyCurrentGame`
      }
      setShowPopup(true); // Afficher la popup lors du clic sur une carte
      socket.emit('showPopup', true);
      for (let i = 0; i < positionHorse.length; i++) {
        if (positionHorse[i].position === lengthRun - 1) {
          setFinishParty(true);
        }
      }
    }
  };

  useEffect(() => {
    if (socket) {
      // Écouter l'événement pour afficher la popup
      const handleShowPopup = (showPopup) => {
        setShowPopup(showPopup);
      };

      socket.on('showPopup', handleShowPopup);

      return () => {
        socket.off('showPopup', handleShowPopup);
      };
    }
  }, [socket]);

  return (
    <>
      <div className='cards'>
        {deck.length > 0 && (
            <div className="card" onClick={stateInconvenient ? null : handleCardClick} style={stateInconvenient ? {cursor:"auto"} : {cursor:"pointer"}}>
              <div className="drawCard">
                <img src={deck[0].logo} alt="Logo" className="logo" />
              </div>
            </div>
        )}
        <div className='discard'>
          {discard.length > 0 && (
            <div className="card" style={{cursor:"auto"}}>
              <div className="discardCard">
                <img src={discard[0].img} alt="Card" className="img-bottom" />
                <p className="type">{discard[0].type}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    {(showPopup && finishParty === false) &&( // Affichage conditionnel de la popup
        <div className="popup">
          <div className="popupContent" onClick={() => setShowPopup(false)}>
            <button className="closeCard" onClick={() => setShowPopup(false)}>X</button>
            <img src={discard.length > 0 ? discard[0].img : ''} alt="Card" />
            <p><FontAwesomeIcon icon={faFlagCheckered} style={{ fontSize: '20px' }}/>  {discard.length > 0 ? discard[0].type : ''} titube jusqu'au prochain palier  <FontAwesomeIcon icon={faFlagCheckered} style={{ fontSize: '20px' }}/></p>
          </div>
        </div>
      )}
    </>
  )
}