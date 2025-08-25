import React, { useState } from 'react';

const Martyrs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const martyrsData = [
    {
      id: 1,
      name: "Abu Sayed",
      age: 25,
      martyrdomLocation: "Rangpur University Campus",
      burialLocation: "Rangpur City Cemetery",
      date: "July 16, 2024",
      occupation: "Student",
      location: "Rangpur",
      quote: "The first martyr of the movement - a brave soul who stood for justice and equality. His sacrifice ignited a nation's conscience."
    },
    {
      id: 2,
      name: "Mugdho",
      age: 22,
      martyrdomLocation: "Dhaka University Campus",
      burialLocation: "Azimpur Graveyard",
      date: "July 18, 2024",
      occupation: "University Student",
      location: "Dhaka",
      quote: "A passionate advocate for student rights who gave everything for the cause of justice and equality."
    },
    {
      id: 3,
      name: "Farhan Faiyaz",
      age: 23,
      martyrdomLocation: "Chittagong University",
      burialLocation: "Chittagong Central Cemetery",
      date: "July 19, 2024",
      occupation: "Student",
      location: "Chittagong",
      quote: "His courage in the face of adversity will be remembered forever. A true hero of the people."
    },
    {
      id: 4,
      name: "Wasim Akram",
      age: 24,
      martyrdomLocation: "Sylhet City Center",
      burialLocation: "Sylhet Shahjalal Mazar",
      date: "July 20, 2024",
      occupation: "Recent Graduate",
      location: "Sylhet",
      quote: "A bright mind who sacrificed his future for the betterment of society. His legacy lives on."
    },
    {
      id: 5,
      name: "Asif Mahbub",
      age: 26,
      martyrdomLocation: "Shahbagh Intersection",
      burialLocation: "Banani Graveyard",
      date: "July 21, 2024",
      occupation: "Job Seeker",
      location: "Dhaka",
      quote: "Fought for a fair system that would benefit all young people. His dream of equality continues."
    },
    {
      id: 6,
      name: "Riadh Ahmed",
      age: 21,
      martyrdomLocation: "Rajshahi University",
      burialLocation: "Rajshahi City Cemetery",
      date: "July 17, 2024",
      occupation: "University Student",
      location: "Rajshahi",
      quote: "A promising young leader who stood up for what was right. His voice echoes in our hearts."
    }
  ];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredMartyrs = martyrsData.filter(martyr => {
    const matchesSearch = searchTerm === '' || 
      martyr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      martyr.martyrdomLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      martyr.date.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === '' || martyr.location === locationFilter;
    
    return matchesSearch && matchesLocation;
  });

  return (
    <section className="section">
      <h2 style={{ color: 'var(--primary-red)', marginBottom: '3rem', textAlign: 'center', fontSize: '2.5rem' }}>
        Our Martyrs
      </h2>
      
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, location, or date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chittagong">Chittagong</option>
          <option value="Sylhet">Sylhet</option>
          <option value="Rajshahi">Rajshahi</option>
          <option value="Khulna">Khulna</option>
          <option value="Rangpur">Rangpur</option>
          <option value="Mymensingh">Mymensingh</option>
          <option value="Barisal">Barisal</option>
        </select>
      </div>

      <div className="martyrs-grid">
        {filteredMartyrs.map((martyr) => (
          <div key={martyr.id} className="martyr-card">
            <div className="martyr-photo">{getInitials(martyr.name)}</div>
            <div className="martyr-name">{martyr.name}</div>
            <div className="martyr-details">
              <p><strong>Age:</strong> {martyr.age}</p>
              <p><strong>Martyrdom Location:</strong> {martyr.martyrdomLocation}</p>
              <p><strong>Burial Location:</strong> {martyr.burialLocation}</p>
              <p><strong>Date:</strong> {martyr.date}</p>
              <p><strong>Occupation:</strong> {martyr.occupation}</p>
              <div className="martyr-quote">
                "{martyr.quote}"
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMartyrs.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          <p>No martyrs found matching your search criteria.</p>
        </div>
      )}

      <style jsx>{`
        .martyrs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }

        .martyr-card {
          background: var(--card-bg);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid var(--border-color);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .martyr-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--gradient-primary);
        }

        .martyr-card:hover {
          transform: translateY(-8px);
          background: rgba(255,255,255,0.08);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .martyr-photo {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: var(--gradient-primary);
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: bold;
          color: white;
          border: 4px solid rgba(255,255,255,0.2);
        }

        .martyr-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
        }

        .martyr-details {
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .martyr-details p {
          margin-bottom: 0.5rem;
        }

        .martyr-quote {
          margin-top: 1rem;
          font-style: italic;
          padding: 1rem;
          background: rgba(220,53,69,0.1);
          border-left: 4px solid var(--primary-red);
          border-radius: 0 10px 10px 0;
        }

        @media (max-width: 768px) {
          .martyrs-grid { 
            grid-template-columns: 1fr; 
          }
        }
      `}</style>
    </section>
  );
};

export default Martyrs;