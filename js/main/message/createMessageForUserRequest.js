// Assuming you have a function to fetch UserRequest information by its ID
import {getToken} from "../../../utils/jwtUtils.js";
import fetchAnyUrl from "../../../api/fetchAnyUrl.js";
import createUserRequestsTableForAdmin from "../table/userRequestTabelForAdmin.js";
import postObjectAsJson from "../../../api/postObjectAsJson.js";
import formatDateTime from "../modules/dateTimeFormat.js";




export default async function fetchUserRequestInfo(userRequestId) {
    const url = `http://localhost:8080/api/chat/admin/user-requests/${userRequestId}`;
    const accessToken = getToken();

    try {
        const userRequestsList = await fetchAnyUrl(url, {}, accessToken);
        await displayUserRequestInfo(userRequestsList);
        console.log(userRequestsList);
    } catch (error) {
        console.error("Error getting user requests table:", error);
    }
}

// Function to display UserRequest information
async function displayUserRequestInfo(userRequest) {
    const mainContainer = document.getElementById("main-container");

    // Create HTML to display UserRequest information
    const userRequestInfoHTML = `
        <div id="user-request-container">
            <div id="elegant-user-info">
                <h2 id="elegant-user-info-heading">UserRequest Information</h2>
                <div class="elegant-user-info-property">
                    <span class="elegant-property-key">ID:</span>
                    <span class="elegant-property-value">${userRequest.id}</span>
                </div>
                <div class="elegant-user-info-property">
                    <span class="elegant-property-key">Request Type:</span>
                    <span class="elegant-property-value">${userRequest.requestType}</span>
                </div>
                <div class="elegant-user-info-property">
                    <span class="elegant-property-key">Request Text:</span>
                    <span class="elegant-property-value">${userRequest.requestText}</span>
                </div>
                <!-- Add more properties as needed -->
                <hr id="elegant-user-info-separator">
            </div>
        </div>
    `;

    mainContainer.innerHTML = userRequestInfoHTML;

    // Display messages for the UserRequest
    displayMessages(userRequest.messages);

    // Include the create message section
    createMessagePage();
}

// Function to display messages
function displayMessages(messages) {
    const mainContainer = document.getElementById("main-container");

    // Create HTML to display messages
    const messagesHTML = `
        <div id="messages-container">
            <h2 id="messages-heading">Messages</h2>
            <ul id="messages-list">
                ${messages.map(message => `
                    <li id="message-${message.id}">
                       
                        <p class="message-property" id="message-user-${message.id}">User: ${message.user.firstname} ${message.user.lastname}</p>
                        <p class="message-property" id="message-text-${message.id}">Message: ${message.messageText}</p>
                        <p class="message-property" id="message-date-${message.id}">Date Send: ${formatDateTime(message.dateCreated)}</p>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    mainContainer.innerHTML += messagesHTML;
}




function createMessagePage() {

    const mainContainer = document.getElementById("main-container");
    console.log("createMessagePage function called");
    // Define the Message creation HTML template
    const messageCreationTemplate = `
        <div id="create-message-container">
        <h2 id="createMessageHeading">Create Message</h2>
        <form id="createMessageForm">
            <label for="messageText">Message Text:</label>
            <textarea id="messageText" name="messageText" rows="4" required></textarea>

            <button type="button" onclick="submitMessage()" id="createMessageButton">Create Message</button>
        </form>
        </div>
    `;

    // Append the generated HTML to the existing content
    mainContainer.innerHTML += messageCreationTemplate;
}


window.submitMessage = async function () {
    const userRequestId1 = localStorage.getItem('userRequestID')
    const user = localStorage.getItem('userID')
    const formData = {
        userRequestId: userRequestId1,
        user: {id: user},
        messageText: document.getElementById('messageText').value
    };

    try {
        // Perform any further processing or send the data to your backend
        const postMessageUrl = `http://localhost:8080/api/chat/user-requests/${userRequestId1}/messages`
        console.log(formData);
        const response = await postObjectAsJson(postMessageUrl, formData, "POST", getToken());

        // Check the response status or perform other logic based on the response
        if (response.ok) {
            alert("Message created successfully");
            localStorage.removeItem('requestID')
            window.location.reload();
        } else {
            alert("Failed to create message. Please check the form data and try again.");
        }
    } catch (error) {
        console.error("Error submitting message:", error);
        alert("An error occurred while creating the message. Please try again later.");
    }
}
