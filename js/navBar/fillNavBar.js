import adminNavBar from "./adminNavBar.js";
import systemAdminNavBar from "./systemAdminNavBar.js";
import userNavBar from "./userNavBar.js";
import getDeviceTableUser from "../main/device/getDeviceTableUser.js";

// Function to update the navbar based on the role
export default async function updateNavbarForRole(role) {
    let navbarContainer = document.getElementById("navbar-container");
    let mainContainer = document.getElementById("main-container");
    if (navbarContainer) {
        switch (role) {
            case "SYSTEM_ADMIN":
                navbarContainer.innerHTML = systemAdminNavBar();
                break;

            case "DEVICE_ADMIN":
                navbarContainer.innerHTML = adminNavBar();
                break;

            case "USER":
                navbarContainer.innerHTML = userNavBar();
                mainContainer.innerHTML = getDeviceTableUser();
                break;

            default:
                // If the role is not recognized, redirect to login
                window.location.href = "path/to/login/page"; // Update this with the actual path
                break;
        }
    }
}

