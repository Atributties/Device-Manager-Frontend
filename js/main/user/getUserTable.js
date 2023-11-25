import fetchAnyUrl from "../../../api/fetchAnyUrl.js";
import createTable from "../../table/table.js";
import { getToken } from "../../../utils/jwtUtils.js";

export default async function getUserTable() {
    const url = 'http://localhost:8080/user';
    const accessToken = getToken();

    try {
        const userListData = await fetchAnyUrl(url, {}, accessToken);
        createTable(userListData);
    } catch (error) {
        console.error("Error getting user table:", error);
    }
}


