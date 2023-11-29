
import postObjectAsJson from "../../../api/postObjectAsJson.js";
import {getToken} from "../../../utils/jwtUtils.js";

const url = 'http://localhost:8080/user/register';
const token = getToken()

export default function createUserPage() {
    console.log("createUserPage function called");
    // Define the user creation HTML template
    const userCreationTemplate = `
        <h2 id="createUserHeading">Create User</h2>
        <form id="createUserForm">
            <label for="firstname">First Name:</label>
            <input type="text" id="firstname" name="firstname" required>

            <label for="middlename">Middle Name:</label>
            <input type="text" id="middlename" name="middlename">

            <label for="lastname">Last Name:</label>
            <input type="text" id="lastname" name="lastname" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>

            <label for="userType">User Type:</label>
            <select id="userType" name="userType" required>
                <option value="DEVICE_ADMIN">Device Admin</option>
                <option value="USER">User</option>
            </select>

            <button type="button" onclick="submitUser()" id="createUserButton">Create User</button>
        </form>
    `;

    // Get the container element
    const container = document.getElementById('main-container');
    container.innerHTML = userCreationTemplate;
    // Insert the generated HTML into the container
    container.innerHTML = userCreationTemplate;
}

// Example function for submitting user data (you can replace this with your actual logic)
window.submitUser = async function () {
    const formData = {
        firstname: document.getElementById('firstname').value,
        middlename: document.getElementById('middlename').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        userType: document.getElementById('userType').value
    };

    try {
        // Perform any further processing or send the data to your backend
        console.log(formData);
        const response = await postObjectAsJson(url, formData, "POST", token);

        // Check the response status or perform other logic based on the response
        if (response.ok) {
            alert("User created successfully");
            window.location.reload();
        } else {
            alert("Failed to create user. Please check the form data and try again.");
        }
    } catch (error) {
        console.error("Error submitting user:", error);
        alert("An error occurred while creating the user. Please try again later.");
    }
}

