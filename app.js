// Get 3rd Party modules
const express = require("express");
// Get Custom built modules
const fm = require("./filemgr");

// Create the express http server
const app = express();

// Define some built-in middleware
app.use(express.static("./Client"));
app.use(express.json());

// Define HTTP routes listenting for requests
app.get("/api", async (req,res) => {
  //Extra handling because reading needs to throe errors in a different way for another function
  try {
    res.send(fm.ReadData());
  } catch(err) {
    res.send(err)
  }
})

app.post("/api", async (req,res) => {
  fm.WriteData(req.body)
})
//Takes Index, deletes from index
app.delete("/api", async (req,res) => {
  fm.DeleteData(req.body)
})

// page not found route
// Not sure if this is working
// I think the underlying code (the express module) changed since this class was last taught
// There was a star (*) in the first parameter which was causing crashes - it has been deleted
app.all("", (req,res) => {
  res.status(404).send("<h1>Page Not Found...</h1>");
});
// Create a server
const appName = "Simple List";
const port = 5000;
app.listen(port, () => {
  console.log(`App ${appName} is running on port ${port}`);
})

  //Tests for imported functions
    console.log(fm.WriteData(JSON.parse("[\"Test\", \"Test2\", \"Test3\"]")));
    //console.log(fm.DeleteData(JSON.parse("2")));
    //Emulate a pause\
    //This test throws an uncaught error if used without actual data. This should not occur outside of testing.
    setTimeout(() => {console.log(fm.ReadData())}, 100);
