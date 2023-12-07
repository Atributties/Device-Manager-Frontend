import postObjectAsJson from "../../../api/postObjectAsJson.js";
import { getToken } from "../../../utils/jwtUtils.js";
import fillDropdownWithRequestTypes from "../../../api/fillDropdownWithRequesttypes.js";

const token = getToken();
const url = 'http://localhost:8080/api/chat/user-requests';

export default async function createUserRequestPage() {
    // Fetch the user ID from local storage
    const userId = localStorage.getItem('userID'); // Adjust the key if necessary

    const userRequestTemplate = `
        <h2 id="userRequesth2">Create User Request</h2>
        <form id="createUserRequestForm">
            <label for="requestType">Request Type:</label>
            <select id="requestType" name="requestType" required>
                <!-- Options will be populated here -->
            </select>

            <label for="requestText">Request Text:</label>
            <textarea id="requestText" name="requestText" required></textarea>

            <button type="button" onclick="submitUserRequest(${userId})" id="createUserRequestButton">Create Request</button>
        </form>
    `;

    const container = document.getElementById('main-container');
    container.innerHTML = userRequestTemplate;
    await fillDropdownWithRequestTypes();
}

window.submitUserRequest = async function (userId) {
    const formData = {
        requestType: document.getElementById('requestType').value,
        user: { id: userId },
        requestText: document.getElementById('requestText').value
        // Add other fields as needed
    };

    try {
        console.log(formData);
        const response = await postObjectAsJson(url, formData, "POST", token);

        if (response.ok) {
            alert("User request created successfully");
            window.location.reload(); // or redirect to another page
        } else {
            alert("Failed to create user request. Please check the form data and try again.");
        }
    } catch (error) {
        console.error("Error submitting user request:", error);
        alert("An error occurred while creating the user request. Please try again later.");
    }
}

