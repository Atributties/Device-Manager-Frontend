import {getToken} from "../../../utils/jwtUtils.js";
import fetchAnyUrl from "../../../api/fetchAnyUrl.js";

async function fetchUserTypes() {
    const usertypesUrl = 'http://localhost:8080/enums/usertypes'
    const accessToken = getToken()
    const usertypes = await fetchAnyUrl(usertypesUrl, {}, accessToken);

    return usertypes;

}

export default async function fillDropdownUserTypes(){
    // Fetch user types and update the dropdown
    try {
        const usertypes = await fetchUserTypes();

        const userTypesDropdown = document.getElementById('userType');

        // Populate the dropdown with options
        usertypes.forEach((type) => {
            const option = document.createElement('option');
            option.value = type.enumValue;
            option.text = type.displayName;
            userTypesDropdown.add(option);
        });
    } catch (error) {
        console.error("Error fetching device types:", error);
        // Handle the error, e.g., display a default option or show an error message
    }
}