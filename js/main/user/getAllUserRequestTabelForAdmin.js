import fetchAnyUrl from "../../../api/fetchAnyUrl.js";
import { getToken } from "../../../utils/jwtUtils.js";
import createUserRequestsTableForAdmin from "../table/userRequestTabelForAdmin.js";

export default async function getAllUserRequestsTabelForAdmin() {
    const url = `http://localhost:8080/api/chat/admin/user-requests`;
    const accessToken = getToken();

    try {
        const userRequestsList = await fetchAnyUrl(url, {}, accessToken);
        await createUserRequestsTableForAdmin(userRequestsList);
        console.log(userRequestsList);
    } catch (error) {
        console.error("Error getting user requests table:", error);
    }
}