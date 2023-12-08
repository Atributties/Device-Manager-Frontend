import fetchAnyUrl from "../../../api/fetchAnyUrl.js";
import { getToken } from "../../../utils/jwtUtils.js";
import viewUserDeviceTable from "../table/viewUserDeviceTable.js"; // Import the viewUserDeviceTable function

const deviceUrl = 'http://localhost:8080/device/user';
const simcardUrl = 'http://localhost:8080/simcard/user';
const datacardUrl = 'http://localhost:8080/datacard/user';
const accessToken = getToken();

export default async function getUserDeviceData(userId) {
    if (!userId) {
        console.error("UserId is undefined or not found");
        return;
    }

    try {
        const [devices, simcards, datacards] = await Promise.all([
            fetchAnyUrl(`${deviceUrl}/${userId}`, {}, accessToken),
            fetchAnyUrl(`${simcardUrl}/${userId}`, {}, accessToken),
            fetchAnyUrl(`${datacardUrl}/${userId}`, {}, accessToken)
        ]);

        viewUserDeviceTable(devices, simcards, datacards);
    } catch (error) {
        console.error("Error getting user device data:", error);
    }
}
