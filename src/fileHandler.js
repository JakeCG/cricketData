const dataProcessor = require("./dataProcessor");
const fs = require("fs").promises;
const { jsPDF } = require('jspdf');

async function convertDate(input) {
  try {
    let formattedDate;

    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
      formattedDate = new Date(input).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } else {
      const [month, day] = input.split(' ');
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      // If the month is January or later, use the next year
      let year;
      if (currentMonth !== 12) {
        year = currentYear + 1;
      } else {
        year = currentYear;
      }

      formattedDate = new Date(`${month} ${day}, ${year}`).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    return formattedDate;
  } catch (error) {
    console.error(`Error converting date "${input}":`, error);
    throw error;
  }
}



module.exports = {
  async saveDataToJson(name, file) {
    const filePath = `${name}.json`;
    try {
      await fs.writeFile(filePath, file, "utf-8");
      console.log(`Your data has been written to: ${filePath}`);
    } catch (err) {
      console.error(`Error writing to file ${filePath}:`, err);
      throw err;
    }
  },

  async printToPDF(filePath, gender, countryList) {
    try {
      const teamInformation = await dataProcessor.getTourLists(filePath, gender, countryList);
      const teamData = teamInformation[0];

      const teamPDF = new jsPDF();

      console.log(teamInformation[0]);
      teamPDF.setFontSize(18);
      teamPDF.text(teamInformation[0].name, 20, 20);

      teamPDF.setFontSize(12);
      const startDate = await convertDate(teamData.startDate);
      const endDate = await convertDate(teamData.endDate);

      console.log(startDate);
      console.log(endDate);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};
