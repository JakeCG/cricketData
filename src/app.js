const fetchData = require("./fetchData.js");
const fileHandler = require("./fileHandler.js");

async function processDataToFile(dataType) {
  // Fetches match list data, saves it to a JSON file for ease of access, reduces calls to API.
  try {
    switch (dataType) {
      case "matchList":
        const matchLists = await fetchData.fetchMatchList();
        await fileHandler.saveDataToJson("matchList", matchLists);
        return "Process completed successfully";
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function printToPDF(filePath, gender, countryList) {
  // Prints international games based on Gender, use string "Male" for mens games, "Female" for Women's games,
  try {
    return await fileHandler.printToPDF(filePath, gender, countryList);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// processDataToFile("matchList")
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => {
//       console.log("An error occurred: ", error);
//     });

printToPDF("matchList.json", "male", "Afghanistan")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log("An error occurred: ", error);
  });
