// loadLogin.js
import postObjectAsJson from "../api/postObjectAsJson.js";
import Login from "../js/login/Login.js";
import storeToken from "./jwtUtils.js";
import updateNavbarForRole from "../js/navBar/fillNavBar.js";

export default async function loadLogin() {
    const loginURL = "http://localhost:8080/auth/login";
    const loginContent = Login();
    document.body.innerHTML = loginContent;

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
                    const userRole = localStorage.getItem('userRole');

                    // Update the navbar immediately after successful login
                    updateNavbarForRole(userRole);

                    console.log(localStorage.getItem('userRole'))
                    console.log("Login successful:", data);
                    console.log("jwt token:", data.jwt);
                } else {
                    console.error("Login failed:", response.status);
                    // Handle login failure if needed
                }
            } catch (error) {
                console.error("Error during login:", error);
                // Handle error during login if needed
            }
        });
    } else {
        console.log("Required elements (submit button, email input, or password input) not found");
        // Handle missing elements if needed
    }
}