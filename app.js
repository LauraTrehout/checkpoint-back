const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connection = require("./config/db.js");
const { setupRoutes } = require("./routes");
const app = express();

const port = process.env.PORT;

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log("connected");
  }
});

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('images'));


setupRoutes(app);

app.get('/', (req, res) => {
    res.send('Test')
})


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });