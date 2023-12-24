const axios = require("axios");
const config = require("./config.js");

module.exports = {
  async fetchMatchList() {
    try {
      const result = await axios.get(
        `https://api.cricapi.com/v1/series?apikey=${config.APIKey}&offset=0`,
      );
      const data = result.data.data;
      return JSON.stringify(data, null, 2);
    } catch (err) {
      console.error(err);
    }
  },
};
