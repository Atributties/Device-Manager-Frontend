import fetchAnyUrl from "../../../api/fetchAnyUrl.js";
import createDatacardTabel from "../../table/datacardTabel.js";
import {getToken} from "../../../utils/jwtUtils.js";


const url ='http://localhost:8080/datacard';
const accessToken = getToken()

export default async function getDatacardTable() {
    try {
        const datacardList = await fetchAnyUrl(url, {}, accessToken);
        createDatacardTabel(datacardList);
        console.log(datacardList)
    } catch (error) {
        console.error("Error getting datacard table:", error);
    }
}