// Setup empty JS object to act as endpoint for all routes
// projectData = [];
// GLOBAL VARIABLES
const geonamesUrl = "http://api.geonames.org";
const darkskyUrl = "https://api.darksky.net";
const pixabayUrl = "https://pixabay.com";

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Dotenv for API keys
const dotenv = require("dotenv");
dotenv.config();

// require node-fetch
const fetch = require("node-fetch");

// Initialize the main project folder
app.use(express.static("dist"));

// Set up default index.html
app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

// Setup Server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

// Get City coordinates from Geonames API
async function getCityCoordinates(city) {
  const url = encodeURI(`${geonamesUrl}/searchJSON?q=${city}&maxRows=10&username=${process.env.GEO_USER}`);
  let myData = {};

  const getData = async url => {
    try {
      await fetch(url)
        .then(response => response.json())
        .then(json => {
          console.log(json);
          myData = {
            lat: json.geonames[0].lat,
            lng: json.geonames[0].lng,
            country: json.geonames[0].countryCode
          };
        });
      console.log(myData);
      return myData;
    } catch (error) {
      console.log("Error occured while getting Geonames API data.", error);
    }
  };
  return getData(url);
}

// Get Weather based on a city coordinates and a trip date
async function getWeather(coordinates, date) {
  let myData = {};
  const lat = coordinates.lat;
  const lng = coordinates.lng;

  const tripDate = new Date(date).getTime();
  const now = new Date().getTime();
  const timeLeft = tripDate - now;
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  let url = `${darkskyUrl}/forecast/${process.env.DARKSKY_API}/${lat},${lng}`;
  daysLeft > 7 ? (url += `,${tripDate / 1000}?units=ca`) : (url += "?units=ca");

  const getData = async url => {
    try {
      await fetch(url)
        .then(response => response.json())
        .then(json => {
          console.log(json);
          myData = {
            temperature: json.currently.temperature,
            summary: json.hourly.summary
          };
        });
      console.log(myData);
      return myData;
    } catch (error) {
      console.log("Error occured while getting Weather API data.", error);
    }
  };
  return getData(url);
}

// POST route for weather
app.post("/weather", async function(req, res) {
  const coordinates = await getCityCoordinates(req.body.city);
  const weather = await getWeather(coordinates, req.body.date);
  res.send(weather);
});

// Get image from Pixabay
async function getImageUrlForLocation(location) {
  console.log("Am intrat in SERVER IMAGE");
  const url = encodeURI(`${pixabayUrl}/api/?key=${process.env.PIXABAY_API}&q=${location}&category=places`);
  let myData = {};

  const getData = async url => {
    try {
      await fetch(url)
        .then(response => response.json())
        .then(json => {
          console.log(json);
          myData = {
            url: json.hits[0].webformatURL
          };
        });
      console.log(myData);
      return myData;
    } catch (error) {
      console.log("Error occured while getting Pixabay API data.", error);
    }
  };
  console.log("Am terminat in SERVER IMAGE");
  return getData(url);
}

// POST route for image
app.post("/image", async function(req, res) {
  const imageUrl = await getImageUrlForLocation(req.body.city);
  res.send(imageUrl);
});

module.exports = app;
