import React, { useState } from 'react';

const SubmitForm = () => {
  const [formData, setFormData] = useState({
    martyrName: '',
    age: '',
    martyrdomLocation: '',
    burialLocation: '',
    division: '',
    dateOfIncident: '',
    occupation: '',
    institution: '',
    biography: '',
    submitterName: '',
    relationship: '',
    submitterEmail: '',
    submitterPhone: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your submission. The memorial information will be reviewed and added within 72 hours.');
      setFormData({
        martyrName: '',
        age: '',
        martyrdomLocation: '',
        burialLocation: '',
        division: '',
        dateOfIncident: '',
        occupation: '',
        institution: '',
        biography: '',
        submitterName: '',
        relationship: '',
        submitterEmail: '',
        submitterPhone: '',
        additionalInfo: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <section className="section">
      <h2 style={{ color: 'var(--primary-red)', marginBottom: '3rem', textAlign: 'center', fontSize: '2.5rem' }}>
        Submit Memorial Information
      </h2>

      <div className="form-container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            Help us honor our martyrs by providing information about those who sacrificed their lives.
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            All information will be carefully verified before publication. Your contribution helps preserve their memory for future generations.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Martyr Info Fields */}
            <div className="form-group">
              <label htmlFor="martyrName">Full Name *</label>
              <input
                type="text"
                id="martyrName"
                name="martyrName"
                className="form-input"
                value={formData.martyrName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                min="1"
                max="100"
                className="form-input"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="martyrdomLocation">Martyrdom Location *</label>
              <input
                type="text"
                id="martyrdomLocation"
                name="martyrdomLocation"
                className="form-input"
                placeholder="Where the sacrifice occurred"
                value={formData.martyrdomLocation}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="burialLocation">Burial Location</label>
              <input
                type="text"
                id="burialLocation"
                name="burialLocation"
                className="form-input"
                placeholder="Where they rest (if different from martyrdom site)"
                value={formData.burialLocation}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="division">Division *</label>
              <select
                id="division"
                name="division"
                className="form-input"
                value={formData.division}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Division</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Khulna">Khulna</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Mymensingh">Mymensingh</option>
                <option value="Barishal">Barishal</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dateOfIncident">Date of Incident *</label>
              <input
                type="date"
                id="dateOfIncident"
                name="dateOfIncident"
                className="form-input"
                value={formData.dateOfIncident}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="occupation">Occupation</label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                className="form-input"
                placeholder="e.g., Student, Job Seeker, etc."
                value={formData.occupation}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="institution">Institution/Organization</label>
              <input
                type="text"
                id="institution"
                name="institution"
                className="form-input"
                placeholder="School, University, Company, etc."
                value={formData.institution}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Biography */}
          <div className="form-group">
            <label htmlFor="biography">Biography/Memorial Message *</label>
            <textarea
              id="biography"
              name="biography"
              rows="5"
              className="form-input"
              placeholder="Share memories, achievements, or a message about this person..."
              value={formData.biography}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Submitter Info */}
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="submitterName">Your Name *</label>
              <input
                type="text"
                id="submitterName"
                name="submitterName"
                className="form-input"
                value={formData.submitterName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="relationship">Your Relationship to the Martyr *</label>
              <select
                id="relationship"
                name="relationship"
                className="form-input"
                value={formData.relationship}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Relationship</option>
                <option value="Family Member">Family Member</option>
                <option value="Friend">Friend</option>
                <option value="Classmate">Classmate</option>
                <option value="Colleague">Colleague</option>
                <option value="Community Member">Community Member</option>
                <option value="Witness">Witness</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="submitterEmail">Your Email *</label>
              <input
                type="email"
                id="submitterEmail"
                name="submitterEmail"
                className="form-input"
                value={formData.submitterEmail}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="submitterPhone">Your Phone Number</label>
              <input
                type="tel"
                id="submitterPhone"
                name="submitterPhone"
                className="form-input"
                value={formData.submitterPhone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="additionalInfo">Additional Information</label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              rows="3"
              className="form-input"
              placeholder="Any additional details, verification sources, or special circumstances..."
              value={formData.additionalInfo}
              onChange={handleInputChange}
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Memorial Information'}
            </button>
          </div>
        </form>
      </div>

      {/* Guidelines Card */}
      <div className="guidelines-card">
        <h3 style={{ color: 'var(--primary-red)', marginBottom: '1rem' }}>Important Guidelines</h3>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
          <li>All information will be carefully verified before publication</li>
          <li>Please provide accurate location details for both martyrdom and burial sites</li>
          <li>Photos will be handled with utmost respect and dignity</li>
          <li>Family consent is required for all personal information</li>
          <li>Submissions are reviewed within 72 hours</li>
        </ul>
      </div>

      <style jsx>{`
        .guidelines-card {
          background: rgba(220,53,69,0.1);
          padding: 2rem;
          border-radius: 15px;
          margin-top: 2rem;
          border: 1px solid var(--primary-red);
        }

        @media (max-width: 768px) {
          .form-grid { 
            grid-template-columns: 1fr; 
          }
        }
      `}</style>
    </section>
  );
};

export default SubmitForm;
