/**
 * GLOBAL IMPORTS
 */
import { tripMaker } from "./createTrip";

/**
 *
 * @param  event
 */
function addTrip(event) {
  let trip = {};
  event.preventDefault();
  const tripCity = document.getElementById("input-trip-city").value;
  const inputDate = document.getElementById("input-trip-date").value + "T00:00:00";
  const tripDate = new Date(inputDate);
  trip = {
    city: tripCity,
    date: tripDate
  };
  getWeather("http://localhost:5000/weather", trip)
    .then(response => {
      trip.temperature = Math.round(response.temperature);
      trip.weatherSummary = response.summary;
      return getImage("http://localhost:5000/image", trip);
    })
    .then(response => {
      trip.image = response.url;
      tripMaker(trip);
    });
}

function refreshView() {}

const getWeather = async (url = "", data = {}) => {
  let myData = {};
  try {
    await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => {
        myData = json;
      });
    return myData;
  } catch (error) {
    console.log(`Error while trying to retreive weather for location ${data.city}`, error);
  }
};
const getImage = async (url = "", data = {}) => {
  let myData = {};
  try {
    await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => {
        myData = json;
      });
    return myData;
  } catch (error) {
    console.log(`Error while trying to retreive image URL for location ${location}`, error);
  }
};

export { addTrip };
