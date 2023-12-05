import postObjectAsJson from "../../../api/postObjectAsJson.js";
import fetchAnyUrl from "../../../api/fetchAnyUrl.js";
import { getToken } from "../../../utils/jwtUtils.js";
import fillDropdownWithUsers from "../user/fillDropdownWithUsers.js";

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

export async function updateDataCardPage(dataCard) {
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
            
            <label for="users">Assign User:</label>
            <select id="users" name="users" required>
                <!-- Populate with device statuses -->
            </select>

            <button type="button" onclick="updateDataCardSubmit(${dataCard.id})" id="updateDataCardButton">Update DataCard</button>
        </form>
    `;

    // Insert the generated HTML into the container
    container.innerHTML = dataCardUpdateTemplate;
    await fillDropdownWithUsers(dataCard.user ? dataCard.user.id : null);

    // Attach the submit function to the window object for global access
    window.updateDataCardSubmit = updateDataCardSubmit;
}

export function updateDataCardSubmit(dataCardId) {
    // Read updated values from form inputs
    const iccidNumber = document.getElementById('iccidnumber').value;
    const pin = document.getElementById('pin').value;
    const puk = document.getElementById('puk').value;
    const user = document.getElementById('users').value;

    // Convert the user ID to a number or keep it as null
    const userId = user === 'None' ? null : parseInt(user, 10);

    const formData = {
        iccidNumber,
        pin,
        puk,
        user: userId !== null ? { id: userId } : null, // Include the user ID as an object or null
    };

    const updateUrl = `${dataCardUrl}/${dataCardId}`;
    postObjectAsJson(updateUrl, formData, "PUT", token)
        .then(response => {
            if (response.ok) {
                alert("DataCard updated successfully");
                window.location.reload();
            } else {
                alert("Failed to update DataCard. Status: " + response.status);
            }
        })
        .catch(error => {
            console.error("Error updating DataCard:", error);
            alert("An error occurred while updating the DataCard.");
        });
}

