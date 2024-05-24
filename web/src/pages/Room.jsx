import React from 'react';

function Room() {
    sessionStorage.setItem('idRound', 4);
    sessionStorage.setItem("duration", 7);
    return (
        <h1>Room</h1>
    );
}

export default Room;