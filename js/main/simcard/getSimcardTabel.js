import {getToken} from "../../../utils/jwtUtils.js";
import fetchAnyUrl from "../../../api/fetchAnyUrl.js";
import createSimcardTabel from "../table/simcardTabel.js";

const url ='http://localhost:8080/simcard';
const accessToken = getToken()

export default async function getSimcardTabel() {
    try {
        const datacardList = await fetchAnyUrl(url, {}, accessToken);
        createSimcardTabel(datacardList);
        console.log(datacardList)
    } catch (error) {
        console.error("Error getting datacard table:", error);
    }
}