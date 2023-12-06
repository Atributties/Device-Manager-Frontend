import postObjectAsJson from "../../../api/postObjectAsJson.js";
import fetchAnyUrl from "../../../api/fetchAnyUrl.js";
import {getToken} from "../../../utils/jwtUtils.js";
import fillDropdownWithUsers from "../../../api/fillDropdownWithUsers.js";
import fillDropdownStatus from "../../../api/fillDropdownWithStatus.js";

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

export async function updateSimCardPage(simCard) {
    const container = document.getElementById('main-container');
    if (!container) {
        console.error("Update sim card container not found");
        return;
    }

    // Define the sim card update HTML template with pre-filled data
    const simCardUpdateTemplate = `
        <h2>Update SimCard</h2>
        <form id="updateSimCardForm">
            <label for="phonenumber">Phone Number:</label>
            <input type="text" id="phonenumber" name="phonenumber" value="${simCard.phoneNumber}" required>

            <label for="iccidnumber">ICCID Number:</label>
            <input type="text" id="iccidnumber" name="iccidnumber" value="${simCard.iccidNumber}" required>

            <label for="pin">PIN Code:</label>
            <input type="text" id="pin" name="pin" value="${simCard.pin}" required>

            <label for="puk">PUK Code:</label>
            <input type="text" id="puk" name="puk" value="${simCard.puk}" required>
            
            <label for="status">Device Status:</label>
            <select id="status" name="status" required>
                <!-- Populate with device statuses -->
            </select>
            
            <label for="users">Assign User:</label>
            <select id="users" name="users" required>
                <!-- Populate with device statuses -->
            </select>

         

            <button type="button" onclick="updateSimCardSubmit(${simCard.id})" id="updateSimCardButton">Update SimCard</button>
        </form>
    `;

    // Insert the generated HTML into the container
    container.innerHTML = simCardUpdateTemplate;
    await fillDropdownStatus(simCard.status ? simCard.status : null);
    await fillDropdownWithUsers(simCard.user ? simCard.user.id : null);


    window.updateSimCardSubmit = updateSimCardSubmit;
}

function updateSimCardSubmit(simCardId) {
    const phoneNumber = document.getElementById('phonenumber').value;
    const iccidNumber = document.getElementById('iccidnumber').value;
    const pin = document.getElementById('pin').value;
    const puk = document.getElementById('puk').value;
    const status = document.getElementById('status').value;
    const user = document.getElementById('users').value;
    const userId = user === 'None' ? null : parseInt(user, 10);

    const formData = {
        phoneNumber,
        iccidNumber,
        pin,
        puk,
        status,
        user: userId !== null ? { id: userId } : null, // Include the user ID as an object or null
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
