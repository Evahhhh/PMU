import React, { useState, useEffect, useRef } from 'react';
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
  const [cardPackage, setCardPackage] = useState(null);

  return (
    <div className='party'>
      <Card 
        cardsData={cardsData}
        FontAwesomeIcon={FontAwesomeIcon}
        faFlagCheckered={faFlagCheckered}
        useState={useState}
        setCardPackage={setCardPackage}
      />
      <Racetrack
        lengthRun={lengthRun}
        useRef={useRef}
        useEffect={useEffect}
        cardsData={cardsData}
        cardPackage={cardPackage}
      />
      <div className='playerChat'>
        <PlayerChat
          numberPlayer={numberPlayer}
          numberPlayerParam={numberPlayerParam}
          bets={bets}
          cardsData={cardsData}
        />
      </div>
    </div>
  );
}

export default Party;
