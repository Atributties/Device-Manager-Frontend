import NavBar from "../../components/navBar/NavBar.js";

export default function userNavBar() {
    const additionalLiElements = [
        `<li class="sidebar-brand">
            <a href="#" id="user-devices" class="text-light">My devices</a>
        </li>`,
        `<li class="sidebar-brand">
            <a href="#" id="user-request" class="text-light">Request</a>
        </li>`,
    ];

    return NavBar(additionalLiElements);
}