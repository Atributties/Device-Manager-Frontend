import fetchAnyUrl from "../../../api/fetchAnyUrl.js";
import createUserRequestsTable from "../table/userRequestTable.js"; // Ensure this path is correct
import { getToken } from "../../../utils/jwtUtils.js";

export default async function getUserRequestsTable() {
    const userId = localStorage.getItem('userID'); // Ensure this is the correct key for the user ID
    const url = `http://localhost:8080/api/chat/user/${userId}/user-requests`;
    const accessToken = getToken();

    try {
        const userRequestsList = await fetchAnyUrl(url, {}, accessToken);
        await createUserRequestsTable(userRequestsList);
        console.log(userRequestsList);
    } catch (error) {
        console.error("Error getting user requests table:", error);
    }
}

