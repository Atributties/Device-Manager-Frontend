import postObjectAsJson from "../../../api/postObjectAsJson.js";
import {getToken} from "../../../utils/jwtUtils.js";

const token = getToken()

const url = 'http://localhost:8080/device'

export default function createDevicePage() {
    // Define the device creation HTML template
    const deviceCreationTemplate = `
        <h2 id="createDeviceHeading">Create Device</h2>
        <form id="createDeviceForm">
            <label for="IMEINumber">IMEI Number:</label>
            <input type="text" id="IMEINumber" name="IMEINumber" required>

            <label for="SerialNumber">Serial Number:</label>
            <input type="text" id="SerialNumber" name="SerialNumber" required>

            <label for="deviceType">Device Type:</label>
            <select id="deviceType" name="deviceType" required>
                <option value="TYPE1">Type 1</option>
                <option value="TYPE2">Type 2</option>
            </select>

            <label for="deviceModel">Device Model:</label>
            <input type="text" id="deviceModel" name="deviceModel" required>

            <label for="deviceStatus">Device Status:</label>
            <select id="deviceStatus" name="deviceStatus" required>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
            </select>

            <label for="comments">Comments:</label>
            <textarea id="comments" name="comments"></textarea>

            <button type="button" onclick="submitDevice()" id="createDeviceButton">Create Device</button>
        </form>
    `;

    // Get the container element
    const container = document.getElementById('create-user');

    // Insert the generated HTML into the container
    container.innerHTML = deviceCreationTemplate;
}

// Example function for submitting device data
function submitDevice() {
    const formData = {
        IMEINumber: document.getElementById('IMEINumber').value,
        SerialNumber: document.getElementById('SerialNumber').value,
        deviceType: document.getElementById('deviceType').value,
        deviceModel: document.getElementById('deviceModel').value,
        deviceStatus: document.getElementById('deviceStatus').value,
        comments: document.getElementById('comments').value
    };

    // Perform any further processing or send the data to your backend
    console.log(formData);
    postObjectAsJson(url, formData, "POST", token);
}
