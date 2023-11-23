import postObjectAsJson from "../../../api/postObjectAsJson.js";
import {getToken} from "../../../utils/jwtUtils.js";
import fetchAnyUrl from "../../../api/fetchAnyUrl.js";

const deviceUrl = 'http://localhost:8080/device'; // Adjust the URL according to your API
const token = getToken();

async function fetchDeviceById(deviceId) {
    const updateUrl = deviceUrl + "/" + deviceId;
    try {
        const device = await fetchAnyUrl(updateUrl, token); // Await the Promise
        updateDevicePage(device);
    } catch (error) {
        console.error("Error fetching device:", error);
    }
}

export default function updateDevicePage(device) {
    // Get the container element
    const container = document.getElementById('update-device');

    // Define the device update HTML template with pre-filled data
    const deviceUpdateTemplate = `
        <h2 id="updateDeviceHeading">Update Device</h2>
        <form id="updateDeviceForm">
            <label for="IMEINumber">IMEI Number:</label>
            <input type="text" id="IMEINumber" name="IMEINumber" value="${device.IMEINumber}" required>

            <label for="SerialNumber">Serial Number:</label>
            <input type="text" id="SerialNumber" name="SerialNumber" value="${device.SerialNumber}" required>

            <label for="deviceType">Device Type:</label>
            <select id="deviceType" name="deviceType" required>
                <option value="TYPE1" ${device.deviceType === 'TYPE1' ? 'selected' : ''}>Type 1</option>
                <option value="TYPE2" ${device.deviceType === 'TYPE2' ? 'selected' : ''}>Type 2</option>
            </select>

            <label for="deviceModel">Device Model:</label>
            <input type="text" id="deviceModel" name="deviceModel" value="${device.deviceModel}" required>

            <label for="deviceStatus">Device Status:</label>
            <select id="deviceStatus" name="deviceStatus" required>
                <option value="ACTIVE" ${device.deviceStatus === 'ACTIVE' ? 'selected' : ''}>Active</option>
                <option value="INACTIVE" ${device.deviceStatus === 'INACTIVE' ? 'selected' : ''}>Inactive</option>
            </select>

            <label for="comments">Comments:</label>
            <textarea id="comments" name="comments">${device.comments}</textarea>

            <button type="button" onclick="updateDevice(${device.id})" id="updateDeviceButton">Update Device</button>
        </form>
    `;

    // Insert the generated HTML into the container
    container.innerHTML = deviceUpdateTemplate;
}

// Example function for updating device data (you can replace this with your actual logic)
function updateDevice(deviceId) {
    const formData = {
        IMEINumber: document.getElementById('IMEINumber').value,
        SerialNumber: document.getElementById('SerialNumber').value,
        deviceType: document.getElementById('deviceType').value,
        deviceModel: document.getElementById('deviceModel').value,
        deviceStatus: document.getElementById('deviceStatus').value,
        comments: document.getElementById('comments').value
    };

    // Perform any further processing or send the data to your backend
    console.log('Updating device with ID:', deviceId, 'Data:', formData);
    postObjectAsJson(deviceUrl + '/' + deviceId, formData, "PUT", token);
}