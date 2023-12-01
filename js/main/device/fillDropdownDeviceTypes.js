
import {getToken} from "../../../utils/jwtUtils.js";
import fetchAnyUrl from "../../../api/fetchAnyUrl.js";

async function fetchDeviceType() {
    const deviceTypeUrl = 'http://localhost:8080/enums/devicetypes'
    const accessToken = getToken()
    const devicetypes = await fetchAnyUrl(deviceTypeUrl, {}, accessToken);

    console.log("fetch" + devicetypes)
    return devicetypes;

}

export default async function fillDropdownWithDevicetypes() {
    // Fetch device types and update the dropdown
    try {
        const deviceTypes = await fetchDeviceType(); // Assuming this function returns a list of device types

        // Get the deviceType dropdown element
        const deviceTypeDropdown = document.getElementById('deviceType');

        // Populate the dropdown with options
        deviceTypes.forEach((type) => {
            const option = document.createElement('option');
            option.value = type.enumValue; // Set the enum value as the option value
            option.text = type.displayName; // Set the display name as the option text
            deviceTypeDropdown.add(option);
        });
    } catch (error) {
        console.error("Error fetching device types:", error);
        // Handle the error, e.g., display a default option or show an error message
    }
}