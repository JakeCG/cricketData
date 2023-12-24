const axios = require("axios");
const config = require("./config.js");

module.exports = {
  async fetchMatchList() {
    // Fetches the list of cricket matches from the CricAPI
    try {
      const API_ENDPOINT = "https://api.cricapi.com/v1/series";
      const QUERY_PARAMETERS = `apikey=${config.APIKey}&offset=0`;
      const result = await axios.get(`${API_ENDPOINT}?${QUERY_PARAMETERS}`);
      const data = result.data.data;
      return JSON.stringify(data, null, 2);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
