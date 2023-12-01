import postObjectAsJson from "../../../api/postObjectAsJson.js";
import {getToken} from "../../../utils/jwtUtils.js";

const simCardUrl = 'http://localhost:8080/simcard';
const token = getToken()

export default function createSimCardPage() {
    console.log("createSimCardPage function called");
    // Define the SimCard creation HTML template
    const simCardCreationTemplate = `
        <h2 id="createSimCardHeading">Create SimCard</h2>
        <form id="createSimCardForm">
            <label for="phoneNumber">phoneNumber:</label>
            <input type="text" id="phoneNumber" name="phoneNumber" required>

            <label for="iccidnumber">ICCID Number:</label>
            <input type="text" id="iccidnumber" name="iccidnumber" required>

            <label for="pin">PIN Code:</label>
            <input type="text" id="pin" name="pin" required>

            <label for="puk">PUK Code:</label>
            <input type="text" id="puk" name="puk" required>

            <button type="button" onclick="submitSimCard()" id="createSimCardButton">Create SimCard</button>
        </form>
    `;

    // Get the container element
    const container = document.getElementById('main-container');
    // Insert the generated HTML into the container
    container.innerHTML = simCardCreationTemplate;
}

window.submitSimCard = async function () {
    const formData = {
        iccidNumber: document.getElementById('iccidnumber').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        pin: document.getElementById('pin').value,
        puk: document.getElementById('puk').value
    };

    try {
        // Perform any further processing or send the data to your backend
        console.log(formData);
        const response = await postObjectAsJson(simCardUrl, formData, "POST", token);

        // Check the response status or perform other logic based on the response
        if (response.ok) {
            alert("Simcard created successfully");
            window.location.reload();
        } else {
            alert("Failed to create simcard. Please check the form data and try again.");
        }
    } catch (error) {
        console.error("Error submitting simcard:", error);
        alert("An error occurred while creating the simcard. Please try again later.");
    }

}