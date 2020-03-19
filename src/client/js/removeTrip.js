const inputTripCity = document.getElementById("input-trip-city");
const inputTripDate = document.getElementById("input-trip-date");
const searchTrip = document.getElementById("search-trip");
const tripsDetails = document.getElementById("trip-details");

let tripData = localStorage.getItem("trip") ? JSON.parse(localStorage.getItem("trip")) : [];
localStorage.setItem("trips", JSON.stringify(tripData));

const removeAllTrips = () => {
  localStorage.clear();
  while (tripsDetails.firstChild) {
    tripsDetails.removeChild(tripsDetails.firstChild);
  }
};

export { removeAllTrips };
