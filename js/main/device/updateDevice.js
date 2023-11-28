import postObjectAsJson from "../../../api/postObjectAsJson.js";
import {getToken} from "../../../utils/jwtUtils.js";
import fetchAnyUrl from "../../../api/fetchAnyUrl.js";

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
export function updateDevicePage(device) {
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
                <option value="ACTION_CAMERA" ${device.deviceType === 'ACTION_CAMERA' ? 'selected' : ''}>Action Camera</option>
                <option value="DOCKING_STATION" ${device.deviceType === 'DOCKING_STATION' ? 'selected' : ''}>Docking Station</option>
                <option value="HEADSET" ${device.deviceType === 'HEADSET' ? 'selected' : ''}>Headset</option>
                <option value="INTERNET_SUBSCRIPTION" ${device.deviceType === 'INTERNET_SUBSCRIPTION' ? 'selected' : ''}>Internet Subscription</option>
                <option value="MOBILE_PHONE" ${device.deviceType === 'MOBILE_PHONE' ? 'selected' : ''}>Mobile Phone</option>
                <option value="PC" ${device.deviceType === 'PC' ? 'selected' : ''}>PC</option>
                <option value="ROUTER" ${device.deviceType === 'ROUTER' ? 'selected' : ''}>Router</option>
                <option value="SCREEN" ${device.deviceType === 'SCREEN' ? 'selected' : ''}>Screen</option>
                <option value="SMARTPHONE" ${device.deviceType === 'SMARTPHONE' ? 'selected' : ''}>Smartphone</option>
                <option value="TABLET" ${device.deviceType === 'TABLET' ? 'selected' : ''}>Tablet</option>
                <option value="MOBILE_PHONE_ACCESSORIES" ${device.deviceType === 'MOBILE_PHONE_ACCESSORIES' ? 'selected' : ''}>Mobile Phone Accessories</option>
                <option value="TABLET_ACCESSORIES" ${device.deviceType === 'TABLET_ACCESSORIES' ? 'selected' : ''}>Tablet Accessories</option>
                <option value="GPS" ${device.deviceType === 'GPS' ? 'selected' : ''}>GPS</option>
                <option value="WEBCAM" ${device.deviceType === 'WEBCAM' ? 'selected' : ''}>Webcam</option>
            </select>

            <label for="deviceModel">Device Model:</label>
            <input type="text" id="deviceModel" name="deviceModel" value="${device.deviceModel}" required>

            <label for="deviceStatus">Device Status:</label>
            <select id="deviceStatus" name="deviceStatus" required>
                <option value="IN_USE" ${device.deviceStatus === 'IN_USE' ? 'selected' : ''}>In Use</option>
                <option value="IN_STORAGE" ${device.deviceStatus === 'IN_STORAGE' ? 'selected' : ''}>In Storage</option>
                <option value="UNDER_REPAIR" ${device.deviceStatus === 'UNDER_REPAIR' ? 'selected' : ''}>Under Repair</option>
                <option value="RETIRED" ${device.deviceStatus === 'RETIRED' ? 'selected' : ''}>Retired</option>
            </select>

            <label for="comments">Comments:</label>
            <textarea id="comments" name="comments">${device.comments}</textarea>

            <button type="button" id="updateDeviceButton">Update Device</button>
        </form>
    `;


    container.innerHTML = deviceUpdateTemplate;

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
    const deviceStatus = document.getElementById('deviceStatus').value;
    const comments = document.getElementById('comments').value;

    const formData = {
        imeiNumber, // Assuming imeiNumber is not meant to be changed, use original
        serialNumber,
        deviceType,
        deviceModel,
        deviceStatus,
        comments
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

// Example usage: fetchDeviceById('123456789876543');
