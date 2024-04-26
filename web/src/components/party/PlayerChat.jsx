import Chat from "./Chat";
import ListPlayer from "./ListPlayer";

export default function playerChat ({numberPlayer, numberPlayerParam, bets, cardsData}) {
    return (
        <div className='playerChat'>
            <ListPlayer
                numberPlayer={numberPlayer}
                numberPlayerParam={numberPlayerParam}
                bets={bets}
                cardsData={cardsData}
            />
            <Chat/>
        </div>
    )
}