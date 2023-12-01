
import {getToken} from "../../../utils/jwtUtils.js";
import fetchAnyUrl from "../../../api/fetchAnyUrl.js";

async function fetchDeviceStatus() {
    const deviceStatusUrl = 'http://localhost:8080/enums/devicestatus'
    const accessToken = getToken()
    const deviceStatus = await fetchAnyUrl(deviceStatusUrl, {}, accessToken);

    return deviceStatus;

}

export default async function fillDropdownDeviceStatus(){
    // Fetch device types and update the dropdown
    try {
        const deviceStatus = await fetchDeviceStatus();

        const deviceStatusDropdown = document.getElementById('deviceStatus');

        // Populate the dropdown with options
        deviceStatus.forEach((type) => {
            const option = document.createElement('option');
            option.value = type.enumValue;
            option.text = type.displayName;
            deviceStatusDropdown.add(option);
        });
    } catch (error) {
        console.error("Error fetching device types:", error);
        // Handle the error, e.g., display a default option or show an error message
    }
}