import { postObjectAsJson } from "./module.js";

const loginURL = "http://localhost:8081/auth/login";

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById("submitButton");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");

    if (submitButton && emailInput && passwordInput) {
        console.log("Submit button found");
        submitButton.addEventListener("click", async (event) => {
            console.log("Submit button clicked");
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
});



