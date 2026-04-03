import api from './api';

const registryService = {
  // Get all registry items
  getRegistryItems() {
    return api.get('/registry/items');
  },

  // Create a donation record (for Zelle/PayPal)
  createDonation(donationData) {
    return api.post('/registry/donation', donationData);
  },

  // Get Zelle payment info
  getZelleInfo() {
    return api.get('/payments/zelle-info');
  }
};

export default registryService;