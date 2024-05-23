import React, { useState, useEffect } from 'react';
import Chat from "../components/party/Chat";
import { useNavigate } from "react-router-dom";

// Données des cartes
const cardsData = [
    { id: 1, type: 'Roger', img: '/media/roger.png', logo: '/media/logo.png', color:'#B10E1D' },
    { id: 2, type: 'Gerard', img: '/media/gerard.png', logo: '/media/logo.png', color:'#209BE0' },
    { id: 3, type: 'Jean-Jacques', img: '/media/jean-jacques.png', logo: '/media/logo.png', color:'green' },
    { id: 4, type: 'Marcel', img: '/media/marcel.png', logo: '/media/logo.png', color:'#9747FF'}
];

const idRound = sessionStorage.getItem("idRound");
const token = sessionStorage.getItem('token');
const winner = sessionStorage.getItem('winner');
const idUser = sessionStorage.getItem('id');

function Results() {
    const [numberPlayer, setNumberPlayer] = useState(0);
    const [effectifPlayer, setEffectifPlayer] = useState(0);
    const [idRoom, setIdRoom] = useState(0);
    const [bets, setBets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const id = sessionStorage.getItem("id");
        const token = sessionStorage.getItem("token");
        if (!token || !id) {
          navigate("/");
          return;
        }
    }, [navigate]);

    const fetchData = async () => {
        //room id
        const lengthParty = await fetch(`${process.env.REACT_APP_PMU_API_URL}/api/round/${idRound}`,{
        headers: {
            'Authorization': `Bearer ${token}`
            }
        }
        );
        const length = await lengthParty.json();
        const roomId = length.roomId;
        setIdRoom(roomId);

        //Nombre de joueurs max
        const numberPlayer = await fetch(`${process.env.REACT_APP_PMU_API_URL}/api/room/${roomId}`,{
            headers: {
                'Authorization': `Bearer ${token}`
                }
            }
        );
        const players = await numberPlayer.json();
        setNumberPlayer(players.maxNbPlayers);
        
        //Nombre de joueur dans la partie
        const effectifPlayer = await fetch(`${process.env.REACT_APP_PMU_API_URL}/api/room/players/${roomId}`,{
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
            horse: cardsData.find(horse => horse.id === bet.horse_id).type,
            user_id: bet.user_id
            })
        })
        setBets(arrayBet);
    }

    useEffect(() => { 
        fetchData();    
      }, []);
    
    const handleRelance = () => {
        sessionStorage.removeItem('idRound');
        if(idRoom) {
            navigate(`/room/${idRoom}`);
        }
    };
    console.log(bets);
    const handleExit = () => {
        sessionStorage.removeItem('idRound');
        navigate(`/menu`);
    };
    return (
        <div className='pageResults'>
            <div className='resultsBlock'>
                <div className='result'>
                    <h1>Résultats</h1>
                    <div className='listResults'>
                    {bets.sort((a, b) => a.user_id == idUser ? -1 : 0).map((bet, index) => (
                        <p key={index} style={bet.user_id == idUser ? { color: '#F8CC46', fontWeight:"bold"} : {color:'inherit'}}>
                        {bet.horse == winner ? `${bet.pseudo} doit donner ${bet.bet} gorgées` : `${bet.pseudo} doit boire ${bet.bet} gorgées`}
                        </p>
                    ))}
                    </div>
                </div>
                <div className='buttonResults'>
                    <button className='buttonRelance' onClick={handleRelance}>Relancer une partie</button>
                    <button className='buttonExit' onClick={handleExit}>Quitter</button>
                </div>
            </div>
            <div className='resultChatPlayer'>
                <div className='listPlayer'>
                    <h2>LISTE DES JOUEURS</h2>
                    <div className='listUlPlayers'>
                        <p>Nombre de joueurs: {effectifPlayer}/{numberPlayer}</p>
                        <ul>
                            {bets.map((bet, index) => {
                                return (
                                <li key={index}><div className='imgPseudo' style={{backgroundImage: "url(/media/image2.png)"}}></div> {bet.pseudo}</li>
                                );
                            })}
                        </ul>  
                    </div>                  
                </div>
                <Chat/>
            </div>
        </div>
    );
}

export default Results;