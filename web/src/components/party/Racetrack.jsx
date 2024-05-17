import React, { useRef, useState, useEffect } from 'react';

export default function Racetrack ({lengthRun, cardsData, deck, discard, inconvenientCard, setInconvenientCard, positionHorse, setPositionHorse, modifyCurrentGame, finishParty, FontAwesomeIcon, faFlagCheckered}) {
  const stages = Array.from({ length: lengthRun }, (_, index) => index).reverse();
  const trackRef = useRef(null);
  const cardInconvenientRefs = useRef(Array.from({ length: lengthRun -2}).map(() => React.createRef()));
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

  const handleInconvenientClick = (index, stageIndex) => {
    if (areHorsesAtPosition(index) && !clickedInconvenient[stageIndex] && finishParty===false) {
      const correctIndex = lengthRun - 2 - stageIndex;
      const updatedClickedInconvenient = [...clickedInconvenient];
      updatedClickedInconvenient[index] = true;
      setClickedInconvenient(updatedClickedInconvenient);
      console.log(clickedInconvenient);
      const invertedInconvenientCard = inconvenientCard.slice().reverse();
      const horseIndex = positionHorse.findIndex((el) => el.type === invertedInconvenientCard[correctIndex].type);
      if (horseIndex !== -1 && positionHorse[horseIndex].position > 0) {
        const updatedPositionHorse = [...positionHorse];
        updatedPositionHorse[horseIndex].position -= 1;
        setPositionHorse(updatedPositionHorse);
        setSelectedHorse(cardsData.find(e => e.type === positionHorse[horseIndex].type));

        const updatedInconvenientCard = inconvenientCard.map((card, i) => {
          console.log(stageIndex);
          if (i == stageIndex-1) {
            return { ...card, use: true };
          }
          return card;
        });
        setInconvenientCard(updatedInconvenientCard);
        console.log(inconvenientCard[stageIndex - 1].use);
        modifyCurrentGame(deck, discard, updatedInconvenientCard);
      }
      setShowPopupInconvenient(true, stageIndex); // Afficher la popup lors du clic sur une carte
    }
  };

  useEffect(() => {
    // Faire défiler automatiquement la barre de défilement vers le bas
    if (trackRef.current) {
      trackRef.current.scrollTop = trackRef.current.scrollHeight;
    }
  }, []);

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
  }, [positionHorse]);
  
  return (
    <div className='racetrack'>
      <div className='track' ref={trackRef}>
        {stages.map((index, stageIndex) => (
          <div 
            key={index} 
            className={`stage ${ index === stages.length - 1 ? 'lastStage' : ''}`} 
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
              className={`cardInconvenient ${inconvenientCard[stageIndex - 1] && inconvenientCard[stageIndex - 1].use ? '' : 'logoVisible'} ${areHorsesAtPosition(index) && !clickedInconvenient[index] && !showPopupInconvenient ? 'borderRed' : ''}`} 
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
                      <img key={horseIndex} src={horse.img} alt={horse.type} id={"horse" + horse.id} className='horseRun'/>
                    )
                  ))}
                </React.Fragment>
              )
            ))}
            {index === stages.length - 1 && (
              <div className="finish-line" style={{backgroundImage: "url('/media/finish-line.png')"}}></div>
            )}
          </div>
        ))}
      </div>
      {showPopupInconvenient && ( // Affichage conditionnel de la popup
        <div className="popup">
          <div className="popupContent" onClick={() => setShowPopupInconvenient(false)}>
            <button className="closeCard" onClick={() => setShowPopupInconvenient(false)}>X</button>
            {selectedHorse && ( // Affichage du cheval sélectionné dans la popup
              <>
                <img src={selectedHorse.img} alt={selectedHorse.type} />
                <p style={{textAlign: "center"}}><FontAwesomeIcon icon={faFlagCheckered} style={{ fontSize: '20px' }}/>  {selectedHorse.type} a le vertige et recule d'un palier <FontAwesomeIcon icon={faFlagCheckered} style={{ fontSize: '20px' }}/></p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}