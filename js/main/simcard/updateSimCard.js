import postObjectAsJson from "../../../api/postObjectAsJson.js";
import fetchAnyUrl from "../../../api/fetchAnyUrl.js";
import {getToken} from "../../../utils/jwtUtils.js";

const simCardUrl = 'http://localhost:8080/simcard';
const token = getToken();

export async function updateSimCard(simCardId) {
    const updateUrl = simCardUrl + "/" + simCardId;
    try {
        const simCard = await fetchAnyUrl(updateUrl, "GET", token); // Use GET to fetch existing sim card data
        updateSimCardPage(simCard);
    } catch (error) {
        console.error("Error fetching sim card:", error);
    }
}

export function updateSimCardPage(simCard) {
    const container = document.getElementById('main-container');
    if (!container) {
        console.error("Update sim card container not found");
        return;
    }

    // Define the sim card update HTML template with pre-filled data
    const simCardUpdateTemplate = `
        <h2>Update SimCard</h2>
        <form id="updateSimCardForm">
            <label for="phoneNumber">Phone Number:</label>
            <input type="text" id="phoneNumber" name="phoneNumber" value="${simCard.phoneNumber}" required>

            <label for="iccidnumber">ICCID Number:</label>
            <input type="text" id="iccidnumber" name="iccidnumber" value="${simCard.iccidNumber}" required>

            <label for="pin">PIN Code:</label>
            <input type="text" id="pin" name="pin" value="${simCard.pin}" required>

            <label for="puk">PUK Code:</label>
            <input type="text" id="puk" name="puk" value="${simCard.puk}" required>

            <button type="button" onclick="updateSimCardSubmit(${simCard.id})" id="updateSimCardButton">Update SimCard</button>
        </form>
    `;

    // Insert the generated HTML into the container
    container.innerHTML = simCardUpdateTemplate;

    window.updateSimCardSubmit = updateSimCardSubmit;
}

function updateSimCardSubmit(simCardId) {
    const formData = {
        phoneNumber: document.getElementById('phoneNumber').value,
        iccidNumber: document.getElementById('iccidnumber').value,
        pin: document.getElementById('pin').value,
        puk: document.getElementById('puk').value
    };

    const updateUrl = `${simCardUrl}/${simCardId}`;
    postObjectAsJson(updateUrl, formData, "PUT", token).then(response => {
        if (response.ok) {
            alert("SimCard updated successfully");
            window.location.reload();
        } else {
            alert("Failed to update sim card. Status: " + response.status);
        }
    }).catch(error => {
        console.error("Error updating sim card:", error);
        alert("An error occurred while updating the sim card.");
    });
}
