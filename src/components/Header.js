import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>🕯️ July 2024 Bangladesh Martyrs Memorial</h1>
        <p className="subtitle">Honoring the Heroes of Bangladesh Students Movement</p>
        <div className="date-badge">
          <span>📅</span>
          <span>July - August 2024</span>
        </div>
      </div>
      <style jsx>{`
        .header {
          background: linear-gradient(135deg, #dc3545 0%, #000 50%, #198754 100%);
          padding: 3rem 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
          animation: sparkle 20s linear infinite;
        }

        @keyframes sparkle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-10px) scale(1.1); opacity: 0.8; }
        }

        .header-content {
          position: relative;
          z-index: 2;
        }

        .header h1 {
          font-size: clamp(2rem, 5vw, 4rem);
          margin-bottom: 1rem;
          text-shadow: 3px 3px 6px rgba(0,0,0,0.8);
          background: linear-gradient(45deg, #fff, #f8f9fa, #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: titleGlow 3s ease-in-out infinite alternate;
        }

        @keyframes titleGlow {
          0% { text-shadow: 3px 3px 6px rgba(0,0,0,0.8); }
          100% { text-shadow: 3px 3px 15px rgba(220,53,69,0.5); }
        }

        .subtitle {
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          opacity: 0.95;
          margin-bottom: 1.5rem;
          font-weight: 300;
        }

        .date-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.15);
          padding: 0.8rem 2rem;
          border-radius: 50px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          transition: all 0.3s ease;
        }

        .date-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
      `}</style>
    </header>
  );
};

export default Header;