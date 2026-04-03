// Home.jsx
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

    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
          el.classList.add(styles.visible);
        }
      });
    };

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
        // Swipe left - scroll down
        window.scrollBy({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
      if (touchStart - touchEnd < -75) {
        // Swipe right - scroll up
        window.scrollBy({
          top: -window.innerHeight,
          behavior: 'smooth'
        });
      }
    };

    // Mouse wheel horizontal to vertical conversion
    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // Horizontal scroll detected - convert to vertical
        e.preventDefault();
        window.scrollBy({
          top: e.deltaX,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('wheel', handleWheel, { passive: false });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('wheel', handleWheel);
      clearInterval(interval);
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

  // Animated text variations
  const rotatingTexts = ['Forever Starts Here', 'Love is in the Air', 'Happily Ever After'];

  return (
    <div className={styles.home}>
      {/* Hero Section with Background Image */}
      <section className={styles.hero} ref={heroRef}>
        {/* Background Image */}
        <div className={styles.heroBgImage}></div>
        
        {/* Dark Overlay for better text visibility */}
        <div className={styles.heroOverlay}></div>
        
        {/* Animated Particles - White/Gold for visibility */}
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

        {/* Floating Rings - White/Gold */}
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

        {/* Floating Hearts - Brighter colors for visibility */}
        <div className={styles.floatingHearts}>
          <div className={styles.heart}>❤️</div>
          <div className={styles.heart2}>💕</div>
          <div className={styles.heart3}>💖</div>
          <div className={styles.heart4}>💗</div>
          <div className={styles.heart5}>💓</div>
          <div className={styles.heart6}>❤️‍🔥</div>
        </div>

        {/* Sparkles */}
        <div className={styles.sparkles}>
          <div className={styles.sparkle}>✨</div>
          <div className={styles.sparkle2}>✨</div>
          <div className={styles.sparkle3}>✨</div>
          <div className={styles.sparkle4}>✨</div>
          <div className={styles.sparkle5}>✨</div>
          <div className={styles.sparkle6}>✨</div>
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
                <span className={styles.buttonSparkle}>✨</span>
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

      {/* Enhanced Countdown Section */}
      <section className={`section ${styles.countdownSection}`}>
        <div className={styles.countdownDecor}>
          <div className={styles.floatingRing}></div>
          <div className={styles.floatingRing}></div>
          <div className={styles.floatingRing}></div>
        </div>
        <div className="container">
          <div className={styles.countdownWrapper}>
            <motion.span
              className={styles.sectionTag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              ✨ THE BIG DAY ✨
            </motion.span>
            <motion.h2
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Counting Down to Forever
            </motion.h2>
            <CountdownTimer targetDate="2026-09-12T00:00:00" />
          </div>
        </div>
      </section>

      {/* Enhanced Welcome Section */}
      <section className={`section ${styles.welcomeSection}`}>
        <div className="container">
          <div className={`${styles.welcomeContent} fade-on-scroll`}>
            <motion.div
              className={styles.welcomeText}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className={styles.welcomeBadge}>✨ Happily Ever After ✨</div>
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
            </motion.div>
            <motion.div
              className={styles.welcomeImage}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className={styles.imageFrame}>
                <img src={couplePhoto} alt="Ifeoma and Kanayo" className={styles.image} />
                <div className={styles.frameDecor}></div>
                <div className={styles.imageGlow}></div>
              </div>
              <div className={styles.floatingHeartsImage}>
                <div className={styles.floatingHeart}>❤️</div>
                <div className={styles.floatingHeart}>✨</div>
                <div className={styles.floatingHeart}>💕</div>
                <div className={styles.floatingHeart}>💫</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wedding Essentials Section */}
      <section className={`section ${styles.infoSection}`}>
        <div className={styles.infoDecor}>
          <div className={styles.infoDecorRing}></div>
          <div className={styles.infoDecorRing2}></div>
        </div>
        <div className="container">
          <div className={styles.infoHeader}>
            <span className={styles.sectionTag}>ESSENTIAL DETAILS</span>
            <h2 className={styles.sectionTitle}>Wedding Essentials</h2>
            <p className={styles.infoSubtitle}>Everything you need to know for our special day</p>
          </div>
          <div className={styles.infoGrid}>
            {/* Date & Time Card */}
            <motion.div
              className={`${styles.infoCard} fade-on-scroll`}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.cardIconWrapper}>
                <div className={styles.cardIconBg}></div>
                <div className={styles.cardIcon}>📅</div>
              </div>
              <h3>Date & Time</h3>
              <div className={styles.cardContent}>
                <p className={styles.mainDate}>September 12, 2026</p>
                <div className={styles.timeSlot}>
                  <span className={styles.timeIcon}>🕒</span>
                  <span>4:00 PM - 11:00 PM</span>
                </div>
                <div className={styles.timeSlot}>
                  <span className={styles.timeIcon}>🍽️</span>
                  <span>Reception to follow</span>
                </div>
              </div>
              <div className={styles.cardGlow}></div>
              <div className={styles.cardSparkle}>✨</div>
            </motion.div>

            {/* Venue Card */}
            <motion.div
              className={`${styles.infoCard} fade-on-scroll`}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
            >
              <div className={styles.cardIconWrapper}>
                <div className={styles.cardIconBg}></div>
                <div className={styles.cardIcon}>📍</div>
              </div>
              <h3>Venue</h3>
              <div className={styles.cardContent}>
                <p className={styles.venueName}>Brick and Ivey</p>
                <p className={styles.venueAddress}>Marietta, GA, USA</p>
                <div className={styles.venueDetail}>
                  <span>🏛️ Historic Charm</span>
                  <span>✨ Modern Elegance</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Brick+and+Ivey+Marietta+GA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                >
                  <span>📍 Get Directions</span>
                  <span className={styles.mapArrow}>→</span>
                </a>
              </div>
              <div className={styles.cardGlow}></div>
              <div className={styles.cardSparkle}>✨</div>
            </motion.div>

            {/* Dress Code Card */}
            <motion.div
              className={`${styles.infoCard} fade-on-scroll`}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            >
              <div className={styles.cardIconWrapper}>
                <div className={styles.cardIconBg}></div>
                <div className={styles.dressCodeIcons}>
                  <span className={styles.dressIcon}>👗</span>
                  <span className={styles.dressIcon}>👔</span>
                </div>
              </div>
              <h3>Dress Code</h3>
              <div className={styles.cardContent}>
                <p className={styles.dressCodeTitle}>Formal Attire</p>
                <div className={styles.dressCodeDetails}>
                  <div className={styles.dressOption}>
                    <span className={styles.dressColor} style={{ backgroundColor: '#D8A7A0' }}></span>
                    <span>Dusty Rose & Champagne</span>
                  </div>
                  <div className={styles.dressOption}>
                    <span className={styles.dressColor} style={{ backgroundColor: '#C6A75E' }}></span>
                    <span>Gold Accents</span>
                  </div>
                  <div className={styles.dressOption}>
                    <span className={styles.dressColor} style={{ backgroundColor: '#5A0F1A' }}></span>
                    <span>Deep Wine Details</span>
                  </div>
                </div>
                <div className={styles.dressHint}>
                  <span>👗 For Ladies:</span> Floor-length gowns, cocktail dresses, Traditional Dresses.
                </div>
                <div className={styles.dressHint}>
                  <span>👔 For Gentlemen:</span> Suits, tuxedos, Traditional dresses.
                </div>
                <div className={styles.dressNote}>
                  ✨ Wear our wedding colors to match the theme!
                </div>
              </div>
              <div className={styles.cardGlow}></div>
              <div className={styles.cardSparkle}>✨</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className={`section ${styles.gallerySection}`}>
        <div className="container">
          <span className={styles.sectionTag}>OUR JOURNEY</span>
          <h2 className={styles.sectionTitle}>Pre-Wedding Moments</h2>
          <p className={styles.sectionSubtitle}>A glimpse into our love story</p>
          <Gallery />
        </div>
      </section>

      {/* Promo Section */}
      <section className={styles.promoSection}>
        <div className="container">
          <GiftRegistryPromo />
        </div>
      </section>

      {/* Venue Section */}
      <section className={`section ${styles.venueSection}`}>
        <div className="container">
          <div className={`${styles.venueContent} fade-on-scroll`}>
            <div className={styles.venueInfo}>
              <span className={styles.sectionTag}>LOCATION</span>
              <h2>The Venue</h2>
              <h3>Brick and Ivey</h3>
              <p>
                Nestled in the heart of Marietta, Brick and Ivey offers a perfect blend
                of historic charm and modern elegance. This beautiful venue provides the
                ideal backdrop for our celebration.
              </p>
              <div className={styles.venueDetails}>
                <p><strong>📍 Address:</strong> 1440A Roswell Rd, Marietta, GA 30062, United States</p>
                <p><strong>🚗 Parking:</strong> Complimentary valet parking available</p>
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
            <div className={styles.venueMap}>
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
            <h2>Save the Date</h2>
            <p>September 12, 2026</p>
            <div className={styles.ctaButtons}>
              <Link to="/rsvp" className="btn btn-primary">
                RSVP Now
              </Link>
              <Link to="/gift-registry" className="btn btn-secondary">
                View Gift Registry
              </Link>
              <Link to="/wedding-memories" className="btn btn-secondary">
                Share Your Memories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
