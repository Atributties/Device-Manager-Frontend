import fillNavBar from "./js/navBar/fillNavBar.js";
import Main from "./components/main/Main.js";

const user = {"role": "ROLE_SYSTEM_ADMIN"}

// Call fillNavBar to get the HTML
const navBarHtml = fillNavBar(user);
const main = Main()

// Insert the HTML into the container
document.getElementById("navbar-container").innerHTML = navBarHtml;
document.getElementById("main-container").innerHTML = main;

