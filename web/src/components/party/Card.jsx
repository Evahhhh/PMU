export default function Card({cardsData, FontAwesomeIcon, faFlagCheckered, useState, setCardPackage}) {
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
  setCardPackage(initialDeck);
  console.log(initialDeck);
  const [deck, setDeck] = useState(initialDeck);
  const [discard, setDiscard] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // État pour contrôler l'affichage de la popup

  const handleCardClick = () => {
    if (deck.length > 0) {
      const newDiscard = [deck[0], ...discard];
      setDiscard(newDiscard);
      setDeck(deck.slice(1));
    }
    setShowPopup(true); // Afficher la popup lors du clic sur une carte
  };
  return (
    <>
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
    {showPopup && ( // Affichage conditionnel de la popup
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