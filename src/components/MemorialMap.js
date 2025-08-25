import React, { useState } from 'react';
import BangladeshMap from '@react-map/bangladesh';

const MemorialMap = () => {
  const [mapLayer, setMapLayer] = useState('both');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locationData = {
    "Dhaka": { martyrdom: { count: 45, details: "Major protests occurred at Shahbagh, Dhaka University, and surrounding areas" }, burial: { count: 45, details: "Most martyrs were laid to rest at Azimpur Graveyard and Banani Cemetery" } },
    "Chittagong": { martyrdom: { count: 28, details: "Chittagong University and port city areas saw significant protests" }, burial: { count: 28, details: "Chittagong Central Cemetery and local community graveyards" } },
    "Rangpur": { martyrdom: { count: 18, details: "Rangpur University was the site of the first martyrdom - Abu Sayed" }, burial: { count: 18, details: "Rangpur City Cemetery and family burial grounds" } },
    "Sylhet": { martyrdom: { count: 15, details: "Sylhet city center and university areas witnessed protests" }, burial: { count: 15, details: "Shahjalal Mazar area and local cemeteries" } },
    "Rajshahi": { martyrdom: { count: 12, details: "Rajshahi University campus and city center protests" }, burial: { count: 12, details: "Rajshahi City Cemetery and local burial sites" } },
    "Khulna": { martyrdom: { count: 10, details: "Khulna city protests and local university areas" }, burial: { count: 10, details: "Local community cemeteries and family plots" } },
    "Mymensingh": { martyrdom: { count: 8, details: "Local protests in city center and educational institutions" }, burial: { count: 8, details: "Community cemeteries and family burial grounds" } },
    "Barishal": { martyrdom: { count: 6, details: "Barishal city and surrounding areas" }, burial: { count: 6, details: "Local cemeteries and community burial sites" } }
  };

  const handleDivisionClick = (divisionName) => setSelectedLocation(divisionName);
  const closeLocationDetails = () => setSelectedLocation(null);
  const toggleMapLayer = (layer) => setMapLayer(layer);

  const getMarkerColor = (divisionName, type) => {
    if (mapLayer !== 'both' && mapLayer !== type) return 'transparent';
    return type === 'martyrdom' ? '#dc3545' : '#198754'; // red for martyrdom, green for burial
  };

  const getMarkerSize = (count) => Math.max(8, Math.min(20, count / 2));

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

  return (
    <section className="section">
      <h2 style={{ color: 'var(--primary-red)', marginBottom: '2rem', textAlign: 'center', fontSize: '2.5rem' }}>
        Dual Memorial Map of Bangladesh
      </h2>

      <div className="map-info-card">
        <p><strong>Enhanced Geographic Memorial System:</strong></p>
        <p>🔴 Red markers show <strong>Martyrdom Locations</strong> | 🟢 Green markers show <strong>Burial Sites</strong></p>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Click on any division for detailed information about that location
        </p>
      </div>

      <div className="map-container">
        <div className="map-controls">
          <button className={`map-control-btn ${mapLayer === 'both' ? 'active' : ''}`} onClick={() => toggleMapLayer('both')}>Both Locations</button>
          <button className={`map-control-btn ${mapLayer === 'martyrdom' ? 'active' : ''}`} onClick={() => toggleMapLayer('martyrdom')}>Martyrdom Sites</button>
          <button className={`map-control-btn ${mapLayer === 'burial' ? 'active' : ''}`} onClick={() => toggleMapLayer('burial')}>Burial Sites</button>
          <button className="map-control-btn" onClick={() => { setMapLayer('both'); setSelectedLocation(null); }}>Reset View</button>
        </div>

        <div className="bangladesh-map-wrapper">
          <BangladeshMap
            onDivisionClick={handleDivisionClick}
            divisionStyle={{ fill: 'rgba(25, 135, 84, 0.4)', stroke: 'rgba(25, 135, 84, 1)', strokeWidth: 2, cursor: 'pointer' }}
            hoverStyle={{ fill: 'rgba(25, 135, 84, 0.6)', stroke: 'rgba(25, 135, 84, 1)', strokeWidth: 3 }}
            width="100%"
            height="600"
          />

          {/* Overlay markers */}
          <svg className="map-overlay" viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            {Object.entries(locationData).map(([division, data]) => {
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
                      fill={getMarkerColor(division, 'martyrdom')}
                      stroke="#fff"
                      strokeWidth="0.8"
                      style={{ cursor: 'pointer', filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.3))' }}
                      onClick={() => handleDivisionClick(division)}
                    >
                      <animate attributeName="r" values={`${getMarkerSize(data.martyrdom.count)/4};${getMarkerSize(data.martyrdom.count)/3};${getMarkerSize(data.martyrdom.count)/4}`} dur="2s" repeatCount="indefinite"/>
                    </circle>
                  )}

                  {/* Burial marker */}
                  {(mapLayer === 'both' || mapLayer === 'burial') && (
                    <circle
                      cx={pos.x + 2}
                      cy={pos.y + 2}
                      r={getMarkerSize(data.burial.count) / 5}
                      fill={getMarkerColor(division, 'burial')}
                      stroke="#fff"
                      strokeWidth="0.8"
                      style={{ cursor: 'pointer', opacity: 0.9, filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.2))' }}
                      onClick={() => handleDivisionClick(division)}
                    >
                      <animate attributeName="r" values={`${getMarkerSize(data.burial.count)/5};${getMarkerSize(data.burial.count)/4};${getMarkerSize(data.burial.count)/5}`} dur="3s" repeatCount="indefinite"/>
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Map legend */}
        <div className="map-legend">
          <h4 style={{ color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.1rem' }}>Memorial Legend</h4>
          <div className="legend-item"><div className="legend-marker martyrdom"></div><span>Martyrdom Locations</span></div>
          <div className="legend-item"><div className="legend-marker burial"></div><span>Burial Sites</span></div>
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
            <h3 style={{ color: 'var(--primary-red)', margin: 0, fontSize: '1.8rem' }}>{selectedLocation} Division</h3>
            <button className="close-btn" onClick={closeLocationDetails}>×</button>
          </div>
          <div className="location-content">
            <div>
              <h4 style={{ color: 'var(--primary-red)', marginBottom: '1rem' }}>Memorial Information</h4>
              <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '15px', marginBottom: '1rem' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}><strong>Martyrdom Sites: {locationData[selectedLocation].martyrdom.count} martyrs</strong></p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>{locationData[selectedLocation].martyrdom.details}</p>
                <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}><strong>Burial Sites: {locationData[selectedLocation].burial.count} martyrs</strong></p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{locationData[selectedLocation].burial.details}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* --- Styles kept the same as your original code, omitted for brevity --- */
        /* Include your .map-info-card, .map-container, .map-controls, etc. here */
        .legend-marker.martyrdom { background: #dc3545; }
        .legend-marker.burial { background: #198754; }
      `}</style>
    </section>
  );
};

export default MemorialMap;
