const express = require("express");
const path = require("path");
const Rollbar = require("rollbar")

let rollbar = new Rollbar({
  accessToken: '905e58b2bbe740af8cafcd01e7f553a7',
  captureUncaught: true,
  captureUnhandledRejections: true
})

const app = express();
app.use(express.json())

app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "./index.html"));
  rollbar.info('html file served successfully.')
  try {
    nonExistentFunction();
  } catch (error) {
    rollbar.info(error);
  }
});

const port = process.env.PORT || 4005;

app.use(rollbar.errorHandler())

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})