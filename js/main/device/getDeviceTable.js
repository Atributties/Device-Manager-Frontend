
import fetchAnyUrl from "../../../api/fetchAnyUrl.js";
import createDeviceTable from "../table/deviceTabel.js";
import {getToken} from "../../../utils/jwtUtils.js";


const url ='http://localhost:8080/device';
const accessToken = getToken()

export default async function getDeviceTable() {
    try {
        const deviceList = await fetchAnyUrl(url, {}, accessToken);
        createDeviceTable(deviceList);
        console.log(deviceList)
    } catch (error) {
        console.error("Error getting device table:", error);
    }
}