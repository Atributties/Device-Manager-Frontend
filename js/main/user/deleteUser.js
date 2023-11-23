import postObjectAsJson from "../../../api/postObjectAsJson.js";
import {getToken} from "../../../utils/jwtUtils.js";

const url = 'http://localhost:8080/user';
const token = getToken()

async function deleteUser(userId) {
    const updateUrl = url + "/" + userId;
    try {
        await postObjectAsJson(updateUrl, {}, "DELETE", token); // Await the Promise

    } catch (error) {
        console.error("Error deleting user:", error);
    }

}