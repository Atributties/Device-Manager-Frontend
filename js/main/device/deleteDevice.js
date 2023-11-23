import postObjectAsJson from "../../../api/postObjectAsJson.js";
import {getToken} from "../../../utils/jwtUtils.js";

const url = 'http://localhost:8080/device';
const token = getToken()

async function deleteUser(deviceId) {
    const updateUrl = url + "/" + deviceId;
    try {
        await postObjectAsJson(updateUrl, {}, "DELETE", token); // Await the Promise

    } catch (error) {
        console.error("Error deleting device:", error);
    }

}