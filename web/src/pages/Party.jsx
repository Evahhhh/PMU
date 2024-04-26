import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons';

// Données des cartes
const cardsData = [
  { id: 1, type: 'Roger', img: '/media/roger.png', logo: '/media/logo.png', color:'#B10E1D' },
  { id: 2, type: 'Gerard', img: '/media/gerard.png', logo: '/media/logo.png', color:'#209BE0' },
  { id: 3, type: 'Jean-Jacques', img: '/media/jean-jacques.png', logo: '/media/logo.png', color:'green' },
  { id: 4, type: 'Marcel', img: '/media/marcel.png', logo: '/media/logo.png', color:'#9747FF'}
];
const numberPlayer = "8";
const numberPlayerParam ="10";
const bets = [
  {pseudo: 'Geraldine', bet: 3, horse: 'Marcel'},
  {pseudo: 'Manu', bet: 2, horse: 'Jean-Jacques'},
  {pseudo: 'Dede', bet: 6, horse: 'Gerard'},
  {pseudo: 'Pascalou', bet: 4, horse: 'Roger'},
  {pseudo: 'Pascalou', bet: 4, horse: 'Roger'},
  {pseudo: 'Pascalou', bet: 4, horse: 'Roger'},
  {pseudo: 'Pascalou', bet: 4, horse: 'Roger'},
  {pseudo: 'Pascalou', bet: 4, horse: 'Roger'},
  {pseudo: 'Pascalou', bet: 4, horse: 'Roger'},
  {pseudo: 'Pascalou', bet: 4, horse: 'Roger'},
  {pseudo: 'Pascalou', bet: 4, horse: 'Roger'}
]
// Création du paquet de 52 cartes
const createDeck = () => {
  let deck = [];
  for (let i = 0; i < 13; i++) { // Dupliquer chaque type de carte 13 fois
    cardsData.forEach(card => {
      deck.push({
        id: `${card.type}_${i + 1}`, // Identifier unique
        type: card.type,
        img: card.img,
        logo: card.logo
      });
    });
  }
  return deck;
};

// Mélange aléatoire du paquet de cartes
const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const initialDeck = shuffleDeck(createDeck());

function Party() {
  const [deck, setDeck] = useState(initialDeck);
  const [discard, setDiscard] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // État pour contrôler l'affichage de la popup
  const lengthRun = 7;
  const stages = Array.from({ length: lengthRun }, (_, index) => index).reverse();
  const trackRef = useRef(null); // Référence à la div de piste de course
  const horseRef = useRef(null);
  useEffect(() => {
    // Faire défiler vers le bas après le rendu initial
    if (trackRef.current) {
      trackRef.current.scrollTop = trackRef.current.scrollHeight;
    }
  }, []);

  const handleCardClick = () => {
    if (deck.length > 0) {
      const newDiscard = [deck[0], ...discard];
      setDiscard(newDiscard);
      setDeck(deck.slice(1));
    }
    setShowPopup(true); // Afficher la popup lors du clic sur une carte
  };

  return (
    <div className='party'>
      <div className='cards'>
        {deck.length > 0 && (
            <div className="card" onClick={handleCardClick}>
              <div className="drawCard">
                <img src={deck[0].logo} alt="Logo" className="logo" />
              </div>
            </div>
        )}
        <div className='discard'>
          {discard.length > 0 && (
            <div className="card">
              <div className="discardCard">
                <img src={discard[0].img} alt="Card" className="img-bottom" />
                <p className="type">{discard[0].type}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='racetrack'>
        <div className='cardInconvenient'></div>
        <div className='track' ref={trackRef}>
          {stages.map((index, stageIndex) => (
          <div 
          key={index} 
          className='stage' 
          id={"position" + index}
          style={index === stages.length - 1 ? {backgroundColor: "#B79530"} : {}}
          >
            {index === 0 && cardsData.map((horse, horseIndex) => (
              <img key={horseIndex} src={horse.img} alt={horse.type} id={"horse" + horse.id} ref={horseRef}/>
            ))}
            {index === stages.length - 1 && (
              <div className="finish-line" style={{backgroundImage: "url('/media/finish-line.png')"}}></div>
            )}
          </div>
          ))}
        </div>
      </div>
      <div className='playerChat'>
        <div className='listBet'>
          <h2 className='titleBet'>LISTE DES PARIS</h2>
          <div className='pari'>
            <table>
              <caption>Nombre des joueurs: {numberPlayer}/{numberPlayerParam}</caption>
              <tbody>
              {bets.map((bet, index) => {
                // Recherche de l'objet correspondant à l'horse dans cardsData
                const horseData = cardsData.find(card => card.type === bet.horse);
                // Si l'objet est trouvé, utiliser sa couleur, sinon utiliser une couleur par défaut
                const backgroundColor = horseData ? horseData.color : 'black';
                
                return (
                  <tr key={index}>
                    <th scope='row'>{bet.pseudo}</th>
                    <td>{bet.bet + ' gorgées'}</td>
                    <td className='tdHorse'><p className="pHorse" style={
                      bet.horse === "Jean-Jacques" ? 
                      {width:'94px', backgroundColor: backgroundColor} : 
                      {width:"80px", backgroundColor: backgroundColor}
                    }>
                      {bet.horse}
                    </p></td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </div>
        <div className='chat'>
          <h2 className='titleChat'>CHAT</h2>
          <div className='chat'></div>
        </div>
      </div>
      {showPopup && ( // Affichage conditionnel de la popup
        <div className="popup">
          <div className="popupContent" onClick={() => setShowPopup(false)}>
            <button className="closeCard" onClick={() => setShowPopup(false)}>X</button>
            <img src={discard.length > 0 ? discard[0].img : ''} alt="Card" />
            <p><FontAwesomeIcon icon={faFlagCheckered} style={{ fontSize: '20px' }}/>  {discard.length > 0 ? discard[0].type : ''} titube jusqu'au prochain palier  <FontAwesomeIcon icon={faFlagCheckered} style={{ fontSize: '20px' }}/></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Party;
