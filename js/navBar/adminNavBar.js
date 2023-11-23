import NavBar from "../../components/navBar/NavBar.js";

export default function adminNavBar() {
    const additionalLiElements = [
        `<li class="sidebar-brand">
            <a href="#" class="text-light">Employees</a>
        </li>`,
        `<li class="sidebar-brand">
            <a href="#" class="text-light">Devices</a>
        </li>`,
        `<li class="sidebar-brand">
            <a href="#" class="text-light">Create Device</a>
        </li>`,
        `<li class="sidebar-brand">
            <a href="#" class="text-light">Update Device</a>
        </li>`,
    ];

    return NavBar(additionalLiElements);
}