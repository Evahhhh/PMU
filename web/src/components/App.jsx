import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Components
import Header from './Header';
import Footer from './Footer';

//Pages
import Welcome from '../pages/Welcome';
import Menu from '../pages/Menu';
import CreationParty from '../pages/CreationParty';
import JoinParty from '../pages/JoinParty';
import Room from '../pages/Room';
import Party from '../pages/Party';
import Results from '../pages/Results';

function App() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/menu" element={<><Header/><Menu/></>}/>
          <Route path="/creation" element={<><Header/><CreationParty/></>}/>
          <Route path="/join" element={<><Header/><JoinParty/></>}/>
          <Route path="/room" element={<><Header/><Room/></>}/>
          <Route path="/party" element={<><Header/><Party/></>}/>
          <Route path="/results" element={<><Header/><Results/></>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
