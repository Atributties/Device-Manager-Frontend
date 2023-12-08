import { getToken } from "../utils/jwtUtils.js";
import fetchAnyUrl from "./fetchAnyUrl.js";

async function fetchRequestTypes() {
    const requestTypesUrl = 'http://localhost:8080/enums/requestType' // Adjust this URL to your actual endpoint
    const accessToken = getToken();
    const requestTypes = await fetchAnyUrl(requestTypesUrl, {}, accessToken);

    return requestTypes;
}

export default async function fillDropdownRequestTypes(currentRequestType) {
    // Fetch request types and update the dropdown
    try {
        const requestTypes = await fetchRequestTypes();

        const requestTypeDropdown = document.getElementById('requestType'); // Adjust the ID to match your dropdown

        // Populate the dropdown with options
        requestTypes.forEach((type) => {
            const option = document.createElement('option');
            option.value = type.enumValue;
            option.text = type.displayName;

            if (type.enumValue === currentRequestType) {
                option.selected = true;
            }

            requestTypeDropdown.add(option);
        });
    } catch (error) {
        console.error("Error fetching request types:", error);
        // Handle the error appropriately
    }
}
