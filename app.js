// app.js

import fillNavBar from "./js/navBar/fillNavBar.js";
import Main from "./components/main/Main.js";
import CreateUser from "./js/main/createUser.js";
import Login from "./js/main/login.js";
import { postObjectAsJson } from "./js/services/module.js";

// Functions to store and retrieve the JWT token
function storeToken(token) {
    localStorage.setItem('jwtToken', token);
}

function getToken() {
    return localStorage.getItem('jwtToken');
}

// Function to update the navbar based on the role
function updateNavbarForRole(role) {
    const navBarHtml = fillNavBar({ role: role });
    document.getElementById("navbar-container").innerHTML = navBarHtml;
    attachNavbarEventListeners();
}

// Attach event listeners to navbar links
function attachNavbarEventListeners() {
    // Event listener for "Create User" link
    const createUserLink = document.getElementById("create-user-link");
    if (createUserLink) {
        createUserLink.addEventListener("click", function(event) {
            event.preventDefault();
            loadCreateUser();
        });
    }

    // Event listener for "Login" link
    const loginLink = document.getElementById("login-link");
    if (loginLink) {
        loginLink.addEventListener("click", function(event) {
            event.preventDefault();
            loadLogin();
        });
    }

    // Attach event listener for logout
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
        logoutLink.addEventListener("click", function(event) {
            event.preventDefault();
            handleLogout();
        });
    }
}

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

    const submitButton = document.getElementById("submitButton");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");

    if (submitButton && emailInput && passwordInput) {
        submitButton.addEventListener("click", async (event) => {
            event.preventDefault();
            const email = emailInput.value;
            const password = passwordInput.value;

            const loginCredentials = {
                email: email,
                password: password
            };

            try {
                const response = await postObjectAsJson(loginURL, loginCredentials, "POST");

                if (response.ok) {
                    const data = await response.json();
                    storeToken(data.jwt); // Store the JWT token
                    localStorage.setItem('userRole', data.user.userType);
                    updateNavbarForRole(data.user.userType);
                    console.log("Login successful:", data);
                    console.log("jwt token:", data.jwt);
                } else {
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

function handleLogout() {
    // Clear stored user role and JWT token
    localStorage.removeItem('userRole');
    localStorage.removeItem('jwtToken');

    // Update the navbar to the default state for an unauthenticated user
    updateNavbarForRole("ROLE_ANONYMOUS");

    // Optionally, redirect to the login page or another view
    // window.location.href = '/login.html'; // Uncomment and modify as needed
}

// Check if the user is already logged in and update the navbar
document.addEventListener('DOMContentLoaded', () => {
    const storedRole = localStorage.getItem('userRole') || "ROLE_ANONYMOUS";
    updateNavbarForRole(storedRole);
    const main = Main();
    document.getElementById("main-container").innerHTML = main;
});

// Exporting if needed (depends on your project structure)
export { loadCreateUser, loadLogin, updateNavbarForRole, storeToken, getToken };






