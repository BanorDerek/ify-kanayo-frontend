import React, { useState, useEffect } from 'react';
import { FaGift, FaAmazon, FaPaypal, FaCreditCard, FaHeart } from 'react-icons/fa';
import { SiZelle } from 'react-icons/si';
import registryService from '../../services/registryService';
import paymentService from '../../services/paymentService';
import styles from './GiftRegistry.module.css';

const GiftRegistry = () => {
  const [activeTab, setActiveTab] = useState('gifts');
  const [donationAmount, setDonationAmount] = useState('');
  const [donationMessage, setDonationMessage] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donationMethod, setDonationMethod] = useState('stripe');
  const [loading, setLoading] = useState(false);
  const [registryItems, setRegistryItems] = useState([]);
  const [zelleInfo, setZelleInfo] = useState(null);

  useEffect(() => {
    loadRegistryItems();
    loadZelleInfo();
  }, []);

  const loadRegistryItems = async () => {
    try {
      const data = await registryService.getRegistryItems();
      setRegistryItems(data.items);
    } catch (error) {
      console.error('Error loading registry:', error);
    }
  };

  const loadZelleInfo = async () => {
    try {
      const data = await registryService.getZelleInfo();
      setZelleInfo(data);
    } catch (error) {
      console.error('Error loading Zelle info:', error);
    }
  };

  const handleDonation = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (donationMethod === 'zelle') {
      // Show Zelle info modal
      alert(`Please send to:\nZelle Email: ${zelleInfo?.email || 'ifyandkanayo@wedding.com'}\nReference: Wedding Gift - ${donorName}`);
      // Create donation record
      await registryService.createDonation({
        guest_name: donorName,
        email: donorEmail,
        amount: parseFloat(donationAmount),
        payment_method: 'zelle',
        message: donationMessage
      });
      alert('Thank you for your donation!');
      setLoading(false);
    } else if (donationMethod === 'paypal') {
      // Create donation record then redirect to PayPal
      await registryService.createDonation({
        guest_name: donorName,
        email: donorEmail,
        amount: parseFloat(donationAmount),
        payment_method: 'paypal',
        message: donationMessage
      });
      // Redirect to PayPal
      window.location.href = `https://www.paypal.com/paypalme/yourhandle/${donationAmount}`;
    } else if (donationMethod === 'stripe') {
      // Redirect to Stripe checkout
      await paymentService.redirectToCheckout(
        parseFloat(donationAmount),
        donorName,
        donorEmail,
        donationMessage
      );
    }

    setLoading(false);
  };

  return (
    <div className={styles.registry}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>Gift Registry</h1>
          <p>Your presence is the greatest gift, but if you wish to celebrate with a gift...</p>
        </div>
      </section>

      <section className={styles.tabSection}>
        <div className="container">
          <div className={styles.tabButtons}>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'gifts' ? styles.active : ''}`}
              onClick={() => setActiveTab('gifts')}
            >
              <FaGift /> Physical Gifts
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'cash' ? styles.active : ''}`}
              onClick={() => setActiveTab('cash')}
            >
              <FaHeart /> Cash Donations
            </button>
          </div>

          {activeTab === 'gifts' && (
            <div className={styles.giftsTab}>
              <div className={styles.amazonCard}>
                <FaAmazon className={styles.amazonIcon} />
                <h2>Amazon Wedding Registry</h2>
                <p>Shop directly from our Amazon registry</p>
                <a 
                  href="https://www.amazon.com/wedding/guest-view/1KEY7VDKGCBN3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.amazonBtn}
                >
                  Visit Amazon Registry →
                </a>
              </div>

              <div className={styles.itemsGrid}>
                {registryItems.filter(item => !item.is_fund).map(item => (
                  <div key={item.id} className={styles.giftCard}>
                    <div className={styles.giftImage}>
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} />
                      ) : (
                        <div className={styles.imagePlaceholder}>🎁</div>
                      )}
                    </div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    {item.price && <div className={styles.price}>${item.price.toFixed(2)}</div>}
                    <a href={item.amazon_url} target="_blank" className={styles.purchaseBtn}>
                      Purchase on Amazon
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'cash' && (
            <div className={styles.cashTab}>
              <div className={styles.donationCard}>
                <h2>Cash Donation Options</h2>
                <p>Choose your preferred method to bless us with a cash gift</p>

                <div className={styles.methodGrid}>
                  <div 
                    className={`${styles.methodCard} ${donationMethod === 'zelle' ? styles.selected : ''}`}
                    onClick={() => setDonationMethod('zelle')}
                  >
                    <SiZelle className={styles.methodIcon} />
                    <h3>Zelle</h3>
                    <p>Quick and easy bank transfer</p>
                  </div>

                  <div 
                    className={`${styles.methodCard} ${donationMethod === 'paypal' ? styles.selected : ''}`}
                    onClick={() => setDonationMethod('paypal')}
                  >
                    <FaPaypal className={styles.methodIcon} />
                    <h3>PayPal</h3>
                    <p>Secure online payment</p>
                  </div>

                  <div 
                    className={`${styles.methodCard} ${donationMethod === 'stripe' ? styles.selected : ''}`}
                    onClick={() => setDonationMethod('stripe')}
                  >
                    <FaCreditCard className={styles.methodIcon} />
                    <h3>Credit Card</h3>
                    <p>Powered by Stripe</p>
                  </div>
                </div>

                <form onSubmit={handleDonation} className={styles.donationForm}>
                  <div className={styles.formGroup}>
                    <label>Your Name</label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Your Email</label>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Donation Amount ($)</label>
                    <div className={styles.amountButtons}>
                      {[500, 1000, 2000, 5000, 10000].map(amount => (
                        <button 
                          key={amount}
                          type="button"
                          className={donationAmount === amount ? styles.activeAmount : ''}
                          onClick={() => setDonationAmount(amount)}
                        >
                          ${amount}
                        </button>
                      ))}
                      <input
                        type="number"
                        placeholder="Custom amount"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Message (Optional)</label>
                    <textarea
                      value={donationMessage}
                      onChange={(e) => setDonationMessage(e.target.value)}
                      placeholder="Leave a message for the couple..."
                      rows="3"
                    />
                  </div>

                  <button type="submit" className={styles.donateBtn} disabled={loading}>
                    {loading ? 'Processing...' : `Donate with ${donationMethod.toUpperCase()}`}
                  </button>
                </form>

                <div className={styles.note}>
                  <p>💝 Your generosity means the world to us. All donations go directly toward our future together.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GiftRegistry;