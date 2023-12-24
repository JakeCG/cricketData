const fetchData = require("./fetchData.js");
const fileHandler = require("./fileHandler.js");
const dataProcessor = require("./dataProcessor.js");

async function processDataToFile(dataType) {
  // Fetches match list data, saves it to a JSON file for ease of access, reduces calls to API.
  try {
    switch (dataType) {
      case "matchList":
        const matchList = await fetchData.fetchMatchList();
        await fileHandler.saveDataToJson(matchList);
        return "Process completed successfully";
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function printInternationalGames(gender) {
  // Prints international games based on Gender, use string "Male" for mens games, "Female" for Women's games,
  // leave blank for both.
  try {
    return await dataProcessor.getTourLists("testData.json", gender);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// processDataToFile("matchList")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log("An error occurred: ", error);
//   });

printInternationalGames("male")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log("An error occurred: ", error);
  });

printInternationalGames("female")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log("An error occurred: ", error);
  });

printInternationalGames()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log("An error occurred: ", error);
  });
