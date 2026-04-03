import api from './api';

const paymentService = {
  // Create Stripe checkout session
  createCheckoutSession(amount, guestName, email, message) {
    return api.post('/payments/create-checkout-session', {
      amount,
      guest_name: guestName,
      email,
      message
    });
  },

  // Redirect to Stripe checkout
  async redirectToCheckout(amount, guestName, email, message) {
    try {
      const response = await this.createCheckoutSession(amount, guestName, email, message);
      if (response.url) {
        window.location.href = response.url;
      }
      return response;
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    }
  }
};

export default paymentService;