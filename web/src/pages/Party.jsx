import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons';

import Card from '../components/party/Card';
import Racetrack from '../components/party/Racetrack';
import PlayerChat from '../components/party/PlayerChat';

// Données des cartes
const cardsData = [
  { id: 1, type: 'Roger', img: '/media/roger.png', logo: '/media/logo.png', color:'#B10E1D' },
  { id: 2, type: 'Gerard', img: '/media/gerard.png', logo: '/media/logo.png', color:'#209BE0' },
  { id: 3, type: 'Jean-Jacques', img: '/media/jean-jacques.png', logo: '/media/logo.png', color:'green' },
  { id: 4, type: 'Marcel', img: '/media/marcel.png', logo: '/media/logo.png', color:'#9747FF'}
];
const lengthRun = 7;
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

function Party() {
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
  
  const [areHorsesPresent, setAreHorsesPresent] = useState(false);

  useEffect(() => {  
    // Cet effet s'exécute une seule fois après le premier rendu
    // Il met à jour le paquet de cartes dans le composant parent
    const initialDeck = shuffleDeck(createDeck());
    const initialInconvenient = initialDeck.slice(0,lengthRun -2);
    setDeck(initialDeck.slice(lengthRun -2));
    setInconvenientCard(initialInconvenient);

  }, []);
  
  const [deck, setDeck] = useState([]);
  const [inconvenientCard, setInconvenientCard] = useState([]);

  const [positionHorse, setPositionHorse] = useState([
    { type: "Roger", position: 0},
    { type: "Marcel", position: 0},
    { type: "Jean-Jacques", position: 0},
    { type: "Gerard", position: 0}
  ])

  const [finishParty, setFinishParty] = useState(false);
  const [showFadeIn, setShowFadeIn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowFadeIn(finishParty);
    }, 3500); // Délai correspondant à la durée de la transition de l'overlay
    return () => clearTimeout(timeout);
  }, [finishParty]);

  const highestPositionHorse = positionHorse.reduce((acc, curr) => {
    return acc.position > curr.position ? acc : curr;
  });
  const winnerHorse = cardsData.find(card => card.type === highestPositionHorse.type);

  return (
    <div className='party'>
      <Card 
        cardsData={cardsData}
        FontAwesomeIcon={FontAwesomeIcon}
        faFlagCheckered={faFlagCheckered}
        useState={useState}
        useEffect={useEffect}
        deck={deck}
        setDeck = {setDeck}
        positionHorse={positionHorse}
        setPositionHorse={setPositionHorse}
        lengthRun={lengthRun}
        finishParty={finishParty}
        setFinishParty={setFinishParty}
      />
      <Racetrack
        lengthRun={lengthRun}
        cardsData={cardsData}
        inconvenientCard={inconvenientCard}
        positionHorse={positionHorse}
        setPositionHorse={setPositionHorse}
        finishParty={finishParty}
        FontAwesomeIcon={FontAwesomeIcon}
        faFlagCheckered={faFlagCheckered}
        setAreHorsesPresent={setAreHorsesPresent}
      />
      <div className='playerChat'>
        <PlayerChat
          numberPlayer={numberPlayer}
          numberPlayerParam={numberPlayerParam}
          bets={bets}
          cardsData={cardsData}
        />
      </div>
      <div className={`finish-overlay ${finishParty ? 'show' : ''}`}>
          <img src="/media/beer.png" alt="Finish" />
      </div>
      <div className={`fade-in ${showFadeIn ? 'show' : ''}`}>
      <img src={winnerHorse.img} alt="winner" />
        <p>Le grand gagnant est {winnerHorse.type} !!</p>
      </div>
    </div>
  );
}

export default Party;
