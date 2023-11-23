import fillNavBar from "./js/navBar/fillNavBar.js";
import Main from "./components/main/Main.js";
import CreateUser from "./js/main/createUser.js";
import Login from "./js/main/login.js";
import { postObjectAsJson } from "./js/services/module.js";


const user = {"role": "ROLE_ANONYMOUS"};

// Call fillNavBar to get the HTML
const navBarHtml = fillNavBar(user);
const main = Main();


// Insert the HTML into the containers
document.getElementById("navbar-container").innerHTML = navBarHtml;
document.getElementById("main-container").innerHTML = main;

document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to the "Create User" link if it exists
    const createUserLink = document.getElementById("create-user-link");
    if (createUserLink) {
        createUserLink.addEventListener("click", function(event) {
            event.preventDefault();
            loadCreateUser();
        });
    } else {
        console.log("Create User link not found");
    }

    // Add event listener to the "Login" link if it exists
    const loginLink = document.getElementById("login-link");
    if (loginLink) {
        loginLink.addEventListener("click", function(event) {
            event.preventDefault();
            loadLogin();
        });
    } else {
        console.log("Login link not found");
    }
});

// Function to load createUser content
function loadCreateUser() {
    const createUserContent = CreateUser();
    document.getElementById("main-container").innerHTML = createUserContent;
}

// Function to load Login content
function loadLogin() {
    const loginURL = "http://localhost:8081/auth/login";
    const loginContent = Login();
    document.getElementById("main-container").innerHTML = loginContent;

    // Now attach the event listener to the submit button
    const submitButton = document.getElementById("submitButton");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");

    if (submitButton && emailInput && passwordInput) {
        submitButton.addEventListener("click", async (event) => {
            event.preventDefault();
            const email = emailInput.value;
            const password = passwordInput.value;

            // Prepare the object to send
            const loginCredentials = {
                email: email,
                password: password
            };

            try {
                // Send the login request
                const response = await postObjectAsJson(loginURL, loginCredentials, "POST");

                if (response.ok) {
                    const data = await response.json();
                    // Handle successful login here
                    console.log("Login successful:", data);
                } else {
                    // Handle errors
                    console.error("Login failed:", response.status);
                }
            } catch (error) {
                console.error("Error during login:", error);
            }
        });
    } else {
        console.log("Required elements (submit button, email input, or password input) not found");
    }
}



