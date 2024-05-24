import Chat from "../Chat";
import ListPlayer from "./ListPlayer";

export default function playerChat ({numberPlayer, effectifPlayer, bets, cardsData, socket}) {
    return (
        <div className='playerChat'>
            <ListPlayer
                effectifPlayer={effectifPlayer}
                numberPlayer={numberPlayer}
                bets={bets}
                cardsData={cardsData}
            />
            <Chat socket={socket}/>
        </div>
    )
}