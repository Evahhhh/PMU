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

const idRound = sessionStorage.getItem("idRound");
const token = sessionStorage.getItem('token');

function Party() {
  const [lengthRun, setLengthRun] = useState(7);
  const [numberPlayer, setNumberPlayer] = useState(0);
  const [effectifPlayer, setEffectifPlayer] = useState(0);
  const [bets, setBets] = useState([]);
  
  const [positionHorse, setPositionHorse] = useState([]);

  const [deck, setDeck] = useState([]);
  const [inconvenientCard, setInconvenientCard] = useState([]);
  const [finishParty, setFinishParty] = useState(false);
  const [showFadeIn, setShowFadeIn] = useState(false);

  const fetchData = async () => {
    //Durée de la partie
    const lengthParty = await fetch(`${process.env.REACT_APP_PMU_API_URL}/api/round/${idRound}`,{
    headers: {
        'Authorization': `Bearer ${token}`
        }
    }
    );
    const length = await lengthParty.json();
    setLengthRun(length.duration);

    const idRoom = length.roomId;

    //Nombre de joueurs max
    const numberPlayer = await fetch(`${process.env.REACT_APP_PMU_API_URL}/api/room/${idRoom}`,{
      headers: {
          'Authorization': `Bearer ${token}`
          }
      }
    );
    const players = await numberPlayer.json();
    setNumberPlayer(players.maxNbPlayers);
    
    //Nombre de joueur dans la partie
    const effectifPlayer = await fetch(`${process.env.REACT_APP_PMU_API_URL}/api/room/players/${idRoom}`,{
      headers: {
          'Authorization': `Bearer ${token}`
          }
      }
    );
    const playerEffectif = await effectifPlayer.json();
    setEffectifPlayer(playerEffectif.users.length + 1);
    
    //Paris de la manche
    const betsArray = await fetch(`${process.env.REACT_APP_PMU_API_URL}/api/round/bet/${idRound}`,{
      headers: {
          'Authorization': `Bearer ${token}`
          }
      }
    );
    const betsResponse = await betsArray.json();
    const arrayBet = [];
    betsResponse.bets.map((bet) => {
      arrayBet.push({
        pseudo: bet.pseudo,
        bet: bet.sips_number,
        horse: cardsData.find(horse => horse.id === bet.horse_id).type
      })
    })
    setBets(arrayBet);
  }

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
    fetchData();
    // Cet effet s'exécute une seule fois après le premier rendu
    const fetchCurrentGame = async () => {
      const currentGame = await fetch(`${process.env.REACT_APP_PMU_API_URL}/api/currentGames/${idRound}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const response = await currentGame.json();
      console.log(response);
      if(response) {
        const getCurrentGame = async () => {
          const currentGame = await fetch(`${process.env.REACT_APP_PMU_API_URL}/api/currentGames/${idRound}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const responseCurrent = await currentGame.json();
          setPositionHorse(responseCurrent.positionHorse);
        }
        getCurrentGame();
      }
    };
    fetchCurrentGame();

    // Il met à jour le paquet de cartes dans le composant parent
    const initialDeck = shuffleDeck(createDeck());
    const initialInconvenient = initialDeck.slice(0,lengthRun -2);
    setDeck(initialDeck.slice(lengthRun -2));
    setInconvenientCard(initialInconvenient);

  }, []);
  
  const modifyCurrentGame = async (deck, discard) => {
      const modifyCurrent = await fetch(`${process.env.REACT_APP_PMU_API_URL}/api/currentGames/`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          roundId: parseInt(idRound),
          positionHorse: positionHorse
        })
      });
      const responseCurrent = await modifyCurrent.json();
      // Faites quelque chose avec les données récupérées si nécessaire
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowFadeIn(finishParty);
    }, 3500); // Délai correspondant à la durée de la transition de l'overlay
    return () => clearTimeout(timeout);
  }, [finishParty]);

  const [winnerHorse, setWinnerHorse] = useState("");
  useEffect(() => {
    if(positionHorse.length !== 0) {
      const highestPositionHorse = positionHorse.reduce((acc, curr) => {
        return acc.position > curr.position ? acc : curr;
      });
      setWinnerHorse(cardsData.find(card => card.type === highestPositionHorse.type));
    }
  }, [positionHorse]);

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
        modifyCurrentGame={modifyCurrentGame}
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
        modifyCurrentGame={modifyCurrentGame}
        finishParty={finishParty}
        FontAwesomeIcon={FontAwesomeIcon}
        faFlagCheckered={faFlagCheckered}
        setAreHorsesPresent={setAreHorsesPresent}
      />
      <div className='playerChat'>
        <PlayerChat
          effectifPlayer={effectifPlayer}
          numberPlayer={numberPlayer}
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