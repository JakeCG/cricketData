const fs = require("fs").promises;

module.exports = {
  async getTourLists(filePath, gender, countryName) {
    try {
      const rawData = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(rawData);

      if (!Array.isArray(data)) {
        console.warn("Data passed is not an array, returning an empty array.");
        return [];
      }

      const isTourOf = (item, isFemale) => {
        const lowerName = item.name.toLowerCase();
        const lowerCountryName = countryName.toLowerCase();
        let searchString = lowerCountryName + " tour of";
        if (isFemale) {
          searchString = lowerCountryName + " women tour of";
        }
        return lowerName.startsWith(searchString);
      };

      switch (gender) {
        case "male":
          return data.filter((item) => isTourOf(item, false));
        case "female":
          return data.filter((item) => isTourOf(item, true));
      }
    } catch (error) {
      console.error("Error processing data:", error);
      throw error;
    }
  },
};
