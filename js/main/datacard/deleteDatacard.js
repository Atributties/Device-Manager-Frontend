import {getToken} from "../../../utils/jwtUtils.js";
import postObjectAsJson from "../../../api/postObjectAsJson.js";

const url = 'http://localhost:8080/datacard';
const token = getToken();

export default async function deleteDatacard(datacardId) {
    // Confirmation dialog
    const isConfirmed = confirm(`Are you sure you want to delete this Data-Card with ID: ${datacardId}?`);
    if (!isConfirmed) {
        return; // Stop the function if the user clicks "Cancel"
    }

    const deleteUrl = url + "/" + datacardId;
    try {
        const response = await postObjectAsJson(deleteUrl, {}, "DELETE", token);

        if (response.ok) {
            alert("Data-Card deleted successfully");
            window.location.reload();
        } else {
            alert("Failed to delete Data-Card. Status: " + response.status);
        }
    } catch (error) {
        alert("Error deleting Data-Card: " + error.message);
    }
}