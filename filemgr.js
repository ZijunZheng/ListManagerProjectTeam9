const fs = require("fs/promises");

async function ReadData() {
  try {
    // Make sure the file exists
    try { 
      test = await fs.open("listdata.json");
      await test.close();
    } catch (error) {
      throw error;
    }
    // Read the file
    const data = await fs.readFile("listdata.json")
    // Convert the buffer to a json object and return it
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}
//Adds to file
async function WriteData(dataOut) {
  try {
    let Arr;
    //Try to read from file, if it fails, skip and make new one
    try {
      Arr = await ReadData();
    } catch {
      await fs.appendFile('listdata.json', "[]");
      Arr = await ReadData();
    }
    Arr.push(dataOut)
    fs.writeFile('listdata.json', JSON.stringify(Arr));
  } catch(error) {
    console.log(error)
  }
}
/*
//Overwrites data with new data - Alternative to above
async function WriteData(dataOut) {
  try {
    //If appending, probably mess around with writeFile
    fs.writeFile('listdata.json', JSON.stringify(dataOut));
  } catch (error) {
    console.log(error);
  }
}
*/
//Deletes from array index
async function DeleteData(dataID) {
  try {
    let Arr =  await ReadData();
    Arr.splice(dataID, 1);
    WriteData(Arr);
  } catch(error) {
    console.log(error)
  }
}

exports.DeleteData = DeleteData;
exports.ReadData = ReadData;
exports.WriteData = WriteData;
