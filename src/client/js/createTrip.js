const inputTripCity = document.getElementById("input-trip-city");
const inputTripDate = document.getElementById("input-trip-date");
const searchTrip = document.getElementById("search-trip");
const tripsDetails = document.getElementById("trip-details");

let tripData = localStorage.getItem("trip") ? JSON.parse(localStorage.getItem("trip")) : [];
localStorage.setItem("trips", JSON.stringify(tripData));

const tripMaker = (trip = {}) => {
  console.log("Am intrat in TRIP MAKER");
  console.log(trip);
  inputTripCity.value = "";
  inputTripDate.value = "";

  tripData.push(trip);
  localStorage.setItem("trips", JSON.stringify(tripData));

  let cityDiv = document.createElement("div");
  cityDiv.classList.add("small-container");
  cityDiv.innerHTML = `Your trip to ${trip.city}`;
  tripsDetails.appendChild(cityDiv);

  const readableDate = `${trip.date.getDate()} ${trip.date.toLocaleString("default", {
    month: "long"
  })} ${trip.date.getFullYear()}`;

  let weatherDiv = document.createElement("div");
  weatherDiv.classList.add("small-container");
  weatherDiv.innerHTML = `The temperature on ${readableDate} will be around ${trip.temperature} &#8451;. Weather forecast: ${trip.weatherSummary}`;
  tripsDetails.appendChild(weatherDiv);

  let imageDiv = document.createElement("div");
  imageDiv.classList.add("small-container");
  imageDiv.innerHTML = `<img src="${trip.image}" width="320" height="217">`;
  tripsDetails.appendChild(imageDiv);
};

export { tripMaker };
