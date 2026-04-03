import React, { useState } from 'react';
import { FaSearch, FaCheckCircle, FaUtensils, FaMusic } from 'react-icons/fa';
import rsvpService from '../../services/rsvpService';
import styles from './RSVP.module.css';

const RSVP = () => {
  const [step, setStep] = useState('code');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [guestData, setGuestData] = useState(null);
  const [error, setError] = useState('');
  const [responses, setResponses] = useState({});

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await rsvpService.lookupGuest(code);
      
      if (data.success) {
        setGuestData(data.guests);
        const initialResponses = {};
        data.guests.forEach(guest => {
          initialResponses[guest.id] = guest.attending || 'pending';
        });
        setResponses(initialResponses);
        setStep('form');
      }
    } catch (err) {
      setError(err.message || 'Invalid code. Please check your invitation.');
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceChange = (guestId, attending) => {
    setResponses(prev => ({ ...prev, [guestId]: attending }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const rsvpData = {
      groupCode: code,
      responses: Object.entries(responses).map(([guestId, attending]) => ({
        guestId: parseInt(guestId),
        attending,
        dietary: formData.get(`dietary_${guestId}`)
      })),
      songRequest: formData.get('song_request')
    };

    try {
      await rsvpService.submitRSVP(rsvpData.groupCode, rsvpData.responses, rsvpData.songRequest);
      setStep('success');
    } catch (err) {
      setError('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (step === 'success') {
    return (
      <div className={styles.success}>
        <div className={styles.successCard}>
          <FaCheckCircle className={styles.successIcon} />
          <h1>RSVP Confirmed</h1>
          <p>We look forward to celebrating with you on September 12, 2026.</p>
          <button onClick={() => window.location.href = '/'} className={styles.homeBtn}>
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.rsvp}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>RSVP</h1>
          <p>Please confirm your attendance</p>
          <div className={styles.deadline}>
            <span>Kindly respond by July 16, 2026</span>
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className="container">
          <div className={styles.formContainer}>
            {step === 'code' && (
              <div className={styles.codeStep}>
                <h2>Your Access Code</h2>
                <p>Enter the unique code from your invitation</p>
                <form onSubmit={handleCodeSubmit} className={styles.codeForm}>
                  <div className={styles.inputGroup}>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      placeholder="e.g., IFKAY2026-001"
                      required
                    />
                    <button type="submit" disabled={loading}>
                      {loading ? 'Verifying...' : <><FaSearch /> Verify</>}
                    </button>
                  </div>
                  {error && <p className={styles.error}>{error}</p>}
                </form>
                <p className={styles.helpText}>Your code can be found on your invitation card</p>
              </div>
            )}

            {step === 'form' && guestData && (
              <div className={styles.formStep}>
                <div className={styles.formHeader}>
                  <h2>Confirm Your Attendance</h2>
                  <p>Code: <strong>{code}</strong></p>
                </div>

                <form onSubmit={handleFormSubmit}>
                  {guestData.map((guest) => (
                    <div key={guest.id} className={styles.guestCard}>
                      <h3>{guest.full_name}</h3>
                      <div className={styles.attendanceOptions}>
                        <label className={`${styles.option} ${responses[guest.id] === 'yes' ? styles.selectedYes : ''}`}>
                          <input
                            type="radio"
                            name={`attending_${guest.id}`}
                            value="yes"
                            checked={responses[guest.id] === 'yes'}
                            onChange={() => handleAttendanceChange(guest.id, 'yes')}
                          />
                          <span>Will Attend</span>
                        </label>
                        <label className={`${styles.option} ${responses[guest.id] === 'no' ? styles.selectedNo : ''}`}>
                          <input
                            type="radio"
                            name={`attending_${guest.id}`}
                            value="no"
                            checked={responses[guest.id] === 'no'}
                            onChange={() => handleAttendanceChange(guest.id, 'no')}
                          />
                          <span>Cannot Attend</span>
                        </label>
                      </div>

                      {responses[guest.id] === 'yes' && (
                        <div className={styles.detailsSection}>
                          <label>
                            <FaUtensils /> Dietary Requirements
                            <textarea
                              name={`dietary_${guest.id}`}
                              placeholder="Please note any allergies or dietary restrictions"
                              rows="2"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className={styles.globalSection}>
                    <label>
                      <FaMusic /> Song Request
                      <input type="text" name="song_request" placeholder="Any song you would like to hear" />
                    </label>
                  </div>

                  <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Response'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RSVP;