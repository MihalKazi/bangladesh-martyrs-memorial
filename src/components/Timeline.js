import React from 'react';

const Timeline = () => {
  const timelineData = [
    {
      id: 1,
      date: "July 1-15, 2024",
      title: "Initial Protests Begin",
      description: "Students across Bangladesh began peaceful protests demanding quota reform in government jobs. The movement gained momentum with support from various universities and educational institutions nationwide.",
      color: "var(--primary-red)"
    },
    {
      id: 2,
      date: "July 16, 2024",
      title: "First Martyrdom - Abu Sayed",
      description: "Abu Sayed from Rangpur University became the first martyr of the movement. His sacrifice marked a turning point and galvanized the entire nation. His final moments, captured on video, became a symbol of peaceful resistance.",
      color: "var(--primary-red)"
    },
    {
      id: 3,
      date: "July 17-20, 2024",
      title: "Nationwide Escalation",
      description: "The movement spread rapidly across all divisions of Bangladesh. Students from Dhaka, Chittagong, Sylhet, Rajshahi, and other major cities joined in solidarity. The protests remained largely peaceful despite increasing tensions.",
      color: "var(--primary-red)"
    },
    {
      id: 4,
      date: "July 21-25, 2024",
      title: "Critical Days",
      description: "These days witnessed the highest number of casualties as the movement reached its peak. Heroes like Mugdho, Farhan Faiyaz, and Asif Mahbub made the ultimate sacrifice for justice and equality.",
      color: "var(--primary-red)"
    },
    {
      id: 5,
      date: "August 1-5, 2024",
      title: "Final Push",
      description: "The final phase of the movement saw continued resistance and sacrifice. The collective sacrifice of over 200 martyrs finally led to significant policy discussions and reforms.",
      color: "var(--primary-red)"
    },
    {
      id: 6,
      date: "August 5, 2024",
      title: "Government Change",
      description: "The movement's demands were finally acknowledged, leading to significant governmental changes. The sacrifice of our martyrs was not in vain, as their blood paved the way for a more just and equitable system.",
      color: "var(--primary-green)"
    }
  ];

  return (
    <section className="section">
      <h2 style={{ color: 'var(--primary-red)', marginBottom: '3rem', textAlign: 'center', fontSize: '2.5rem' }}>
        Movement Timeline
      </h2>
      
      <div className="timeline">
        {timelineData.map((item, index) => (
          <div key={item.id} className="timeline-item">
            <h3 style={{ color: item.color, marginBottom: '1rem' }}>
              {item.date}
            </h3>
            <h4 style={{ marginBottom: '0.5rem' }}>
              {item.title}
            </h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .timeline {
          position: relative;
          padding-left: 3rem;
          margin: 3rem 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: var(--gradient-primary);
          border-radius: 2px;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 3rem;
          padding: 2rem;
          background: var(--card-bg);
          border-radius: 20px;
          margin-left: 3rem;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .timeline-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: -4.5rem;
          top: 2rem;
          width: 1.5rem;
          height: 1.5rem;
          background: var(--primary-red);
          border-radius: 50%;
          border: 4px solid var(--primary-green);
          box-shadow: 0 0 0 4px rgba(0,0,0,0.9);
        }

        .timeline-item:last-child::before {
          background: var(--primary-green);
          border: 4px solid var(--primary-red);
        }

        @media (max-width: 768px) {
          .timeline { 
            padding-left: 2rem; 
          }
          .timeline-item { 
            margin-left: 2rem; 
          }
          .timeline-item::before { 
            left: -3.5rem; 
          }
        }
      `}</style>
    </section>
  );
};

export default Timeline;