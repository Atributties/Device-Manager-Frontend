// In getUserDataTables.js

import fetchAnyUrl from "../../../api/fetchAnyUrl.js";
import { getToken } from "../../../utils/jwtUtils.js";
import createUserTables from "../table/deviceUserTable.js";

const deviceUrl = 'http://localhost:8080/device/user';
const simcardUrl = 'http://localhost:8080/simcard/user';
const datacardUrl = 'http://localhost:8080/datacard/user';
const accessToken = getToken();

export default async function getUserDataTables() {
    const userId = localStorage.getItem('userID');
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

        createUserTables(devices, simcards, datacards);
    } catch (error) {
        console.error("Error getting user data:", error);
    }
}

