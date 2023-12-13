import {getToken} from "../../../utils/jwtUtils.js";
import fetchAnyUrl from "../../../api/fetchAnyUrl.js";

async function fetchUserRoles() {
    const userRolesUrl = 'http://localhost:8080/enums/userRoles'
    const accessToken = getToken()
    const userRoles = await fetchAnyUrl(userRolesUrl, {}, accessToken);

    return userRoles;

}

export default async function fillDropdownUserRoles(){
    // Fetch user types and update the dropdown
    try {
        const userRoles = await fetchUserRoles();

        const userRolesDropdown = document.getElementById('userRole');

        // Populate the dropdown with options
        userRoles.forEach((type) => {
            const option = document.createElement('option');
            option.value = type.enumValue;
            option.text = type.displayName;
            userRolesDropdown.add(option);
        });
    } catch (error) {
        console.error("Error fetching user roles:", error);
        // Handle the error, e.g., display a default option or show an error message
    }
}