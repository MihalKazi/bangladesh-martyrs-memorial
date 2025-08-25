import React, { useState } from 'react';

const MemorialWall = () => {
  const [candlesLit, setCandlesLit] = useState(15847);
  const [tributesShared, setTributesShared] = useState(3256);
  const [visitorsToday, setVisitorsToday] = useState(892);
  const [showTributeForm, setShowTributeForm] = useState(false);
  const [showTributes, setShowTributes] = useState(false);
  
  const [tributes, setTributes] = useState([
    {
      id: 1,
      name: "Fatima Rahman",
      message: "Your sacrifice will never be forgotten. You fought for justice and equality. May Allah grant you Jannah.",
      date: "2024-08-15"
    },
    {
      id: 2,
      name: "Anonymous",
      message: "Heroes never die. Your blood has watered the seeds of freedom. Thank you for your courage.",
      date: "2024-08-14"
    },
    {
      id: 3,
      name: "Dr. Ahmed Hassan",
      message: "As a father, I salute these brave souls who gave everything for a better Bangladesh. Their families should be proud.",
      date: "2024-08-13"
    }
  ]);

  const [tributeForm, setTributeForm] = useState({
    name: '',
    message: ''
  });

  const lightCandle = () => {
    setCandlesLit(prev => prev + 1);
    setShowTributeForm(true);
  };

  const handleTributeSubmit = (e) => {
    e.preventDefault();
    
    if (tributeForm.message.trim()) {
      const newTribute = {
        id: Date.now(),
        name: tributeForm.name || 'Anonymous',
        message: tributeForm.message,
        date: new Date().toISOString().split('T')[0]
      };
      
      setTributes(prev => [newTribute, ...prev]);
      setTributesShared(prev => prev + 1);
      setTributeForm({ name: '', message: '' });
      setShowTributeForm(false);
      setShowTributes(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTributeForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="section">
      <h2 style={{ color: 'var(--primary-red)', marginBottom: '3rem', textAlign: 'center', fontSize: '2.5rem' }}>
        Digital Memorial Wall
      </h2>
      
      <div className="memorial-wall">
        <div className="candle"></div>
        <h3 style={{ color: 'var(--primary-red)', marginBottom: '2rem', fontSize: '2rem' }}>
          Light a Candle for Our Heroes
        </h3>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.8' }}>
          Join thousands of others in paying tribute to the martyrs of July 2024. Each candle lit represents a prayer, a memory, and a promise that their sacrifice will never be forgotten.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '2rem 0', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={lightCandle}>
            Light a Candle
          </button>
          <button className="btn-primary" onClick={() => setShowTributes(!showTributes)}>
            {showTributes ? 'Hide Tributes' : 'View Tributes'}
          </button>
        </div>

        <div className="stats-grid" style={{ marginTop: '3rem' }}>
          <div className="stat-card">
            <div className="stat-number">{candlesLit.toLocaleString()}</div>
            <div className="stat-label">Candles Lit</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{tributesShared.toLocaleString()}</div>
            <div className="stat-label">Tributes Shared</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{visitorsToday}</div>
            <div className="stat-label">Visitors Today</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">∞</div>
            <div className="stat-label">Memories Preserved</div>
          </div>
        </div>
      </div>

      {/* Tribute Form */}
      {showTributeForm && (
        <div className="form-container">
          <h3 style={{ color: 'var(--primary-red)', marginBottom: '2rem', textAlign: 'center' }}>
            Share Your Tribute
          </h3>
          <form onSubmit={handleTributeSubmit}>
            <div className="form-group">
              <label htmlFor="tributeName">Your Name</label>
              <input
                type="text"
                id="tributeName"
                name="name"
                className="form-input"
                placeholder="Enter your name (optional)"
                value={tributeForm.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tributeMessage">Your Message *</label>
              <textarea
                id="tributeMessage"
                name="message"
                rows="4"
                className="form-input"
                placeholder="Share your tribute, prayer, or memory..."
                value={tributeForm.message}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <button type="submit" className="btn-primary">
                Submit Tribute
              </button>
              <button 
                type="button" 
                className="btn-primary" 
                onClick={() => setShowTributeForm(false)}
                style={{ background: 'rgba(255,255,255,0.1)', marginLeft: '1rem' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tributes Display */}
      {showTributes && (
        <div>
          <h3 style={{ color: 'var(--primary-red)', margin: '3rem 0 2rem', textAlign: 'center' }}>
            Recent Tributes
          </h3>
          <div className="tributes-grid">
            {tributes.map(tribute => (
              <div key={tribute.id} className="tribute-card">
                <div className="tribute-icon">💝</div>
                <div className="tribute-name">{tribute.name}</div>
                <div className="tribute-details">
                  <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                    "{tribute.message}"
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Shared on {new Date(tribute.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .tributes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }

        .tribute-card {
          background: var(--card-bg);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid var(--border-color);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .tribute-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--gradient-primary);
        }

        .tribute-card:hover {
          transform: translateY(-8px);
          background: rgba(255,255,255,0.08);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .tribute-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--gradient-primary);
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          border: 4px solid rgba(255,255,255,0.2);
        }

        .tribute-name {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
        }

        .tribute-details {
          color: var(--text-secondary);
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .tributes-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default MemorialWall;