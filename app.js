import fillNavBar from "./js/navBar/fillNavBar.js";
import Main from "./components/main/Main.js";
import CreateUser from "./js/main/createUser.js";

const user = {"role": "ROLE_SYSTEM_ADMIN"};

// Call fillNavBar to get the HTML
const navBarHtml = fillNavBar(user);
const main = Main();

// Insert the HTML into the containers
document.getElementById("navbar-container").innerHTML = navBarHtml;
document.getElementById("main-container").innerHTML = main;

// Add event listener to the "Create User" link
document.getElementById("create-user-link").addEventListener("click", function(event) {
    event.preventDefault();
    loadCreateUser();
});

// Function to load createUser content
function loadCreateUser() {
    const createUserContent = CreateUser(); // Assuming CreateUser returns HTML content
    document.getElementById("main-container").innerHTML = createUserContent;
}


