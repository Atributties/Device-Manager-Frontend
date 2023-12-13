
import {getToken} from "../utils/jwtUtils.js";
import fetchAnyUrl from "./fetchAnyUrl.js";

async function fetchStatus() {
    const statusUrl = 'http://localhost:8080/enums/status'
    const accessToken = getToken()
    const status = await fetchAnyUrl(statusUrl, {}, accessToken);

    return status;

}

export default async function fillDropdownStatus(currentStatus){
    // Fetch device types and update the dropdown
    try {
        const status = await fetchStatus();

        const statusDropdown = document.getElementById('status');

        // Populate the dropdown with options
        status.forEach((type) => {
            const option = document.createElement('option');
            option.value = type.enumValue;
            option.text = type.displayName;

            if (type.enumValue === currentStatus) {
                option.selected = true;
            }


            statusDropdown.add(option);
        });
    } catch (error) {
        console.error("Error fetching status types:", error);
        // Handle the error, e.g., display a default option or show an error message
    }
}