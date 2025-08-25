import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Martyrs from './components/Martyrs';
import MemorialMap from './components/MemorialMap';
import SubmitForm from './components/SubmitForm';
import Timeline from './components/Timeline';
import MemorialWall from './components/MemorialWall';
import FloatingPetals from './components/FloatingPetals';

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    // Scroll to top when section changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home':
        return <Home />;
      case 'martyrs':
        return <Martyrs />;
      case 'map':
        return <MemorialMap />;
      case 'submit':
        return <SubmitForm />;
      case 'timeline':
        return <Timeline />;
      case 'memorial':
        return <MemorialWall />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <FloatingPetals />
      <Header />
      <Navigation 
        currentSection={currentSection} 
        setCurrentSection={setCurrentSection} 
      />
      <div className="container">
        {renderCurrentSection()}
      </div>
    </div>
  );
}

export default App;