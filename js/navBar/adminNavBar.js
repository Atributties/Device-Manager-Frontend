import NavBar from "../../components/navBar/NavBar.js";

export default function adminNavBar() {
    const additionalLiElements = [
        `<li class="sidebar-brand">
            <a href="#" id="employees" class="text-light">Employees</a>
        </li>`,
        `<li class="sidebar-brand">
            <a href="#" id="devices" class="text-light">Devices</a>
        </li>`,
        `<li class="sidebar-brand">
            <a href="#" id="create-device" class="text-light">Create Device</a>
        </li>`,
        `<li class="sidebar-brand">
            <a href="#" id="create-simCard" class="text-light">Create Sim-Card</a>
        </li>`,
        `<li class="sidebar-brand">
            <a href="#" id="create-dataCard" class="text-light">Create Data-Card</a>
        </li>`,
    ];

    return NavBar(additionalLiElements);
}