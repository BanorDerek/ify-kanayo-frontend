import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaParking,
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
    venue: "Brick and Ivey Garden",
    address: "1440A Roswell Rd, Marietta, GA 30062, United States",
    description: "Join us as we exchange vows in an outdoor garden setting.",
    note: "The ceremony will take place outdoors. Please prepare accordingly for September weather."
  };

  const receptionDetails = {
    title: "Wedding Reception",
    time: "5:30 PM - 11:00 PM",
    venue: "Brick and Ivey Grand Hall",
    address: "1440A Roswell Rd, Marietta, GA 30062, United States",
    description: "An evening of dinner, dancing, and celebration awaits.",
  };

  const schedule = [
    { time: "4:00 PM", event: "Ceremony", description: "Outdoor garden ceremony", location: "Garden" },
    { time: "4:45 PM", event: "Family Portraits", description: "Family and wedding party photographs", location: "Garden" },
    { time: "5:30 PM", event: "Cocktail Hour", description: "Drinks and hors d'oeuvres", location: "Grand Hall" },
    { time: "6:30 PM", event: "Reception & Dinner", description: "Welcome speech and dinner service", location: "Grand Hall" },
    { time: "8:00 PM", event: "First Dance", description: "Our first dance as a married couple", location: "Grand Hall" },
    { time: "8:30 PM", event: "Dancing", description: "Open dance floor for all guests", location: "Grand Hall" },
    { time: "10:30 PM", event: "Late Night Bites", description: "Midnight snack station opens", location: "Grand Hall" },
    { time: "11:00 PM", event: "Farewell", description: "Last dance and evening conclusion", location: "Grand Hall" }
  ];

  const practicalInfo = [
    {
      icon: <FaParking />,
      title: "Parking",
      description: "Complimentary parking is available at the venue.",
      details: "Valet service will be provided"
    },
    {
      icon: <FaUmbrella />,
      title: "Weather Plan",
      description: "September in Marietta averages 75-85°F.",
      details: "Indoor backup arrangements have been made"
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
          <p>Everything you need to know about our celebration</p>
          <div className={styles.heroDate}>
            <FaCalendarAlt />
            <span>September 12, 2026</span>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <span>Explore</span>
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
              Ceremony
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'reception' ? styles.active : ''}`}
              onClick={() => setActiveTab('reception')}
            >
              <FaGlassCheers className={styles.tabIcon} />
              Reception
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
              Information
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
                      <span>{ceremonyDetails.note}</span>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Brick+and+Ivey+Marietta+GA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.mapBtn}
                    >
                      Get Directions
                      <span>→</span>
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
                    <a
                      href="https://maps.google.com/?q=Brick+and+Ivey+Marietta+GA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.mapBtn}
                    >
                      Get Directions
                      <span>→</span>
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
                  <p className={styles.scheduleSubtitle}>Plan your evening</p>
                  <div className={styles.timeline}>
                    {schedule.map((item, index) => (
                      <div key={index} className={styles.timelineItem}>
                        <div className={styles.timelineIcon}>
                          {item.event === "Ceremony" && <FaRing />}
                          {item.event === "Family Portraits" && <FaCamera />}
                          {item.event === "Cocktail Hour" && <FaGlassCheers />}
                          {item.event === "Reception & Dinner" && <FaGlassCheers />}
                          {item.event === "First Dance" && <FaMusic />}
                          {item.event === "Dancing" && <FaMusic />}
                          {item.event === "Late Night Bites" && <FaGift />}
                          {item.event === "Farewell" && <FaClock />}
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
            <h2>Join Our Celebration</h2>
            <p>Please let us know if you will be attending</p>
            <div className={styles.ctaButtons}>
              <Link to="/rsvp" className={styles.rsvpBtn}>
                RSVP Now
              </Link>
              <Link to="/gift-registry" className={styles.giftBtn}>
                Gift Registry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeddingDetails;