import adminNavBar from "./adminNavBar.js";
import systemAdminNavBar from "./systemAdminNavBar.js";
import userNavBar from "./userNavBar.js";
import defaultNavBar from "./defaultNavBar.js";

export default function fillNavBar(user){
    let navBarHtml;

    switch (user.role) {
        case "SYSTEM_ADMIN":
            navBarHtml = systemAdminNavBar();
            break;

        case "DEVICE_ADMIN":
            navBarHtml = adminNavBar();
            break;

        case "USER":
            navBarHtml = userNavBar();
            break;

        default:
            navBarHtml = defaultNavBar();
            break;
    }

    return navBarHtml;
}

