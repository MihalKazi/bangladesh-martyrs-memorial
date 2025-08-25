import React from 'react';

const Navigation = ({ currentSection, setCurrentSection }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'martyrs', label: 'Martyrs', icon: '👥' },
    { id: 'map', label: 'Memorial Map', icon: '🗺️' },
    { id: 'submit', label: 'Submit Memorial', icon: '📝' },
    { id: 'timeline', label: 'Timeline', icon: '📅' },
    { id: 'memorial', label: 'Memorial Wall', icon: '🕯️' }
  ];

  const handleNavClick = (sectionId) => {
    setCurrentSection(sectionId);
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-btn ${currentSection === item.id ? 'active' : ''}`}
            onClick={() => handleNavClick(item.id)}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>
      <style jsx>{`
        .nav {
          background: rgba(0,0,0,0.9);
          padding: 1.5rem 0;
          position: sticky;
          top: 0;
          z-index: 1000;
          backdrop-filter: blur(15px);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 0 2rem;
        }

        .nav-btn {
          background: linear-gradient(135deg, #dc3545 0%, #198754 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          min-width: 120px;
        }

        .nav-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .nav-btn:hover::before {
          left: 100%;
        }

        .nav-btn:hover, .nav-btn.active {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 10px 25px rgba(220, 53, 69, 0.4);
        }

        .nav-btn.active {
          background: linear-gradient(45deg, #198754, #dc3545);
        }

        @media (max-width: 768px) {
          .nav-container { 
            gap: 0.5rem; 
            padding: 0 1rem; 
          }
          .nav-btn { 
            padding: 0.8rem 1.2rem; 
            font-size: 0.9rem; 
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;