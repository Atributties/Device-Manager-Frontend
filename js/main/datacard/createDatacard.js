import postObjectAsJson from "../../../api/postObjectAsJson.js";
import {getToken} from "../../../utils/jwtUtils.js";

const dataCardUrl = 'http://localhost:8080/datacard';
const token = getToken()

export default function createDataCardPage() {
    console.log("createDataCardPage function called");
    // Define the DataCard creation HTML template
    const dataCardCreationTemplate = `
        <h2 id="createDataCardHeading">Create DataCard</h2>
        <form id="createDataCardForm">
            <label for="ICCIDNumber">IMSI Number:</label>
            <input type="text" id="ICCIDNumber" name="ICCIDNumber" required>

            <label for="pinkode">PIN Code:</label>
            <input type="text" id="pinkode" name="pinkode" required>

            <label for="pukkode">PUK Code:</label>
            <input type="text" id="pukkode" name="pukkode" required>

            <button type="button" onclick="submitDataCard()" id="createDataCardButton">Create DataCard</button>
        </form>
    `;

    // Get the container element
    const container = document.getElementById('main-container');
    // Insert the generated HTML into the container
    container.innerHTML = dataCardCreationTemplate;
}

window.submitDataCard = function () {
    const formData = {
        ICCIDNumber: document.getElementById('ICCIDNumber').value,
        pinkode: document.getElementById('pinkode').value,
        pukkode: document.getElementById('pukkode').value
    };

    postObjectAsJson(dataCardUrl, formData, "POST", getToken())
        .then(response => {
            if (response.ok) {
                alert("DataCard created successfully");
                window.location.reload();
            } else {
                alert("Failed to create DataCard. Status: " + response.status);
            }
        })
        .catch(error => {
            console.error("Error creating DataCard:", error);
            alert("An error occurred while creating the DataCard.");
        });
}