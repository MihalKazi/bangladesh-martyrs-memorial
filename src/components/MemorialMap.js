import React, { useState, useEffect } from 'react';
import BangladeshMap from '@react-map/bangladesh';

const MemorialMap = () => {
  const [mapLayer, setMapLayer] = useState('both');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locationData = {
    "Dhaka": {
      martyrdom: { count: 45, details: "Major protests occurred at Shahbagh, Dhaka University, and surrounding areas" },
      burial: { count: 45, details: "Most martyrs were laid to rest at Azimpur Graveyard and Banani Cemetery" }
    },
    "Chittagong": {
      martyrdom: { count: 28, details: "Chittagong University and port city areas saw significant protests" },
      burial: { count: 28, details: "Chittagong Central Cemetery and local community graveyards" }
    },
    "Rangpur": {
      martyrdom: { count: 18, details: "Rangpur University was the site of the first martyrdom - Abu Sayed" },
      burial: { count: 18, details: "Rangpur City Cemetery and family burial grounds" }
    },
    "Sylhet": {
      martyrdom: { count: 15, details: "Sylhet city center and university areas witnessed protests" },
      burial: { count: 15, details: "Shahjalal Mazar area and local cemeteries" }
    },
    "Rajshahi": {
      martyrdom: { count: 12, details: "Rajshahi University campus and city center protests" },
      burial: { count: 12, details: "Rajshahi City Cemetery and local burial sites" }
    },
    "Khulna": {
      martyrdom: { count: 10, details: "Khulna city protests and local university areas" },
      burial: { count: 10, details: "Local community cemeteries and family plots" }
    },
    "Mymensingh": {
      martyrdom: { count: 8, details: "Local protests in city center and educational institutions" },
      burial: { count: 8, details: "Community cemeteries and family burial grounds" }
    },
    "Barishal": {
      martyrdom: { count: 6, details: "Barishal city and surrounding areas" },
      burial: { count: 6, details: "Local cemeteries and community burial sites" }
    }
  };

  // Force re-style the SVG after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      // Find all SVG paths and style them
      const svgPaths = document.querySelectorAll('.bangladesh-map-wrapper svg path');
      svgPaths.forEach(path => {
        path.style.fill = '#4a5568';
        path.style.stroke = '#68d391';
        path.style.strokeWidth = '1.5px';
        path.style.opacity = '0.9';
        path.style.transition = 'all 0.3s ease';
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleDivisionClick = (divisionName) => {
    setSelectedLocation(divisionName);
  };

  const closeLocationDetails = () => {
    setSelectedLocation(null);
  };

  const toggleMapLayer = (layer) => {
    setMapLayer(layer);
  };

  const getMarkerSize = (count) => {
    return Math.max(12, Math.min(25, count / 1.5));
  };

  return (
    <section className="memorial-map-section">
      <div className="map-header">
        <h2 className="map-title">
          🕯️ Memorial Map of Bangladesh 🕯️
        </h2>
        <p className="map-subtitle">
          Honoring the heroes of July-August 2024 Student Movement
        </p>
      </div>
      
      <div className="map-info-card">
        <p><strong>Interactive Memorial System:</strong></p>
        <p>🔴 <strong>Red markers</strong> show Martyrdom Locations (where heroes fell) | ⚪ <strong>White markers</strong> show Burial Sites (where they rest in peace)</p>
        <p className="map-instructions">
          Click on any division or marker for detailed information about that location
        </p>
      </div>

      <div className="map-container">
        <div className="map-controls">
          <button 
            className={`map-control-btn ${mapLayer === 'both' ? 'active' : ''}`}
            onClick={() => toggleMapLayer('both')}
          >
            🔴⚪ Both Locations
          </button>
          <button 
            className={`map-control-btn ${mapLayer === 'martyrdom' ? 'active' : ''}`}
            onClick={() => toggleMapLayer('martyrdom')}
          >
            🔴 Martyrdom Sites
          </button>
          <button 
            className={`map-control-btn ${mapLayer === 'burial' ? 'active' : ''}`}
            onClick={() => toggleMapLayer('burial')}
          >
            ⚪ Burial Sites
          </button>
          <button 
            className="map-control-btn reset-btn"
            onClick={() => { setMapLayer('both'); setSelectedLocation(null); }}
          >
            🔄 Reset View
          </button>
        </div>

        <div className="bangladesh-map-wrapper">
          <BangladeshMap
            onDivisionClick={handleDivisionClick}
            divisionStyle={{
              fill: '#4a5568',
              stroke: '#68d391',
              strokeWidth: 2,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: 1
            }}
            hoverStyle={{
              fill: '#5a6a7a',
              stroke: '#e53e3e',
              strokeWidth: 3,
              opacity: 1
            }}
            width="100%"
            height="450"
            viewBox="0 0 800 600"
            preserveAspectRatio="xMidYMid meet"
            style={{
              background: 'transparent',
              border: '2px solid #68d391',
              borderRadius: '10px'
            }}
          />
          
          {/* Enhanced overlay markers */}
          <div className="markers-overlay">
            {Object.entries(locationData).map(([division, data]) => {
              const positions = {
                Dhaka: { x: '45%', y: '55%' },
                Chittagong: { x: '75%', y: '65%' },
                Rangpur: { x: '25%', y: '25%' },
                Sylhet: { x: '70%', y: '30%' },
                Rajshahi: { x: '35%', y: '35%' },
                Khulna: { x: '20%', y: '65%' },
                Mymensingh: { x: '50%', y: '40%' },
                Barishal: { x: '40%', y: '75%' }
              };
              
              const pos = positions[division];
              if (!pos) return null;
              
              return (
                <div key={`${division}-markers`} className="marker-group">
                  {/* Martyrdom marker */}
                  {(mapLayer === 'both' || mapLayer === 'martyrdom') && (
                    <div
                      className="marker martyrdom-marker"
                      style={{ 
                        left: pos.x, 
                        top: pos.y,
                        width: `${getMarkerSize(data.martyrdom.count)}px`,
                        height: `${getMarkerSize(data.martyrdom.count)}px`
                      }}
                      onClick={() => handleDivisionClick(division)}
                      title={`${division}: ${data.martyrdom.count} martyrs`}
                    >
                      <div className="marker-inner">
                        <span className="marker-count">{data.martyrdom.count}</span>
                      </div>
                      <div className="marker-pulse"></div>
                    </div>
                  )}
                  
                  {/* Burial marker */}
                  {(mapLayer === 'both' || mapLayer === 'burial') && (
                    <div
                      className="marker burial-marker"
                      style={{ 
                        left: `calc(${pos.x} + 15px)`, 
                        top: `calc(${pos.y} + 15px)`,
                        width: `${getMarkerSize(data.burial.count) * 0.8}px`,
                        height: `${getMarkerSize(data.burial.count) * 0.8}px`
                      }}
                      onClick={() => handleDivisionClick(division)}
                      title={`${division}: ${data.burial.count} burial sites`}
                    >
                      <div className="marker-inner burial-inner">
                        <span className="marker-count burial-count">{data.burial.count}</span>
                      </div>
                      <div className="marker-pulse burial-pulse"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="map-legend">
          <h4 className="legend-title">Memorial Legend</h4>
          <div className="legend-item">
            <div className="legend-marker martyrdom-legend"></div>
            <span>Martyrdom Locations (Where Heroes Fell)</span>
          </div>
          <div className="legend-item">
            <div className="legend-marker burial-legend"></div>
            <span>Burial Sites (Where They Rest)</span>
          </div>
          <div className="legend-note">
            <p>• Marker size indicates number of martyrs</p>
            <p>• Click markers or divisions for details</p>
            <p>• Use controls to toggle between location types</p>
          </div>
        </div>
      </div>

      {/* Enhanced Location details panel */}
      {selectedLocation && (
        <div className="location-details">
          <div className="location-header">
            <h3 className="location-title">
              📍 {selectedLocation} Division Memorial
            </h3>
            <button className="close-btn" onClick={closeLocationDetails}>✕</button>
          </div>
          <div className="location-content">
            <div className="location-section">
              <div className="info-card martyrdom-info">
                <h4>🔴 Martyrdom Sites</h4>
                <div className="stat-highlight">
                  {locationData[selectedLocation].martyrdom.count} Heroes
                </div>
                <p>{locationData[selectedLocation].martyrdom.details}</p>
              </div>
              
              <div className="info-card burial-info">
                <h4>⚪ Burial Sites</h4>
                <div className="stat-highlight">
                  {locationData[selectedLocation].burial.count} Sites
                </div>
                <p>{locationData[selectedLocation].burial.details}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics grid */}
      <div className="stats-grid">
        <div className="stat-card highlight">
          <div className="stat-number">45</div>
          <div className="stat-label">Dhaka Division</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">28</div>
          <div className="stat-label">Chittagong Division</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">18</div>
          <div className="stat-label">Rangpur Division</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">15</div>
          <div className="stat-label">Sylhet Division</div>
        </div>
      </div>

      <style jsx>{`
        .memorial-map-section {
          padding: 2rem 0;
          background: #1a202c;
          min-height: 100vh;
          color: #e2e8f0;
        }

        .map-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .map-title {
          color: #e53e3e;
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        .map-subtitle {
          font-size: 1.1rem;
          color: #a0aec0;
          margin-bottom: 2rem;
        }

        .map-info-card {
          background: rgba(45, 55, 72, 0.9);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          border-radius: 15px;
          margin: 0 auto 2rem auto;
          max-width: 800px;
          text-align: center;
          border: 1px solid rgba(229, 62, 62, 0.3);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          color: #e2e8f0;
        }

        .map-instructions {
          margin-top: 1rem;
          font-size: 0.9rem;
          color: #a0aec0;
          font-style: italic;
        }

        .map-container {
          background: rgba(45, 55, 72, 0.95);
          backdrop-filter: blur(15px);
          border-radius: 25px;
          padding: 2rem;
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          border: 2px solid rgba(229, 62, 62, 0.4);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
          overflow: hidden;
        }

        .map-controls {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .map-control-btn {
          background: rgba(26, 32, 44, 0.9);
          border: 1px solid rgba(229, 62, 62, 0.4);
          color: #e2e8f0;
          padding: 0.8rem 1.2rem;
          border-radius: 10px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          min-width: 150px;
        }

        .map-control-btn:hover {
          background: rgba(229, 62, 62, 0.8);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(229, 62, 62, 0.3);
        }

        .map-control-btn.active {
          background: rgba(229, 62, 62, 0.9);
          border-color: #e53e3e;
          transform: scale(1.05);
        }

        .reset-btn:hover {
          background: rgba(56, 178, 172, 0.8) !important;
        }

        .bangladesh-map-wrapper {
          position: relative;
          width: 100%;
          height: 450px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 1rem 0;
          border-radius: 15px;
          overflow: hidden;
          background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
          border: 3px solid #68d391;
          box-shadow: inset 0 4px 15px rgba(0,0,0,0.3);
        }

        /* CRITICAL: Force Bangladesh Map to be visible */
        .bangladesh-map-wrapper :global(svg) {
          width: 100% !important;
          height: 100% !important;
          background: transparent !important;
          border-radius: 10px;
        }

        .bangladesh-map-wrapper :global(svg path) {
          fill: #4a5568 !important;
          stroke: #68d391 !important;
          stroke-width: 2px !important;
          opacity: 0.9 !important;
          transition: all 0.3s ease !important;
        }

        .bangladesh-map-wrapper :global(svg path:hover) {
          fill: #5a6a7a !important;
          stroke: #e53e3e !important;
          stroke-width: 3px !important;
          opacity: 1 !important;
          cursor: pointer !important;
        }

        .markers-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10;
        }

        .marker {
          position: absolute;
          transform: translate(-50%, -50%);
          cursor: pointer;
          pointer-events: all;
          z-index: 20;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .marker:hover {
          transform: translate(-50%, -50%) scale(1.2);
          z-index: 30;
        }

        .marker-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.7rem;
          color: white;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
          position: relative;
          z-index: 2;
        }

        .martyrdom-marker .marker-inner {
          background: linear-gradient(135deg, #e53e3e, #c53030);
          border: 2px solid white;
          box-shadow: 0 4px 15px rgba(229, 62, 62, 0.5);
        }

        .burial-marker .marker-inner {
          background: linear-gradient(135deg, #ffffff, #f7fafc);
          border: 2px solid #38b2ac;
          color: #2d3748;
          box-shadow: 0 4px 15px rgba(56, 178, 172, 0.4);
        }

        .marker-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 2s infinite;
          z-index: 1;
        }

        .martyrdom-marker .marker-pulse {
          background: rgba(229, 62, 62, 0.4);
        }

        .burial-marker .marker-pulse {
          background: rgba(56, 178, 172, 0.3);
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          70% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.2);
            opacity: 0;
          }
        }

        .map-legend {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(26, 32, 44, 0.95);
          backdrop-filter: blur(15px);
          padding: 1.5rem;
          border-radius: 15px;
          border: 1px solid rgba(229, 62, 62, 0.3);
          max-width: 280px;
          color: #e2e8f0;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }

        .legend-title {
          color: #e53e3e;
          margin-bottom: 1rem;
          font-size: 1rem;
          font-weight: bold;
        }

        .legend-item {
          display: flex;
          align-items: center;
          margin-bottom: 0.8rem;
          font-size: 0.85rem;
        }

        .legend-marker {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-right: 0.8rem;
          border: 2px solid white;
          flex-shrink: 0;
        }

        .martyrdom-legend {
          background: linear-gradient(135deg, #e53e3e, #c53030);
        }

        .burial-legend {
          background: linear-gradient(135deg, #ffffff, #f7fafc);
          border-color: #38b2ac !important;
        }

        .legend-note {
          font-size: 0.75rem;
          color: #a0aec0;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(160, 174, 192, 0.2);
        }

        .legend-note p {
          margin: 0.3rem 0;
        }

        .location-details {
          background: rgba(45, 55, 72, 0.95);
          backdrop-filter: blur(15px);
          padding: 2rem;
          border-radius: 20px;
          margin: 2rem auto;
          max-width: 900px;
          border: 2px solid #e53e3e;
          box-shadow: 0 20px 60px rgba(229, 62, 62, 0.3);
          animation: slideInUp 0.5s ease;
          color: #e2e8f0;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .location-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .location-title {
          color: #e53e3e;
          margin: 0;
          font-size: 1.6rem;
          font-weight: bold;
        }

        .close-btn {
          background: linear-gradient(135deg, #e53e3e, #c53030);
          border: none;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.6rem;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(229, 62, 62, 0.3);
        }

        .close-btn:hover {
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 6px 20px rgba(229, 62, 62, 0.4);
        }

        .location-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .info-card {
          background: rgba(74, 85, 104, 0.6);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          border-radius: 15px;
          border: 1px solid rgba(229, 62, 62, 0.3);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          transition: transform 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.3);
        }

        .info-card h4 {
          color: #e53e3e;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .stat-highlight {
          font-size: 2rem;
          font-weight: bold;
          color: #e53e3e;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          margin: 2rem auto;
          max-width: 800px;
        }

        .stat-card {
          background: rgba(45, 55, 72, 0.9);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          border-radius: 15px;
          text-align: center;
          border: 1px solid rgba(229, 62, 62, 0.3);
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }

        .stat-card:hover {
          transform: translateY(-5px);
          border-color: #e53e3e;
          box-shadow: 0 15px 40px rgba(229, 62, 62, 0.2);
        }

        .stat-card.highlight {
          border-color: #e53e3e;
          background: rgba(229, 62, 62, 0.1);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          color: #e53e3e;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .stat-label {
          color: #e2e8f0;
          font-weight: 600;
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .map-container { 
            padding: 1rem;
            margin: 1rem;
          }
          
          .map-controls {
            position: relative;
            top: auto;
            right: auto;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: 1rem;
          }
          
          .map-control-btn {
            min-width: auto;
            padding: 0.6rem 1rem;
            font-size: 0.8rem;
          }
          
          .bangladesh-map-wrapper {
            height: 350px;
          }
          
          .map-legend {
            position: relative;
            bottom: auto;
            left: auto;
            margin-top: 1rem;
            max-width: none;
          }
          
          .location-details {
            margin: 2rem 1rem;
            padding: 1.5rem;
          }
          
          .location-section {
            grid-template-columns: 1fr;
          }
          
          .map-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default MemorialMap;