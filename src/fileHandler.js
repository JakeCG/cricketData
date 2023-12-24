const dataProcessor = require("./dataProcessor");
const fs = require("fs").promises;
const { jsPDF } = require("jspdf");
const path = require("path");

async function convertDate(input) {
  try {
    let formattedDate;

    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
      formattedDate = new Date(input);
    } else {
      const [month, day] = input.split(" ");
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      // If the month is January or later, use the next year TODO: Change when it comes to 2024
      let year;
      year = currentMonth !== "Dec" ? currentYear + 1 : currentYear;

      formattedDate = new Date(`${month} ${day}, ${year}`);
    }

    return formattedDate;
  } catch (error) {
    console.error(`Error converting date "${input}":`, error);
    throw error;
  }
}

module.exports = {
  async saveDataToJson(name, file) {
    const filePath = path.join(__dirname, `${name}.json`);
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
      const teamInformation = await dataProcessor.getTourLists(
        filePath,
        gender,
        countryList,
      );
      const teamData = teamInformation[0];

      const teamPDF = new jsPDF();

      teamPDF.setFontSize(18);
      teamPDF.text(teamData.name, 20, 20);

      teamPDF.setFontSize(12);
      const startDate = await convertDate(teamData.startDate);
      const endDate = await convertDate(teamData.endDate);
      const difference = (endDate - startDate) / (1000 * 60 * 60 * 24);
      const formattedStartDate = startDate.toLocaleDateString("en-GB");
      const formattedEndDate = endDate.toLocaleDateString("en-GB");
      teamPDF.text(
        `${formattedStartDate} - ${formattedEndDate} (${difference} days.)`,
        20,
        30,
      );
      teamPDF.save(`${path.parse(filePath).name}.pdf`);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};
