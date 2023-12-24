const fs = require('fs').promises;

module.exports = {
  async saveDataToJson(name, file) {
    const filePath = `${name}.json`;
    try {
      await fs.writeFile(filePath, file, 'utf-8');
      console.log(`Your data has been written to: ${filePath}`);
    } catch (err) {
      console.error('Error writing to file', err);
    }
  },
};
