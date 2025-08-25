import React, { useEffect, useState } from 'react';

const FloatingPetals = () => {
  const [petals, setPetals] = useState([]);

  const createPetal = () => {
    const id = Date.now() + Math.random();
    const newPetal = {
      id,
      left: Math.random() * 100,
      animationDuration: Math.random() * 10 + 10,
      animationDelay: Math.random() * 5
    };
    
    setPetals(prev => [...prev, newPetal]);
    
    // Remove petal after animation
    setTimeout(() => {
      setPetals(prev => prev.filter(p => p.id !== id));
    }, (newPetal.animationDuration + newPetal.animationDelay) * 1000);
  };

  useEffect(() => {
    // Create initial petals
    for (let i = 0; i < 10; i++) {
      setTimeout(createPetal, i * 1000);
    }
    
    // Continue creating petals periodically
    const interval = setInterval(createPetal, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-petals">
      {petals.map(petal => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}vw`,
            animationDuration: `${petal.animationDuration}s`,
            animationDelay: `${petal.animationDelay}s`
          }}
        />
      ))}
    </div>
  );
};

export default FloatingPetals;