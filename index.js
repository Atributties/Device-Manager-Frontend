import fillNavBar from "./js/navBar/fillNavBar.js";


// Call fillNavBar to get the HTML
const navBarHtml = fillNavBar();

// Insert the HTML into the container
document.getElementById("navbar-container").innerHTML = navBarHtml;
