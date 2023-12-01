import {getToken} from "../../../utils/jwtUtils.js";
import postObjectAsJson from "../../../api/postObjectAsJson.js";

const url = 'http://localhost:8080/simcard';
const token = getToken();

export default async function deleteSimcard(simcardId) {
    // Confirmation dialog
    const isConfirmed = confirm(`Are you sure you want to delete this Sim-Card with ID: ${simcardId}?`);
    if (!isConfirmed) {
        return; // Stop the function if the user clicks "Cancel"
    }

    const deleteUrl = url + "/" + simcardId;
    try {
        const response = await postObjectAsJson(deleteUrl, {}, "DELETE", token);

        if (response.ok) {
            alert("Sim-Card deleted successfully");
            window.location.reload();
        } else {
            alert("Failed to delete Sim-Card. Status: " + response.status);
        }
    } catch (error) {
        alert("Error deleting Sim-Card: " + error.message);
    }
}