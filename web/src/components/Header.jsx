import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Rules from './Rules';

function Header() {
    /* const imgUser = sessionStorage.getItem('imgUser'); */
    const pseudo = /* sessionStorage.getItem('pseudo') */"Pepili";
    const [showRulesPopup, setShowRulesPopup] = useState(false);
    const toggleRulesPopup = () => {
        setShowRulesPopup(!showRulesPopup);
    }
    return (
        <header>
            <button className='elementUser'>
                <img src='/media/profil.png' alt="profil"/>
                <p>{pseudo}</p>
            </button>
            <img src="/media/logo.png" alt="logo" className='logo'/>
            <button className='rulesButton' onClick={toggleRulesPopup}>
                <FontAwesomeIcon icon={faBook} className='iconRules'/>
                <span className='txtButton'>Règles du jeu</span>
            </button>
            {showRulesPopup && <Rules showPopup={showRulesPopup} closePopup={() => setShowRulesPopup(false)} />}
        </header>
    );
}

export default Header;