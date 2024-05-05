import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Components
import Header from './Header';
import LightHeader from './LightHeader';
import Footer from './Footer';

//Pages
import Welcome from '../pages/Welcome';
import ResetPassword from '../pages/ResetPassword';
import Menu from '../pages/Menu';
import CreationParty from '../pages/CreationParty';
import JoinParty from '../pages/JoinParty';
import Room from '../pages/Room';
import Party from '../pages/Party';
import Results from '../pages/Results';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    const token = sessionStorage.getItem("token");

    if (id && token) {
      setIsLoggedIn(true);
    }
  }, []);
  
  const handleLogin = (id, token) => {
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="/" element={<><LightHeader/><Welcome onLogin={handleLogin}/></>}/>
          <Route path="/reset-password" element={<><LightHeader/><ResetPassword/></>}/>
          <Route path="/menu" element={<><Header/><Menu/></>}/>
          <Route path="/creation" element={<><Header/><CreationParty/></>}/>
          <Route path="/join" element={<><Header/><JoinParty/></>}/>
          <Route path="/room" element={<><Header/><Room/></>}/>
          <Route path="/party" element={<><Header/><Party/></>}/>
          <Route path="/results" element={<><Header/><Results/></>}/>
        </Routes>
        <Footer isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      </div>
    </Router>
  );
}

export default App;
