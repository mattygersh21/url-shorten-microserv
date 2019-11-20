const express = require("express");
const dns = require("dns");
const cors = require("cors");
const connectDB = require("./config/db.js");

const app = express();
app.use(express.json({ extended: false }));

connectDB();

app.use(cors());

// Routes
app.use('/', require('./routes/server'));
app.use('/api/url', require('./routes/url'));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
  dns.lookup("www.google.com", (err, address, family) => 
    console.log(address, family)
  );
});
