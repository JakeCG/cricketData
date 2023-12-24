const fs = require("fs");

module.exports = {
  async getTourLists(filePath, gender) {
    const rawData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(rawData);

    try {
      if (!Array.isArray(data)) {
        console.warn("Data passed is not an array, returning an empty array.");
        return [];
      }

      switch (gender) {
        case "male":
          return data.filter(
            (item) =>
              item.name.includes("tour of") && !item.name.includes("Women"),
          );
        case "female":
          return data.filter(
            (item) =>
              item.name.includes("Women") && item.name.includes("tour of"),
          );
        default:
          return data.filter((item) => item.name.includes("tour of"));
      }
    } catch (error) {
      console.error("Error processing data:", error);
      throw error;
    }
  },
};
