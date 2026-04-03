import api from './api';

const rsvpService = {
  // Lookup guest by unique code
  lookupGuest(code) {
    return api.post('/rsvp/lookup', { code });
  },

  // Submit RSVP responses
  submitRSVP(groupCode, responses, songRequest) {
    return api.post('/rsvp/submit', { groupCode, responses, songRequest });
  },

  // Get all RSVPs (admin only)
  getAllRSVPs() {
    return api.get('/rsvp/all');
  }
};

export default rsvpService;