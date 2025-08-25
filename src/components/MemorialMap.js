import React, { useState } from 'react';
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

  const handleDivisionClick = (divisionName) => {
    setSelectedLocation(divisionName);
  };

  const closeLocationDetails = () => {
    setSelectedLocation(null);
  };

  const toggleMapLayer = (layer) => {
    setMapLayer(layer);
  };

  const getMarkerColor = (divisionName, type) => {
    if (mapLayer !== 'both' && mapLayer !== type) return 'transparent';
    return type === 'martyrdom' ? '#dc3545' : '#ffffff';
  };

  const getMarkerSize = (count) => {
    return Math.max(8, Math.min(20, count / 2));
  };

  return (
    <section className="section">
      <h2 style={{ color: 'var(--primary-red)', marginBottom: '2rem', textAlign: 'center', fontSize: '2.5rem' }}>
        Dual Memorial Map of Bangladesh
      </h2>
      
      <div className="map-info-card">
        <p><strong>Enhanced Geographic Memorial System:</strong></p>
        <p>🔴 Red markers show <strong>Martyrdom Locations</strong> (where heroes fell) | ⚪ White markers show <strong>Burial Sites</strong> (where they rest in peace)</p>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Click on any division for detailed information about that location
        </p>
      </div>

      <div className="map-container">
        <div className="map-controls">
          <button 
            className={`map-control-btn ${mapLayer === 'both' ? 'active' : ''}`}
            onClick={() => toggleMapLayer('both')}
          >
            Both Locations
          </button>
          <button 
            className={`map-control-btn ${mapLayer === 'martyrdom' ? 'active' : ''}`}
            onClick={() => toggleMapLayer('martyrdom')}
          >
            Martyrdom Sites
          </button>
          <button 
            className={`map-control-btn ${mapLayer === 'burial' ? 'active' : ''}`}
            onClick={() => toggleMapLayer('burial')}
          >
            Burial Sites
          </button>
          <button 
            className="map-control-btn"
            onClick={() => { setMapLayer('both'); setSelectedLocation(null); }}
          >
            Reset View
          </button>
        </div>

        <div className="bangladesh-map-wrapper">
          <BangladeshMap
            onDivisionClick={handleDivisionClick}
            divisionStyle={{
              fill: 'rgba(25, 135, 84, 0.4)',
              stroke: 'rgba(25, 135, 84, 1)',
              strokeWidth: 2,
              cursor: 'pointer'
            }}
            hoverStyle={{
              fill: 'rgba(25, 135, 84, 0.6)',
              stroke: 'rgba(25, 135, 84, 1)',
              strokeWidth: 3
            }}
            width="100%"
            height="600"
          />
          
          {/* Overlay markers for martyrdom and burial sites */}
          <svg className="map-overlay" viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            {/* Martyrdom markers - Red */}
            {Object.entries(locationData).map(([division, data]) => {
              const positions = {
                Dhaka: { x: 45, y: 55 },
                Chittagong: { x: 75, y: 65 },
                Rangpur: { x: 25, y: 25 },
                Sylhet: { x: 70, y: 30 },
                Rajshahi: { x: 35, y: 35 },
                Khulna: { x: 20, y: 65 },
                Mymensingh: { x: 50, y: 40 },
                Barishal: { x: 40, y: 75 }
              };
              
              const pos = positions[division];
              if (!pos) return null;
              
              return (
                <g key={`${division}-markers`}>
                  {/* Martyrdom marker */}
                  {(mapLayer === 'both' || mapLayer === 'martyrdom') && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={getMarkerSize(data.martyrdom.count) / 4}
                      fill="#dc3545"
                      stroke="white"
                      strokeWidth="0.5"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDivisionClick(division)}
                    >
                      <animate attributeName="r" values={`${getMarkerSize(data.martyrdom.count) / 4};${getMarkerSize(data.martyrdom.count) / 3};${getMarkerSize(data.martyrdom.count) / 4}`} dur="2s" repeatCount="indefinite"/>
                    </circle>
                  )}
                  
                  {/* Burial marker */}
                  {(mapLayer === 'both' || mapLayer === 'burial') && (
                    <circle
                      cx={pos.x + 2}
                      cy={pos.y + 2}
                      r={getMarkerSize(data.burial.count) / 5}
                      fill="white"
                      stroke="#198754"
                      strokeWidth="0.5"
                      style={{ cursor: 'pointer', opacity: 0.9 }}
                      onClick={() => handleDivisionClick(division)}
                    >
                      <animate attributeName="r" values={`${getMarkerSize(data.burial.count) / 5};${getMarkerSize(data.burial.count) / 4};${getMarkerSize(data.burial.count) / 5}`} dur="3s" repeatCount="indefinite"/>
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="map-legend">
          <h4 style={{ color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.1rem' }}>
            Memorial Legend
          </h4>
          <div className="legend-item">
            <div className="legend-marker martyrdom"></div>
            <span>Martyrdom Locations (Where Heroes Fell)</span>
          </div>
          <div className="legend-item">
            <div className="legend-marker burial"></div>
            <span>Burial Sites (Where They Rest)</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <p>• Marker size indicates number of martyrs</p>
            <p>• Use controls to toggle between location types</p>
          </div>
        </div>
      </div>

      {/* Location details panel */}
      {selectedLocation && (
        <div className="location-details">
          <div className="location-header">
            <h3 style={{ color: 'var(--primary-red)', margin: 0, fontSize: '1.8rem' }}>
              {selectedLocation} Division
            </h3>
            <button className="close-btn" onClick={closeLocationDetails}>×</button>
          </div>
          <div className="location-content">
            <div>
              <h4 style={{ color: 'var(--primary-red)', marginBottom: '1rem' }}>Memorial Information</h4>
              <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '15px', marginBottom: '1rem' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  <strong>Martyrdom Sites: {locationData[selectedLocation].martyrdom.count} martyrs</strong>
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>
                  {locationData[selectedLocation].martyrdom.details}
                </p>
                <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  <strong>Burial Sites: {locationData[selectedLocation].burial.count} martyrs</strong>
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {locationData[selectedLocation].burial.details}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics by location */}
      <div className="stats-grid" style={{ marginTop: '3rem' }}>
        <div className="stat-card">
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
        .map-info-card {
          background: var(--card-bg);
          padding: 1.5rem;
          borderRadius: 15px;
          marginBottom: 2rem;
          textAlign: center;
          border: 1px solid var(--border-color);
        }

        .map-container {
          background: var(--card-bg);
          borderRadius: 25px;
          padding: 2rem;
          position: relative;
          height: 800px;
          border: 2px solid var(--border-color);
          overflow: hidden;
          backdropFilter: blur(10px);
        }

        .map-controls {
          position: absolute;
          top: 20px;
          right: 20px;
          zIndex: 10;
          display: flex;
          flexDirection: column;
          gap: 0.5rem;
        }

        .map-control-btn {
          background: rgba(0,0,0,0.8);
          border: 1px solid var(--border-color);
          color: white;
          padding: 0.8rem 1.2rem;
          borderRadius: 10px;
          cursor: pointer;
          fontSize: 0.9rem;
          transition: all 0.3s ease;
          backdropFilter: blur(10px);
        }

        .map-control-btn:hover {
          background: var(--primary-red);
          transform: scale(1.05);
        }

        .map-control-btn.active {
          background: linear-gradient(135deg, #dc3545 0%, #198754 100%);
        }

        .bangladesh-map-wrapper {
          position: relative;
          width: 100%;
          height: 600px;
          display: flex;
          justifyContent: center;
          alignItems: center;
        }

        .map-overlay {
          pointerEvents: none;
        }

        .map-overlay circle {
          pointerEvents: all;
        }

        .map-legend {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(0,0,0,0.9);
          padding: 1.5rem;
          borderRadius: 15px;
          backdropFilter: blur(15px);
          border: 1px solid var(--border-color);
          maxWidth: 300px;
        }

        .legend-item {
          display: flex;
          alignItems: center;
          marginBottom: 0.8rem;
          fontSize: 0.9rem;
        }

        .legend-marker {
          width: 16px;
          height: 16px;
          borderRadius: 50%;
          marginRight: 0.8rem;
          border: 2px solid white;
        }

        .legend-marker.martyrdom {
          background: var(--primary-red);
        }

        .legend-marker.burial {
          background: white;
        }

        .location-details {
          background: var(--card-bg);
          padding: 2.5rem;
          borderRadius: 20px;
          margin: 2rem 0;
          border: 2px solid var(--primary-red);
          backdropFilter: blur(10px);
          animation: slideInUp 0.5s ease;
        }

        .location-header {
          display: flex;
          justifyContent: space-between;
          alignItems: center;
          marginBottom: 2rem;
          flexWrap: wrap;
          gap: 1rem;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--text-primary);
          fontSize: 2rem;
          cursor: pointer;
          padding: 0.5rem;
          borderRadius: 50%;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(255,255,255,0.1);
          transform: scale(1.1);
        }

        .location-content {
          display: grid;
          gridTemplateColumns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .map-container { 
            height: 600px; 
          }
        }
      `}</style>
    </section>
  );
};

export default MemorialMap;