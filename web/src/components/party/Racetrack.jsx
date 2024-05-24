import React, { useRef, useState, useEffect } from 'react';

export default function Racetrack({
  lengthRun,
  cardsData,
  deck,
  discard,
  inconvenientCard,
  setInconvenientCard,
  setStateInconvenient,
  positionHorse,
  setPositionHorse,
  modifyCurrentGame,
  finishParty,
  FontAwesomeIcon,
  faFlagCheckered,
  socket
}) {
  const stages = Array.from({ length: lengthRun }, (_, index) => index).reverse();
  const trackRef = useRef(null);
  const cardInconvenientRefs = useRef(Array.from({ length: lengthRun - 2 }).map(() => React.createRef()));
  const [clickedInconvenient, setClickedInconvenient] = useState(Array.from({ length: lengthRun }).fill(false));
  const [activateInconvenient, setActivateInconvenient] = useState(Array.from({ length: lengthRun }).fill(false));
  const [showPopupInconvenient, setShowPopupInconvenient] = useState(false); // affichage de la popup
  const [selectedHorse, setSelectedHorse] = useState(null); // cheval sélectionné

  const areHorsesAtPosition = (stageIndex) => {
    let arePresent = true;
    for (let i = 0; i < positionHorse.length; i++) {
      if (positionHorse[i].position < stageIndex) {
        arePresent = false;
        break;
      }
    }
    return arePresent;
  };

  useEffect(() => {
    if (stages.some((index, stageIndex) => {
      let positionValide = areHorsesAtPosition(index);
      if (positionValide) {
        if (index !== 0 && (inconvenientCard[stageIndex - 1] && !inconvenientCard[stageIndex - 1].use)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    })) {
      setStateInconvenient(true);
    }
  }, [stages, areHorsesAtPosition]);

 useEffect(() => {
    let activate = false;
    stages.map((index, stageIndex) => {
      for (let i = 0; i < positionHorse.length; i++) {
        if (positionHorse[i].position < index) {
          return activate;
        }
      }
        activate = true;
        const updatedActivateInconvenient = [...activateInconvenient];
        updatedActivateInconvenient[index] = activate;
        setActivateInconvenient(updatedActivateInconvenient);
    })
  }, []);

  const handleInconvenientClick = (index, stageIndex) => {
    if (areHorsesAtPosition(index) && !clickedInconvenient[stageIndex] && !finishParty) {
      const correctIndex = lengthRun - 2 - stageIndex;
      const updatedClickedInconvenient = [...clickedInconvenient];
      updatedClickedInconvenient[index] = true;
      setClickedInconvenient(updatedClickedInconvenient);
      const invertedInconvenientCard = inconvenientCard.slice().reverse();
      const horseIndex = positionHorse.findIndex((el) => el.type === invertedInconvenientCard[correctIndex].type);
      if (horseIndex !== -1 && positionHorse[horseIndex].position > 0) {
        const updatedPositionHorse = [...positionHorse];
        updatedPositionHorse[horseIndex].position -= 1;
        setPositionHorse(updatedPositionHorse);
        setSelectedHorse(cardsData.find(e => e.type === positionHorse[horseIndex].type));

        const updatedInconvenientCard = inconvenientCard.map((card, i) => {
          if (i === stageIndex - 1) {
            return { ...card, use: true };
          }
          return card;
        });
        setInconvenientCard(updatedInconvenientCard);
        modifyCurrentGame(deck, discard, updatedInconvenientCard);
        setStateInconvenient(false);
      }
      setShowPopupInconvenient(true); // Afficher la popup lors du clic sur une carte
    }
  };

  useEffect(() => {
    if (socket) {
      if (trackRef.current) {
        trackRef.current.scrollTop = trackRef.current.scrollHeight;
      }
  
      const handleNewPosition = (newPosition) => {
        setPositionHorse(newPosition);
      };
  
      socket.on('mettreAJourPosition', handleNewPosition);
  
      return () => {
        socket.off('mettreAJourPosition', handleNewPosition);
      };
    }
  }, [setPositionHorse, socket]);
  
  useEffect(() => {
    if (socket && positionHorse.length > 0) {
      socket.emit('mettreAJourPositionPion', positionHorse);
    }
  }, [positionHorse, socket]);
  

  return (
    <div className='racetrack'>
      <div className='track' ref={trackRef}>
        {stages.map((index, stageIndex) => (
          <div
            key={index}
            className={`stage ${index === stages.length - 1 ? 'lastStage' : ''}`}
            id={"position" + index}
            style={
              index === stages.length - 1
                ? { backgroundColor: "#B79530", borderRadius: "16px 0 0 0" }
                : index === 0
                  ? { borderRadius: "0 0 0 16px" }
                  : {}
            }
          >
            {(index !== stages.length - 1 && index !== 0) && (
              <div
                className={`cardInconvenient ${inconvenientCard[stageIndex - 1] && inconvenientCard[stageIndex - 1].use ? '' : 'logoVisible'} ${areHorsesAtPosition(index) && !clickedInconvenient[index] && !showPopupInconvenient && inconvenientCard[stageIndex - 1] && !inconvenientCard[stageIndex - 1].use ? 'borderRed' : ''}`}
                onClick={() => handleInconvenientClick(index, stageIndex)}
                ref={cardInconvenientRefs.current[stageIndex]}
              >
                {inconvenientCard.length > 0 && (
                  inconvenientCard[stageIndex - 1].use ? (
                    <>
                      <img src={inconvenientCard[stageIndex - 1].img} alt="Card" className="imgInconvenient" />
                      <p className="typeInconvenient">{inconvenientCard[stageIndex - 1].type}</p>
                    </>
                  ) : (
                    <img src={inconvenientCard[stageIndex - 1].logo} alt="Logo" className="logoInconvenient" />
                  )
                )}
              </div>
            )}
            {positionHorse.map((position) => (
              index === position.position && (
                <React.Fragment key={`${position.type}-${position.position}`}>
                  {cardsData.map((horse, horseIndex) => (
                    position.type === horse.type && (
                      <img key={horseIndex} src={horse.img} alt={horse.type} id={"horse" + horse.id} className='horseRun' />
                    )
                  ))}
                </React.Fragment>
              )
            ))}
            {index === stages.length - 1 && (
              <div className="finish-line" style={{ backgroundImage: "url('/media/finish-line.png')" }}></div>
            )}
          </div>
        ))}
      </div>
      {showPopupInconvenient && (
        <div className="popup">
          <div className="popupContent" onClick={() => setShowPopupInconvenient(false)}>
            <button className="closeCard" onClick={() => setShowPopupInconvenient(false)}>X</button>
            {selectedHorse && (
              <>
                <img src={selectedHorse.img} alt={selectedHorse.type} />
                <p style={{ textAlign: "center" }}><FontAwesomeIcon icon={faFlagCheckered} style={{ fontSize: '20px' }} />  {selectedHorse.type} a le vertige et recule d'un palier <FontAwesomeIcon icon={faFlagCheckered} style={{ fontSize: '20px' }} /></p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
