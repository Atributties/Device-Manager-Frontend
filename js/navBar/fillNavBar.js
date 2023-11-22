import adminNavBar from "./adminNavBar.js";
import systemAdminNavBar from "./systemAdminNavBar.js";
import userNavBar from "./userNavBar.js";

export default function fillNavBar(user){
    let navBarHtml;

    switch (user.role) {
        case "ROLE_SYSTEM_ADMIN":
            navBarHtml = systemAdminNavBar();
            break;

        case "ROLE_ADMIN":
            navBarHtml = adminNavBar();
            break;

        case "ROLE_USER":
            navBarHtml = userNavBar();
            break;

        default:
            navBarHtml = userNavBar();
            break;

    }
    return navBarHtml;
}

