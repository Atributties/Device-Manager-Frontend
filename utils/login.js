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
                    storeToken(data.jwt);
                    console.log("JWT Token:", data.jwt);

                    // Decode the JWT
                    const base64Url = data.jwt.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const payload = decodeURIComponent(atob(base64).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));

                    console.log("Decoded Payload:", payload);
                    const decodedToken = JSON.parse(payload);

                    const userRole = decodedToken.roles;

                    console.log("User role:", userRole);

                    localStorage.setItem('userRole', userRole);
                    updateNavbarForRole(userRole);

                    console.log("Login successful:", data);
                    console.log("jwt token:", data.jwt);
                    window.location.reload();
                } else {
                    console.error("Login failed:", response.status);
                }
            } catch (decodeError) {
                console.error("Error decoding JWT:", decodeError);
            }
        });
    } else {
        console.log("Required elements (submit button, email input, or password input) not found");
    }
}
