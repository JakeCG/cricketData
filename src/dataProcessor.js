const fs = require("fs");

module.exports = {
  async getTourLists(filePath, gender) {
    const rawData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(rawData);
    if (!Array.isArray(data)) {
      console.warn("Data passed is not an array, returning an empty array.");
      return [];
    }

    if (gender === "male") {
      return data.filter(
        (item) => item.name.includes("tour of") && !item.name.includes("Women"),
      );
    } else if (gender === "female") {
      return data.filter(
        (item) => item.name.includes("Women") && item.name.includes("tour of"),
      );
    } else {
      return data.filter((item) => item.name.includes("tour of"));
    }
  },
};
