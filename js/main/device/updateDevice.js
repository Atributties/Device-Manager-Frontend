import postObjectAsJson from "../../../api/postObjectAsJson.js";
import {getToken} from "../../../utils/jwtUtils.js";
import fetchAnyUrl from "../../../api/fetchAnyUrl.js";
import fillDropdownWithDevicetypes from "./fillDropdownDeviceTypes.js";
import fillDropdownWithUsers from "../../../api/fillDropdownWithUsers.js";
import fillDropdownStatus from "../../../api/fillDropdownWithStatus.js";


const deviceUrl = 'http://localhost:8080/device';
const token = getToken();



// Function to fetch a device by ID and display the update form
export default async function fetchDeviceById(deviceId) {
    const updateUrl = deviceUrl + "/" + deviceId;
    try {
        const device = await fetchAnyUrl(updateUrl, "PUT", token);
        console.log("Fetched device" + device);
        updateDevicePage(device);
    } catch (error) {
        console.error("Error fetching device:", error);
    }
}

// Function to render the update device form
export async function updateDevicePage(device) {
    console.log("Device in updateDevicePage:", device);
    const container = document.getElementById('main-container');
    if (!container) {
        console.error("Update device container not found");
        return;
    }

    const deviceUpdateTemplate = `
        <h2 id="updateDeviceHeading">Update Device for ${device.id}</h2>
        <form id="updateDeviceForm">        
            <label for="IMEINumber">IMEI Number:</label>
            <input type="text" id="IMEINumber" name="IMEINumber" value="${device.imeiNumber}" required>

            <label for="SerialNumber">Serial Number:</label>
            <input type="text" id="SerialNumber" name="SerialNumber" value="${device.serialNumber}" required>

            <label for="deviceType">Device Type:</label>
            <select id="deviceType" name="deviceType" required>
                <!-- Populate with device types -->
            </select>

            <label for="deviceModel">Device Model:</label>
            <input type="text" id="deviceModel" name="deviceModel" value="${device.deviceModel}" required>

            <label for="status">Device Status:</label>
            <select id="status" name="status" required>
                <!-- Populate with device statuses -->
            </select>

            <label for="comments">Comments:</label>
            <textarea id="comments" name="comments">${device.comments}</textarea>

            <label for="users">Assign User:</label>
            <select id="users" name="users" required>
                <!-- Populate with device statuses -->
            </select>
            
            <button type="button" id="updateDeviceButton">Update Device</button>
        </form>
    `;

    container.innerHTML = deviceUpdateTemplate;
    await fillDropdownWithDevicetypes();
    await fillDropdownStatus(device.status ? device.status : null);
    await fillDropdownWithUsers(device.user ? device.user.id : null);

    // Attach event listener to the update button
    const updateButton = document.getElementById('updateDeviceButton');
    if (updateButton) {
        updateButton.addEventListener('click', () => updateDevice(device.id));
    } else {
        console.error("Update button not found");
    }
}


// Function to handle the device update logic
export function updateDevice(deviceId) {
    // Read updated values from form inputs
    const imeiNumber = document.getElementById('IMEINumber').value;
    const serialNumber = document.getElementById('SerialNumber').value;
    const deviceType = document.getElementById('deviceType').value;
    const deviceModel = document.getElementById('deviceModel').value;
    const status = document.getElementById('status').value;
    const comments = document.getElementById('comments').value;
    const user = document.getElementById('users').value;

    // Convert the user ID to a number or keep it as null
    const userId = user === 'None' ? null : parseInt(user, 10);

    const formData = {
        imeiNumber, // Assuming imeiNumber is not meant to be changed, use original
        serialNumber,
        deviceType,
        deviceModel,
        status,
        comments,
        user: userId !== null ? { id: userId } : null, // Include the user ID as an object or null
    };

    console.log('Device ID:', deviceId);
    console.log('Updating device with ID:', deviceId, 'Data:', formData);
    postObjectAsJson(deviceUrl + "/" + deviceId, formData, "PUT", token)
        .then(response => {
            if (response.ok) {
                alert("Device updated successfully");
                // Optionally, handle UI updates or redirection
            } else {
                alert("Failed to update device. Status: " + response.status);
            }
        })
        .catch(error => {
            console.error("Error updating device:", error);
            alert("An error occurred while updating the device.");
        });
}