const fetchData = require("./fetchData.js");
const fileHandler = require("./fileHandler.js");

async function processDataToFile() {
  try {
    const matchList = await fetchData.fetchMatchList();
    await fileHandler.saveDataToJson(matchList);

    // Assuming you want to return a success message
    return 'Process completed successfully';
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error to be caught in the 'catch' block below
  }
}

processDataToFile()
    .then((result) => {
      console.log(result); // This will log 'Process completed successfully' on success
    })
    .catch((error) => {
      console.log("An error occurred: ", error);
    });
