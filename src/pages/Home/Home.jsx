import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Home.module.css';
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer';
import Gallery from '../../components/Gallery/Gallery';
import GiftRegistryPromo from '../../components/GiftRegistryPromo/GiftRegistryPromo';
import couplePhoto from '../../assets/images/couple/couple-1.jpg';

const Home = () => {
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Refs for scroll animation elements
  const scrollElementsRef = useRef([]);

  useEffect(() => {
    // Create particles for hero section
    const newParticles = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 15 + 8,
        delay: Math.random() * 5,
      });
    }
    setParticles(newParticles);

    // Auto-rotate decorative elements
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 3000);

    // Use Intersection Observer for better performance
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        } else {
          entry.target.classList.remove(styles.visible);
        }
      });
    }, observerOptions);

    // Observe all scroll animation elements - using the actual CSS Module class names
    setTimeout(() => {
      const scrollElements = document.querySelectorAll([
        `.${styles['scroll-from-left']}`,
        `.${styles['scroll-from-right']}`,
        `.${styles['scroll-from-left-fade']}`,
        `.${styles['scroll-from-right-fade']}`,
        `.${styles['scroll-from-left-scale']}`,
        `.${styles['scroll-from-right-scale']}`,
        `.${styles['scroll-from-left-rotate']}`,
        `.${styles['scroll-from-right-rotate']}`,
        `.${styles['fade-on-scroll']}`
      ].join(','));
      
      scrollElements.forEach(el => observer.observe(el));
    }, 100);

    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    // Swipe functionality
    const handleTouchStart = (e) => {
      setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (touchStart - touchEnd > 75) {
        window.scrollBy({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
      if (touchStart - touchEnd < -75) {
        window.scrollBy({
          top: -window.innerHeight,
          behavior: 'smooth'
        });
      }
    };

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        window.scrollBy({
          top: e.deltaX,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('wheel', handleWheel);
      clearInterval(interval);
      observer.disconnect();
    };
  }, [touchStart, touchEnd]);

  const parallaxStyle = {
    transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
  };

  const parallaxReverseStyle = {
    transform: `translate(${-mousePosition.x * 20}px, ${-mousePosition.y * 20}px)`,
  };

  const scrollToNext = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const rotatingTexts = ['Forever Starts Here', 'Love is in the Air', 'Happily Ever After'];

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroBgImage}></div>
        <div className={styles.heroOverlay}></div>
        
        <div className={styles.particles}>
          {particles.map((particle) => (
            <div
              key={particle.id}
              className={styles.particle}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>

        <div className={styles.ringsContainer}>
          <div className={styles.ring} style={parallaxStyle}>
            <div className={styles.ringInner}></div>
          </div>
          <div className={styles.ring2} style={parallaxReverseStyle}>
            <div className={styles.ringInner2}></div>
          </div>
          <div className={styles.ring3}>
            <div className={styles.ringInner3}></div>
          </div>
          <div className={styles.ring4}>
            <div className={styles.ringInner4}></div>
          </div>
          <div className={styles.ring5}>
            <div className={styles.ringInner5}></div>
          </div>
        </div>

      

   
        
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.subtitleWrapper}>
              <div className={styles.decorLine}></div>
              <motion.span
                className={styles.subtitle}
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {rotatingTexts[activeIndex]}
              </motion.span>
              <div className={styles.decorLine}></div>
            </div>
            
            <motion.h1
              className={styles.title}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className={styles.titleWord}>Ifeoma</span>
              <motion.span
                className={styles.amp}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                &
              </motion.span>
              <span className={styles.titleWord}>Kanayo</span>
            </motion.h1>
            
            <motion.div
              className={styles.dateContainer}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className={styles.dateCard}>
                <span className={styles.dateMonth}>SEPTEMBER</span>
                <span className={styles.dateLabel}>MONTH</span>
              </div>
              <div className={styles.dateDivider}>
                <span>•</span>
              </div>
              <div className={styles.dateCard}>
                <div className={styles.dateNumberWrapper}>
                  <span className={styles.dateNumber}>12</span>
                  <div className={styles.dateGlow}></div>
                </div>
                <span className={styles.dateLabel}>DAY</span>
              </div>
              <div className={styles.dateDivider}>
                <span>•</span>
              </div>
              <div className={styles.dateCard}>
                <span className={styles.dateYear}>2026</span>
                <span className={styles.dateLabel}>YEAR</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to="/rsvp" className={styles.rsvpButton}>
                <span>Reserve Your Seat</span>
                <div className={styles.buttonGlow}></div>
              </Link>
            </motion.div>
          </div>
        </div>
        
        <div className={styles.scrollIndicator} onClick={scrollToNext}>
          <span>Swipe to explore</span>
          <div className={styles.scrollArrow}></div>
          <div className={styles.swipeHint}>
            <span>↓ Swipe Down ↓</span>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className={`section ${styles.countdownSection}`}>
        <div className={styles.countdownDecor}>
          <div className={styles.floatingRing}></div>
          <div className={styles.floatingRing}></div>
          <div className={styles.floatingRing}></div>
        </div>
        <div className="container">
          <div className={styles.countdownWrapper}>
            <span className={`${styles.sectionTag} ${styles['scroll-from-left']}`}>
              THE BIG DAY
            </span>
            <h2 className={`${styles.sectionTitle} ${styles['scroll-from-right']}`}>
              Counting Down to Forever
            </h2>
            <div className={styles['scroll-from-left']}>
              <CountdownTimer targetDate="2026-09-12T00:00:00" />
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className={`section ${styles.welcomeSection}`}>
        <div className="container">
          <div className={styles.welcomeContent}>
            <div className={`${styles.welcomeText} ${styles['scroll-from-left']}`}>
              <div className={styles.welcomeBadge}>Happily Ever After </div>
              <span className={styles.sectionTag}>OUR LOVE STORY</span>
              <h2>Welcome to Our Wedding Journey</h2>
              <div className={styles.quoteMark}>“</div>
              <p>
                With hearts full of joy and gratitude, we invite you to join us as we celebrate
                the beginning of our forever. Your presence at our wedding is the greatest gift
                we could ever ask for, and we can't wait to share this special day with you.
              </p>
              <p>
                Please explore our wedding website to learn more about our story, the wedding
                details, and how you can be a part of our celebration.
              </p>
              <div className={styles.signature}>
                <span>With love,</span>
                <strong>Ifeoma & Kanayo</strong>
              </div>
            </div>
            <div className={`${styles.welcomeImage} ${styles['scroll-from-right']}`}>
              <div className={styles.imageFrame}>
                <img src={couplePhoto} alt="Ifeoma and Kanayo" className={styles.image} />
                <div className={styles.frameDecor}></div>
                <div className={styles.imageGlow}></div>
              </div>
       
            </div>
          </div>
        </div>
      </section>

{/* Details Section */}
<section className={`section ${styles.detailsSection}`}>
  <div className={styles.detailsContainer}>
    <div className={styles.detailsHeader}>
      <div className={`${styles.detailsTag} ${styles['scroll-from-left']}`}>
        Wedding Details
      </div>
      <h2 className={`${styles.detailsTitle} ${styles['scroll-from-right']}`}>
        The Celebration
      </h2>
      <p className={`${styles.detailsSubtitle} ${styles['scroll-from-left']}`}>
        Join us for an evening of elegance and joy
      </p>
    </div>

    <div className={styles.detailsGrid}>
      {/* Card 1: Date & Time */}
      <div className={`${styles.detailsCard} ${styles['scroll-from-left']}`}>
        <div className={styles.detailsCardDivider}></div>
        <div className={styles.detailsIcon}>
          <svg viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <circle cx="12" cy="15" r="1"></circle>
            <circle cx="16" cy="15" r="1"></circle>
            <circle cx="8" cy="15" r="1"></circle>
          </svg>
        </div>
        <h3>Date & Time</h3>
        <div className={styles.detailsCardContent}>
          <div className={styles.detailsDateMain}>09.12.2026</div>
          <div className={styles.detailsDateSecondary}>Saturday</div>
          <div className={styles.detailsTimeSlot}>
            <span className={styles.detailsTime}>4:00 PM</span>
            <span className={styles.detailsTimeLabel}>Ceremony</span>
          </div>
          <div className={styles.detailsTimeSlot}>
            <span className={styles.detailsTime}>5:00 PM</span>
            <span className={styles.detailsTimeLabel}>Reception</span>
          </div>
        </div>
      </div>

      {/* Card 2: Venue */}
      <div className={`${styles.detailsCard} ${styles['scroll-from-right']}`}>
        <div className={styles.detailsCardDivider}></div>
        <div className={styles.detailsIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2c-4 0-7 3-7 7 0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </div>
        <h3>Venue</h3>
        <div className={styles.detailsCardContent}>
          <div className={styles.detailsVenueName}>Brick and Ivey</div>
          <div className={styles.detailsVenueAddress}>
            1440A Roswell Rd<br />
            Marietta, GA 30062
          </div>
          <a
            href="https://maps.google.com/?q=Brick+and+Ivey+Marietta+GA"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.detailsMapLink}
          >
            View Map
            <span>→</span>
          </a>
        </div>
      </div>

      {/* Card 3: Dress Code */}
      <div className={`${styles.detailsCard} ${styles['scroll-from-left-scale']}`}>
        <div className={styles.detailsIcon}>
          <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L9 7h6L12 2z" />
            <path d="M9 7v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V7" />
            <path d="M7 7h10" />
            <circle cx="12" cy="12" r="1.5" />
          </svg>
        </div>
        <h3>Attire</h3>
        <div className={styles.detailsCardContent}>
          <div className={styles.detailsDressGrid}>
            <div className={styles.detailsDressCategory}>
              <p>Formal Evening Wear</p>
              <span>Floor-length gowns · Cocktail dresses · Suits · Tuxedos</span>
            </div>
            <div className={styles.detailsDressCategory}>
              <p>Traditional Attire</p>
              <span>Welcomed and celebrated</span>
            </div>
          </div>
          <div className={styles.detailsDressNote}>
            Palette: Dusty rose · Champagne · Gold
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Gallery Section */}
      <section className={`section ${styles.gallerySection}`}>
        <div className="container">
          <span className={`${styles.sectionTag} ${styles['scroll-from-left']}`}>OUR JOURNEY</span>
          <h2 className={`${styles.sectionTitle} ${styles['scroll-from-right']}`}>Pre-Wedding Moments</h2>
          <p className={`${styles.sectionSubtitle} ${styles['scroll-from-left']}`}>A glimpse into our love story</p>
          <div className={styles['scroll-from-left-scale']}>
            <Gallery />
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className={styles.promoSection}>
        <div className="container">
          <div className={styles['scroll-from-right-rotate']}>
            <GiftRegistryPromo />
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section className={`section ${styles.venueSection}`}>
        <div className="container">
          <div className={styles.venueContent}>
            <div className={`${styles.venueInfo} ${styles['scroll-from-left']}`}>
              <span className={styles.sectionTag}>LOCATION</span>
              <h2>The Venue</h2>
              <h3>Brick and Ivey</h3>
              <p>
                Nestled in the heart of Marietta, Brick and Ivey offers a perfect blend
                of historic charm and modern elegance. This beautiful venue provides the
                ideal backdrop for our celebration.
              </p>
              <div className={styles.venueDetails}>
                <p><strong>Address:</strong> 1440A Roswell Rd, Marietta, GA 30062, United States</p>
                <p><strong>Parking:</strong> Complimentary valet parking available</p>
              </div>
              <a
                href="https://maps.google.com/?q=Brick+and+Ivey+Marietta+GA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Get Directions
              </a>
            </div>
            <div className={`${styles.venueMap} ${styles['scroll-from-right']}`}>
              <iframe
                title="Venue Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.1234567890123!2d-84.54345678901234!3d33.95678901234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1234567890abcdef!2sBrick%20and%20Ivey!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`section ${styles.ctaSection}`}>
        <div className={styles.ctaPattern}></div>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles['scroll-from-left']}>Save the Date</h2>
            <p className={styles['scroll-from-right']}>September 12, 2026</p>
            <div className={`${styles.ctaButtons} ${styles['scroll-from-left-scale']}`}>
              <Link to="/rsvp" className="btn btn-primary">
                RSVP Now
              </Link>
              <Link to="/gift-registry" className="btn btn-secondary">
                View Gift Registry
              </Link>
           
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
