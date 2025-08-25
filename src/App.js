import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, User, Building, Heart, Flame, Plus, X, Clock, Phone } from 'lucide-react';
import BangladeshMap from '@react-map/bangladesh';

// Custom map wrapper component to handle the markers and interactions
const MemorialMapComponent = ({ showMartyrdom, showBurial, onLocationClick }) => {
  const [selectedDivision, setSelectedDivision] = useState(null);
  
  // Martyr data by division
  const martyrData = {
    "Rangpur": { martyrs: 1, burials: 1, names: ["Abu Sayed"] },
    "Dhaka": { martyrs: 2, burials: 2, names: ["Mugdho Rahman", "Rafiq Ahmed"] },
    "Chattogram": { martyrs: 1, burials: 1, names: ["Farhan Faiyaz"] },
    "Sylhet": { martyrs: 1, burials: 1, names: ["Asif Mahbub"] },
    "Rajshahi": { martyrs: 1, burials: 1, names: ["Karim Hassan"] },
    "Khulna": { martyrs: 0, burials: 0, names: [] },
    "Barishal": { martyrs: 0, burials: 0, names: [] },
    "Mymensingh": { martyrs: 0, burials: 0, names: [] }
  };

  // Handle division click
  const handleDivisionClick = (divisionName) => {
    setSelectedDivision(selectedDivision === divisionName ? null : divisionName);
    if (onLocationClick) {
      onLocationClick(divisionName, martyrData[divisionName]);
    }
  };

  // Custom division styles based on martyr data
  const getDivisionStyle = (divisionName) => {
    const data = martyrData[divisionName];
    if (!data || data.martyrs === 0) {
      return {
        fill: '#f0fdf4', // light green for no martyrs
        stroke: '#16a34a',
        strokeWidth: 1,
        cursor: 'pointer',
        opacity: 0.7
      };
    }
    
    return {
      fill: selectedDivision === divisionName ? '#dc2626' : '#fca5a5', // red for martyrs
      stroke: '#dc2626',
      strokeWidth: selectedDivision === divisionName ? 3 : 2,
      cursor: 'pointer',
      opacity: selectedDivision === divisionName ? 1 : 0.8
    };
  };

  // Custom markers overlay
  const renderMarkers = () => {
    if (!showMartyrdom && !showBurial) return null;

    return (
      <div className="absolute inset-0 pointer-events-none">
        {Object.entries(martyrData).map(([division, data]) => {
          if (data.martyrs === 0) return null;
          
          // Approximate positions for markers (you may need to adjust these)
          const positions = {
            "Rangpur": { x: '25%', y: '20%' },
            "Dhaka": { x: '55%', y: '50%' },
            "Chattogram": { x: '75%', y: '65%' },
            "Sylhet": { x: '75%', y: '30%' },
            "Rajshahi": { x: '35%', y: '35%' },
            "Mymensingh": { x: '55%', y: '35%' }
          };
          
          const position = positions[division];
          if (!position) return null;

          return (
            <div 
              key={division}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              style={{ left: position.x, top: position.y }}
            >
              <div className="relative group">
                {/* Martyrdom marker */}
                {showMartyrdom && (
                  <div 
                    className="w-4 h-4 bg-red-600 rounded-full cursor-pointer hover:scale-125 transition-transform shadow-lg border-2 border-white"
                    onClick={() => handleDivisionClick(division)}
                    title={`${data.martyrs} martyr(s) in ${division}`}
                  />
                )}
                
                {/* Burial marker */}
                {showBurial && (
                  <div 
                    className="absolute w-3 h-3 bg-white border-2 border-gray-600 rounded-full cursor-pointer hover:scale-125 transition-transform shadow-lg ml-3 -mt-1"
                    onClick={() => handleDivisionClick(division)}
                    title={`${data.burials} burial site(s) in ${division}`}
                  />
                )}
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black bg-opacity-90 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
                  <div className="font-semibold">{division} Division</div>
                  <div className="text-red-300">Martyrs: {data.martyrs}</div>
                  {data.names.length > 0 && (
                    <div className="text-gray-300 text-xs mt-1">
                      {data.names.join(', ')}
                    </div>
                  )}
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-green-50 to-blue-50 border border-green-300 rounded-lg overflow-hidden">
      {/* Bangladesh Map */}
      <BangladeshMap
        width="100%"
        height="100%"
        onDivisionClick={handleDivisionClick}
        divisionStyle={getDivisionStyle}
        showDivisionNames={true}
        className="w-full h-full"
      />
      
      {/* Custom markers overlay */}
      {renderMarkers()}
      
      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white bg-opacity-95 p-3 rounded-lg shadow-lg text-xs border border-gray-200">
        <div className="font-semibold text-gray-800 mb-2">Memorial Locations</div>
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 bg-red-600 rounded-full mr-2 border border-white shadow-sm"></div>
          <span className="text-gray-700">Martyrdom Locations</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-2 h-2 bg-white border-2 border-gray-600 rounded-full mr-2"></div>
          <span className="text-gray-700">Burial Sites</span>
        </div>
        {selectedDivision && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="font-medium text-red-600">{selectedDivision} Selected</div>
            <div className="text-gray-600">
              {martyrData[selectedDivision].martyrs} martyr(s)
            </div>
          </div>
        )}
      </div>
      
      {/* Selection info */}
      {selectedDivision && (
        <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg text-sm">
          <div className="font-semibold">{selectedDivision} Division</div>
          <button 
            onClick={() => setSelectedDivision(null)}
            className="text-red-200 hover:text-white ml-2"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [candlesLit, setCandlesLit] = useState(1847);
  const [showMartyrdom, setShowMartyrdom] = useState(true);
  const [showBurial, setShowBurial] = useState(true);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const martyrs = [
    {
      id: 1,
      name: "Abu Sayed",
      age: 25,
      martyrdomLocation: "Rangpur University Campus",
      burialLocation: "Rangpur City Cemetery",
      date: "July 16, 2024",
      occupation: "Student",
      image: null
    },
    {
      id: 2,
      name: "Mugdho Rahman",
      age: 22,
      martyrdomLocation: "Dhaka University Campus",
      burialLocation: "Azimpur Graveyard",
      date: "July 18, 2024",
      occupation: "University Student",
      image: null
    },
    {
      id: 3,
      name: "Farhan Faiyaz",
      age: 23,
      martyrdomLocation: "Chittagong University",
      burialLocation: "Chittagong Central Cemetery",
      date: "July 19, 2024",
      occupation: "Student",
      image: null
    },
    {
      id: 4,
      name: "Asif Mahbub",
      age: 24,
      martyrdomLocation: "Sylhet City Center",
      burialLocation: "Sylhet Shahjalal Mazar",
      date: "July 20, 2024",
      occupation: "Recent Graduate",
      image: null
    },
    {
      id: 5,
      name: "Rafiq Ahmed",
      age: 26,
      martyrdomLocation: "Shahbagh Intersection",
      burialLocation: "Banani Graveyard",
      date: "July 21, 2024",
      occupation: "Job Seeker",
      image: null
    },
    {
      id: 6,
      name: "Karim Hassan",
      age: 21,
      martyrdomLocation: "Rajshahi University",
      burialLocation: "Rajshahi City Cemetery",
      date: "July 17, 2024",
      occupation: "University Student",
      image: null
    }
  ];

  const timeline = [
    {
      period: "July 1-15, 2024",
      title: "Peaceful Protests Begin",
      description: "Students across Bangladesh began peaceful protests demanding quota reform in government jobs. The movement gained momentum with support from various universities and educational institutions nationwide.",
      color: "bg-blue-500"
    },
    {
      period: "July 16, 2024",
      title: "First Martyr - Abu Sayed",
      description: "Abu Sayed from Rangpur University became the first martyr of the movement. His sacrifice marked a turning point and galvanized the entire nation. His final moments, captured on video, became a symbol of peaceful resistance.",
      color: "bg-red-500"
    },
    {
      period: "July 17-19, 2024",
      title: "Movement Spreads Nationwide",
      description: "The movement spread rapidly across all divisions of Bangladesh. Students from Dhaka, Chittagong, Sylhet, Rajshahi, and other major cities joined in solidarity. The protests remained largely peaceful despite increasing tensions.",
      color: "bg-green-500"
    },
    {
      period: "July 20-25, 2024",
      title: "Peak of Resistance",
      description: "These days witnessed the highest number of casualties as the movement reached its peak. Heroes like Mugdho, Farhan Faiyaz, and Asif Mahbub made the ultimate sacrifice for justice and equality.",
      color: "bg-red-600"
    },
    {
      period: "July 26-31, 2024",
      title: "Continued Sacrifice",
      description: "The final phase of the movement saw continued resistance and sacrifice. The collective sacrifice of over 200 martyrs finally led to significant policy discussions and reforms.",
      color: "bg-purple-600"
    },
    {
      period: "August 2024",
      title: "Victory and Reform",
      description: "The movement's demands were finally acknowledged, leading to significant governmental changes. The sacrifice of our martyrs was not in vain, as their blood paved the way for a more just and equitable system.",
      color: "bg-green-600"
    }
  ];

  const lightCandle = () => {
    setCandlesLit(prev => prev + 1);
  };

  const SubmissionForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Submit Martyr Information</h2>
            <button 
              onClick={() => setShowSubmissionForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Martyrdom Location *</label>
              <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Burial Location</label>
              <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Martyrdom *</label>
                <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
              <textarea rows="4" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" 
                placeholder="Any additional details about the martyr's sacrifice or background"></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Information (for verification)</label>
              <input type="email" placeholder="Email address" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <p className="text-sm text-yellow-800">
                All information will be carefully verified before publication. Your contribution helps preserve their memory for future generations.
              </p>
            </div>
            
            <div className="flex gap-4">
              <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors">
                Submit Information
              </button>
              <button type="button" onClick={() => setShowSubmissionForm(false)} 
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-red-700 text-white py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Flame className="mr-3 text-yellow-300" size={40} />
              <h1 className="text-4xl md:text-5xl font-bold">🕯️ July 2024 Bangladesh Martyrs Memorial</h1>
              <Flame className="ml-3 text-yellow-300" size={40} />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-green-100">
              Honoring the Heroes of Bangladesh Students Movement
            </h2>
            <p className="text-lg max-w-4xl mx-auto leading-relaxed text-green-50">
              This memorial platform honors the brave souls who sacrificed their lives during the July-August 2024 student movement in Bangladesh. 
              Their courage and sacrifice will never be forgotten. They fought for justice, equality, and a better future for all.
            </p>
            <div className="mt-6 bg-green-800 bg-opacity-50 rounded-lg p-4 inline-block">
              <div className="flex items-center justify-center">
                <Phone className="mr-2" size={20} />
                <span>Available daily for families seeking information about martyrs or needing support during this difficult time.</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Martyrs Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center">
            <Heart className="mr-3 text-red-500" />
            Martyrs of the Movement
            <Heart className="ml-3 text-red-500" />
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {martyrs.map((martyr) => (
              <div key={martyr.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-red-100">
                <div className="h-2 bg-gradient-to-r from-red-500 to-green-500"></div>
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <User size={32} className="text-gray-500" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-800">{martyr.name}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <User size={18} className="mr-3 text-red-500" />
                      <span className="font-medium">Age: {martyr.age}</span>
                    </div>
                    <div className="flex items-start text-gray-700">
                      <MapPin size={18} className="mr-3 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Martyrdom Location:</div>
                        <div className="text-sm">{martyr.martyrdomLocation}</div>
                      </div>
                    </div>
                    <div className="flex items-start text-gray-700">
                      <MapPin size={18} className="mr-3 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Burial Location:</div>
                        <div className="text-sm">{martyr.burialLocation}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Calendar size={18} className="mr-3 text-red-500" />
                      <span className="font-medium">Date: {martyr.date}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Building size={18} className="mr-3 text-red-500" />
                      <span className="font-medium">Occupation: {martyr.occupation}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Enhanced Geographic Memorial System:
          </h2>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Map Controls */}
            <div className="flex flex-wrap items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showMartyrdom}
                    onChange={(e) => setShowMartyrdom(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-red-600 font-medium">🔴 Red markers show Martyrdom Locations (where heroes fell)</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showBurial}
                    onChange={(e) => setShowBurial(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-gray-600 font-medium">⚪ White markers show Burial Sites (where they rest in peace)</span>
                </label>
              </div>
            </div>

            <MemorialMapComponent 
              showMartyrdom={showMartyrdom}
              showBurial={showBurial}
              onLocationClick={(division, data) => {
                console.log(`Clicked division: ${division}`, data);
              }}
            />
            
            <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              <p className="mb-2">📍 Click on any marker for detailed information about that location</p>
              <p className="mb-2">📏 Marker size indicates number of martyrs</p>
              <p>🎛️ Use controls to toggle between location types</p>
            </div>
          </div>
        </section>

        {/* Submit Information Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-red-100 to-green-100 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Help us honor our martyrs</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Help us honor our martyrs by providing information about those who sacrificed their lives. 
              All information will be carefully verified before publication. Your contribution helps preserve their memory for future generations.
            </p>
            <button 
              onClick={() => setShowSubmissionForm(true)}
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center mx-auto"
            >
              <Plus size={20} className="mr-2" />
              Submit Martyr Information
            </button>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Timeline of the Movement</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((event, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start">
                    <div className="flex flex-col items-center mr-6">
                      <div className={`w-6 h-6 ${event.color} rounded-full border-4 border-white shadow-lg`}></div>
                      {index < timeline.length - 1 && (
                        <div className="w-1 h-20 bg-gray-300 mt-2"></div>
                      )}
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6 flex-1 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center mb-2">
                        <Clock className="mr-2 text-gray-500" size={16} />
                        <div className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-full">
                          {event.period}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Candle Tribute Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-lg p-8 text-center max-w-2xl mx-auto border border-yellow-200">
            <div className="text-8xl mb-6 animate-pulse">🕯️</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Light a Candle in Memory</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Join thousands of others in paying tribute to the martyrs of July 2024. Each candle lit represents a prayer, 
              a memory, and a promise that their sacrifice will never be forgotten.
            </p>
            
            <div className="bg-white rounded-lg p-6 mb-6 border border-yellow-300">
              <div className="text-5xl font-bold text-red-600 mb-2">
                {candlesLit.toLocaleString()}
              </div>
              <p className="text-gray-600 text-lg">Candles lit in memory</p>
              <p className="text-sm text-gray-500 mt-2">
                Last updated: {currentTime.toLocaleString()}
              </p>
            </div>
            
            <button
              onClick={lightCandle}
              className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-10 py-4 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300 font-bold text-lg flex items-center mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Heart size={24} className="mr-3" />
              Light a Candle
              <Flame size={24} className="ml-3" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-800 to-red-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              {[...Array(7)].map((_, i) => (
                <Flame key={i} className="mx-2 text-yellow-300" size={24} />
              ))}
            </div>
            <h3 className="text-2xl font-bold mb-4">In Eternal Memory</h3>
            <p className="text-lg mb-2 text-green-100">
              In loving memory of all martyrs who sacrificed for justice and equality
            </p>
            <p className="text-green-200 mb-6">
              Their sacrifice was not in vain - it paved the way for a more just and equitable system
            </p>
            <div className="bg-black bg-opacity-30 rounded-lg p-4 inline-block">
              <p className="text-yellow-200 font-medium">
                "The blood of martyrs is the seed of freedom" - Thomas Campbell
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Submission Form Modal */}
      {showSubmissionForm && <SubmissionForm />}
    </div>
  );
};

export default App;