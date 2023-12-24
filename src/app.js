const fetchData = require('./fetchData.js')
const fileHandler = require('./fileHandler.js')


const matchList = fetchData.fetchMatchList();
console.log(matchList);