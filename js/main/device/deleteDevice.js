import postObjectAsJson from "../../../api/postObjectAsJson.js";
import {getToken} from "../../../utils/jwtUtils.js";

const url = 'http://localhost:8080/device';
const token = getToken();

export default async function deleteDevice(deviceId) {
    // Confirmation dialog
    const isConfirmed = confirm(`Are you sure you want to delete this device with ID: ${deviceId}?`);
    if (!isConfirmed) {
        return; // Stop the function if the user clicks "Cancel"
    }

    const deleteUrl = url + "/" + deviceId;
    try {
        const response = await postObjectAsJson(deleteUrl, {}, "DELETE", token);

        if (response.ok) {
            alert("Device deleted successfully");
            window.location.reload();
        } else {
            alert("Failed to delete device. Status: " + response.status);
        }
    } catch (error) {
        alert("Error deleting device: " + error.message);
    }
}

