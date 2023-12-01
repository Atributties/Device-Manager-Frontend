import postObjectAsJson from "../../../api/postObjectAsJson.js";
import {getToken} from "../../../utils/jwtUtils.js";
import fillDropdownWithDevicetypes from "./fillDropdownDeviceTypes.js";
import fillDropdownDeviceStatus from "./fillDropdownDeviceStatus.js";


const token = getToken()



const url = 'http://localhost:8080/device'

export default async function createDevicePage() {
    // Define the device creation HTML template
    const deviceCreationTemplate = `
        <h2 id="createDeviceHeading">Create Device</h2>
        <form id="createDeviceForm">
            <label for="IMEINumber">IMEI Number(15 char):</label>
            <input type="number" id="IMEINumber" name="IMEINumber" required>

            <label for="SerialNumber">Serial Number:</label>
            <input type="text" id="SerialNumber" name="SerialNumber" required>

            <label for="deviceType">Device Type:</label>
            <select id="deviceType" name="deviceType" required>
                
            </select>

            <label for="deviceModel">Device Model:</label>
            <input type="text" id="deviceModel" name="deviceModel" required>

            <label for="deviceStatus">Device Status:</label>
            <select id="deviceStatus" name="deviceStatus" required>
            
            </select>


            <label for="comments">Comments:</label>
            <textarea id="comments" name="comments"></textarea>

            <button type="button" onclick="submitDevice()" id="createDeviceButton">Create Device</button>
        </form>
    `;

    // Get the container element
    const container = document.getElementById('main-container');


    // Insert the generated HTML into the container
    container.innerHTML = deviceCreationTemplate;
    await fillDropdownWithDevicetypes()
    await fillDropdownDeviceStatus()
}

// Example function for submitting device data
window.submitDevice = async function () {
    const IMEINumberString = document.getElementById('IMEINumber').value;

    // Validate that IMEINumber is numeric and meets any other required criteria
    if (!IMEINumberString.match(/^\d{15}$/)) {
        alert("IMEI Number must be a 15-digit number.");
        return + "L";
    }

    // Convert IMEINumber to a long integer
    const IMEINumber = parseInt(IMEINumberString, 10);

    const formData = {
        imeiNumber: IMEINumber,
        serialNumber: document.getElementById('SerialNumber').value,
        deviceType: document.getElementById('deviceType').value,
        deviceModel: document.getElementById('deviceModel').value,
        deviceStatus: document.getElementById('deviceStatus').value,
        comments: document.getElementById('comments').value
    };

    try {
        // Perform any further processing or send the data to your backend
        console.log(formData);
        const response = await postObjectAsJson(url, formData, "POST", token);

        // Check the response status or perform other logic based on the response
        if (response.ok) {
            alert("Device created successfully");
            window.location.reload();
        } else {
            alert("Failed to create device. Please check the form data and try again.");
        }
    } catch (error) {
        console.error("Error submitting device:", error);
        alert("An error occurred while creating the device. Please try again later.");
    }

}





