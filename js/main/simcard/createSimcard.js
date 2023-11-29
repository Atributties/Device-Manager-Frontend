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
            <label for="telefonNummer">Telefonnummer:</label>
            <input type="text" id="telefonNummer" name="telefonNummer" required>

            <label for="ICCIDNumber">IMSI Number:</label>
            <input type="text" id="ICCIDNumber" name="ICCIDNumber" required>

            <label for="pinkode">PIN Code:</label>
            <input type="text" id="pinkode" name="pinkode" required>

            <label for="pukkode">PUK Code:</label>
            <input type="text" id="pukkode" name="pukkode" required>

            <button type="button" onclick="submitSimCard()" id="createSimCardButton">Create SimCard</button>
        </form>
    `;

    // Get the container element
    const container = document.getElementById('main-container');
    // Insert the generated HTML into the container
    container.innerHTML = simCardCreationTemplate;
}

window.submitSimCard = function () {
    const formData = {
        telefonNummer: document.getElementById('telefonnummer').value,
        ICCIDNumber: document.getElementById('ICCIDNumber').value,
        pinkode: document.getElementById('pinkode').value,
        pukkode: document.getElementById('pukkode').value
    };

    postObjectAsJson(simCardUrl, formData, "POST", getToken())
        .then(response => {
            if (response.ok) {
                alert("SimCard created successfully");
                window.location.reload();
            } else {
                alert("Failed to create SimCard. Status: " + response.status);
            }
        })
        .catch(error => {
            console.error("Error creating SimCard:", error);
            alert("An error occurred while creating the SimCard.");
        });

}