// fetchUsers.js
import fetchAnyUrl from "./fetchAnyUrl.js";
import { getToken } from "../utils/jwtUtils.js";

export async function fetchUsers() {
    const url = 'http://localhost:8080/user';
    const accessToken = getToken();

    try {
        const response = await fetchAnyUrl(url, {}, accessToken);
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}
