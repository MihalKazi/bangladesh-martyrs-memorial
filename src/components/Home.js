import React from 'react';

const Home = () => {
  return (
    <section className="section">
      <div className="memorial-wall">
        <div className="candle"></div>
        <h2 style={{ color: 'var(--primary-red)', marginBottom: '1.5rem', fontSize: '2.5rem' }}>
          In Memory of Our Heroes
        </h2>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          This memorial platform honors the brave souls who sacrificed their lives during the July-August 2024 student movement in Bangladesh. 
          Their courage and sacrifice will never be forgotten. They fought for justice, equality, and a better future for all.
        </p>
        <div style={{ background: 'rgba(220,53,69,0.1)', padding: '1.5rem', borderRadius: '15px', borderLeft: '4px solid var(--primary-red)', marginTop: '2rem' }}>
          <h3 style={{ color: 'var(--primary-red)', marginBottom: '1rem' }}>24/7 Support Hotline: 16000</h3>
          <p>Available daily for families seeking information about martyrs or needing support during this difficult time.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number" id="total-martyrs">200+</div>
          <div className="stat-label">Total Martyrs</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">25+</div>
          <div className="stat-label">Days of Struggle</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">64</div>
          <div className="stat-label">Districts Affected</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">∞</div>
          <div className="stat-label">Forever Remembered</div>
        </div>
      </div>
    </section>
  );
};

export default Home;