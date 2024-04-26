import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function JoinParty() {
    const [codeRoom, setCodeRoom] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setCodeRoom(e.target.value);
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Vérification de la valeur de l'entrée ici
        if (codeRoom.trim() === '') {
            setError('Veuillez entrer un code');
            return;
        } else if (codeRoom.length !== 6) {
            setError('Le format de la valeur est incorrect');
            return;
        }
        // Appel à votre API ici (remplacez cette partie par votre logique)
        console.log('Code de salle envoyé à l\'API :', codeRoom);
        // Réinitialisation de l'état
        setCodeRoom('');
        setError('');
    };

    const handleArrowClick = () => {
        navigate('/menu'); // Redirection vers la page '/menu' lors du clic sur le bouton fléché
    };

    return (
        <div className='join'>
             <button className='arrow' onClick={handleArrowClick}><FontAwesomeIcon icon={faArrowLeft} /></button>
            <div className='formJoin'>
                <h2>REJOINS UNE PARTIE !!</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={codeRoom}
                        onChange={handleInputChange}
                        className={`codeRoom ${error && 'error'}`}
                        name="codeRoom"
                        placeholder="Code de la room"
                    />
                    <button type='submit'>Envoyer</button>
                    {error && <p className='errorForm'>{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default JoinParty;
