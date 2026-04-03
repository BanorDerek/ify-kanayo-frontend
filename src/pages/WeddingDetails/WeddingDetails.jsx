import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCar,
  FaParking,
  FaWheelchair,
  FaPhone,
  FaUmbrella,
  FaMusic,
  FaGlassCheers,
  FaCamera,
  FaRing,
  FaGift,
  FaQuestionCircle
} from 'react-icons/fa';
import styles from './WeddingDetails.module.css';

const WeddingDetails = () => {
  const [activeTab, setActiveTab] = useState('ceremony');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ceremonyDetails = {
    title: "Wedding Ceremony",
    time: "4:00 PM - 5:00 PM",
    venue: "Brick and Ivey Garden (Outdoors)",
    address: "1440A Roswell Rd, Marietta, GA 30062, United States",
    dressCode: "Cocktail or Traditional",
    description: "Join us as we exchange vows.",
    note: "⚠️ The ceremony will be outdoors. Please dress accordingly for September weather."
  };

  const receptionDetails = {
    title: "Reception",
    time: "5:30 PM - 11:00 PM",
    venue: "Brick and Ivey Grand Hall (Indoors)",
    address: "1440A Roswell Rd, Marietta, GA 30062, United States",
    description: "Celebrate with us for an evening of dinner, dancing, and making memories that will last a lifetime.",
  };

  const schedule = [
    { time: "4:00 PM", event: "Ceremony Begins", icon: <FaRing />, description: "Outdoor garden ceremony", location: "Outdoors" },
    { time: "4:45 PM", event: "Family Photos", icon: <FaCamera />, description: "Family and wedding party photos", location: "Outdoors" },
    { time: "5:30 PM", event: "Cocktail Hour", icon: <FaGlassCheers />, description: "Drinks and appetizers served", location: "Indoors - Grand Hall" },
    { time: "6:30 PM", event: "Reception & Dinner", icon: <FaGlassCheers />, description: "Welcome speech and dinner service", location: "Indoors - Grand Hall" },
    { time: "8:00 PM", event: "First Dance", icon: <FaMusic />, description: "Our first dance as husband and wife", location: "Indoors - Dance Floor" },
    { time: "8:30 PM", event: "Dancing & Celebration", icon: <FaMusic />, description: "Open dance floor for all guests", location: "Indoors - Dance Floor" },
    { time: "10:30 PM", event: "Late Night Snacks", icon: <FaGift />, description: "Midnight snack station opens", location: "Indoors - Grand Hall" },
    { time: "11:00 PM", event: "Farewell", icon: <FaClock />, description: "Last dance and send-off", location: "Indoors" }
  ];

  const practicalInfo = [

    {
      icon: <FaParking />,
      title: "Parking",
      description: "parking is available at the venue.",
    },
    
    {
      icon: <FaUmbrella />,
      title: "Weather Plan",
      description: "September in Marietta averages 75-85°F. The ceremony is planned for outdoors, but we have an indoor backup plan in case of rain.",
      details: "Check back for weather updates before the event"
    },
 
    
  ];

  return (
    <div className={styles.details}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroPattern}></div>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Save the Date</span>
          <h1>Wedding Details</h1>
          <p>Everything you need to know about our special day</p>
          <div className={styles.heroDate}>
            <FaCalendarAlt />
            <span>September 12, 2026</span>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <span>Explore Details</span>
          <div className={styles.scrollArrow}></div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className={styles.tabSection}>
        <div className="container">
          <div className={styles.tabButtons}>
            <button
              className={`${styles.tabBtn} ${activeTab === 'ceremony' ? styles.active : ''}`}
              onClick={() => setActiveTab('ceremony')}
            >
              <FaRing className={styles.tabIcon} />
              Ceremony (Outdoors)
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'reception' ? styles.active : ''}`}
              onClick={() => setActiveTab('reception')}
            >
              <FaGlassCheers className={styles.tabIcon} />
              Reception (Indoors)
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'schedule' ? styles.active : ''}`}
              onClick={() => setActiveTab('schedule')}
            >
              <FaClock className={styles.tabIcon} />
              Schedule
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'info' ? styles.active : ''}`}
              onClick={() => setActiveTab('info')}
            >
              <FaQuestionCircle className={styles.tabIcon} />
              Practical Info
            </button>
          </div>

          <div className={styles.tabContent}>
            {/* Ceremony Tab */}
            {activeTab === 'ceremony' && (
              <div className={`${styles.tabPane} fade-in`}>
                <div className={styles.infoCard}>
                  <div className={styles.infoCardLeft}>
                    <div className={styles.infoIcon}>
                      <FaRing />
                    </div>
                    <div className={styles.infoDecoration}></div>
                  </div>
                  <div className={styles.infoCardRight}>
                    <h2>{ceremonyDetails.title}</h2>
                    <div className={styles.infoRow}>
                      <FaClock className={styles.infoIconSmall} />
                      <div>
                        <strong>Time:</strong> {ceremonyDetails.time}
                      </div>
                    </div>
                    <div className={styles.infoRow}>
                      <FaMapMarkerAlt className={styles.infoIconSmall} />
                      <div>
                        <strong>Venue:</strong> {ceremonyDetails.venue}
                      </div>
                    </div>
                    <p className={styles.address}>{ceremonyDetails.address}</p>
                    <p className={styles.description}>{ceremonyDetails.description}</p>
                    <div className={styles.weatherNote}>
                      <span className={styles.weatherIcon}>🌤️</span>
                      <span>{ceremonyDetails.note}</span>
                    </div>
                    <div className={styles.humorNote}>
  <span className={styles.humorIcon}>👠➡️🏃‍♀️</span>
  <p className={styles.humorText}>Paved courtyard = no heels sinking into grass! Your stilettos will survive, and so will your ankles. Dance freely, walk proudly, and leave the grass stains for someone else's wedding. 💃</p>
</div>
                    <a
                      href="https://maps.google.com/?q=Brick+and+Ivey+Marietta+GA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.mapBtn}
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Reception Tab */}
            {activeTab === 'reception' && (
              <div className={`${styles.tabPane} fade-in`}>
                <div className={styles.infoCard}>
                  <div className={styles.infoCardLeft}>
                    <div className={styles.infoIcon}>
                      <FaGlassCheers />
                    </div>
                    <div className={styles.infoDecoration}></div>
                  </div>
                  <div className={styles.infoCardRight}>
                    <h2>{receptionDetails.title}</h2>
                    <div className={styles.infoRow}>
                      <FaClock className={styles.infoIconSmall} />
                      <div>
                        <strong>Time:</strong> {receptionDetails.time}
                      </div>
                    </div>
                    <div className={styles.infoRow}>
                      <FaMapMarkerAlt className={styles.infoIconSmall} />
                      <div>
                        <strong>Venue:</strong> {receptionDetails.venue}
                      </div>
                    </div>
                    <p className={styles.address}>{receptionDetails.address}</p>
                    <p className={styles.description}>{receptionDetails.description}</p>
                    <div className={styles.specialNote}>
                      <p>✨ {receptionDetails.note} ✨</p>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Brick+and+Ivey+Marietta+GA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.mapBtn}
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <div className={`${styles.tabPane} fade-in`}>
                <div className={styles.scheduleCard}>
                  <h2>Event Timeline</h2>
                  <p className={styles.scheduleSubtitle}>Plan your evening with our event schedule</p>
                  <div className={styles.timeline}>
                    {schedule.map((item, index) => (
                      <div key={index} className={styles.timelineItem}>
                        <div className={styles.timelineIcon}>
                          {item.icon}
                          {index < schedule.length - 1 && <div className={styles.timelineDot}></div>}
                        </div>
                        <div className={styles.timelineContent}>
                          <div className={styles.timelineTime}>{item.time}</div>
                          <div className={styles.timelineEvent}>{item.event}</div>
                          <div className={styles.timelineDescription}>{item.description}</div>
                          <div className={styles.timelineLocation}>
                            <span className={styles.locationBadge}>{item.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Practical Info Tab */}
            {activeTab === 'info' && (
              <div className={`${styles.tabPane} fade-in`}>
                <div className={styles.practicalGrid}>
                  {practicalInfo.map((item, index) => (
                    <div key={index} className={styles.practicalCard}>
                      <div className={styles.practicalIconWrapper}>
                        {item.icon}
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className={styles.practicalDetail}>
                        <small>{item.details}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaPattern}></div>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to Celebrate With Us?</h2>
            <p>Please let us know if you'll be joining us for this special day</p>
            <div className={styles.ctaButtons}>
              <Link to="/rsvp" className={styles.rsvpBtn}>
                RSVP Now
              </Link>
              <Link to="/gift-registry" className={styles.giftBtn}>
                View Gift Registry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeddingDetails;
