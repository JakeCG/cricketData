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

      const isTourOf = (item) => {
        const lowerName = item.name.toLowerCase();
        const lowerCountryName = countryName.toLowerCase();
        return (
            lowerName.substring(0, 15).includes(lowerCountryName) &&
            lowerName.includes("tour of")
        );
      };

      switch (gender) {
        case "male":
          return data.filter(
              (item) => isTourOf(item) && !item.name.toLowerCase().includes("women")
          );
        case "female":
          return data.filter(
              (item) => isTourOf(item) && item.name.toLowerCase().includes("women")
          );
        default:
          return data.filter((item) => isTourOf(item));
      }
    } catch (error) {
      console.error("Error processing data:", error);
      throw error;
    }
  },
};
