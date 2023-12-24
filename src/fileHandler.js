const fs = require("fs");

module.exports = {
  async saveDataToJson(file) {
    const filePath = "testData.json";
    fs.writeFile(filePath, file, "utf-8", (err) => {
      if (err) {
        console.log("Error writing to file", err);
      } else {
        console.log(`Your data has been written to: ${filePath}`);
      }
    });
  },
};
