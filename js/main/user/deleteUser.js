import postObjectAsJson from "../../../api/postObjectAsJson.js";
import {getToken} from "../../../utils/jwtUtils.js";

const url = 'http://localhost:8080/user';
const token = getToken()

export async function deleteUser(userId) {
    const isConfirmed = confirm(`Are you sure you want to delete this user?`);
    if (!isConfirmed) {
        return; // Stop the function if the user clicks "Cancel"
    }
    const updateUrl = url + "/" + userId;
    try {
        await postObjectAsJson(updateUrl, {}, "DELETE", token);
        //reload
        window.location.reload();

    } catch (error) {
        console.error("Error deleting user:", error);
    }

}