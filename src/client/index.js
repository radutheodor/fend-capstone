/**
 * GLOBAL IMPORTS
 */
import "./styles/resets.scss";
import { addTrip } from "./js/app";
import { tripMaker } from "./js/createTrip";
import { removeAllTrips } from "./js/removeTrip";

/**
 * GLOBAL VARIABLES
 */
const storedData = JSON.parse(localStorage.getItem("trips"));

/**
 * EVENT LISTENERS
 */
// Event listener for add trip click event
document.getElementById("search-trip").addEventListener("click", addTrip);
document.getElementById("remove-all-trips").addEventListener("click", removeAllTrips);

/**
 * OTHER FUNCTIONS
 */
// Draw saved trips every time we open the app
storedData.forEach(trip => {
  tripMaker(trip);
});
