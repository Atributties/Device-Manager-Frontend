import postObjectAsJson from "../../../api/postObjectAsJson.js";
import fetchAnyUrl from "../../../api/fetchAnyUrl.js";
import { getToken } from "../../../utils/jwtUtils.js";

const dataCardUrl = 'http://localhost:8080/datacard';
const token = getToken();

export async function updateDataCard(dataCardId) {
    const updateUrl = `${dataCardUrl}/${dataCardId}`;
    try {
        const dataCard = await fetchAnyUrl(updateUrl, "GET", token); // Fetch the existing data card data
        updateDataCardPage(dataCard);
    } catch (error) {
        console.error("Error fetching data card:", error);
    }
}

export function updateDataCardPage(dataCard) {
    const container = document.getElementById('main-container');
    if (!container) {
        console.error("Update data card container not found");
        return;
    }

    // Define the DataCard update HTML template with pre-filled data
    const dataCardUpdateTemplate = `
        <h2>Update DataCard</h2>
        <form id="updateDataCardForm">
            <label for="iccidnumber">ICCID Number:</label>
            <input type="text" id="iccidnumber" name="iccidnumber" value="${dataCard.iccidNumber}" required>

            <label for="pin">PIN Code:</label>
            <input type="text" id="pin" name="pin" value="${dataCard.pin}" required>

            <label for="puk">PUK Code:</label>
            <input type="text" id="puk" name="puk" value="${dataCard.puk}" required>

            <button type="button" onclick="updateDataCardSubmit(${dataCard.id})" id="updateDataCardButton">Update DataCard</button>
        </form>
    `;

    // Insert the generated HTML into the container
    container.innerHTML = dataCardUpdateTemplate;

    // Attach the submit function to the window object for global access
    window.updateDataCardSubmit = updateDataCardSubmit;
}

function updateDataCardSubmit(dataCardId) {
    const formData = {
        iccidNumber: document.getElementById('iccidnumber').value,
        pin: document.getElementById('pin').value,
        puk: document.getElementById('puk').value
    };

    const updateUrl = `${dataCardUrl}/${dataCardId}`;
    postObjectAsJson(updateUrl, formData, "PUT", token).then(response => {
        if (response.ok) {
            alert("DataCard updated successfully");
            window.location.reload();
        } else {
            alert("Failed to update DataCard. Status: " + response.status);
        }
    }).catch(error => {
        console.error("Error updating DataCard:", error);
        alert("An error occurred while updating the DataCard.");
    });
}

