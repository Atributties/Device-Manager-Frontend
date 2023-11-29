import NavBar from "../../components/navBar/NavBar.js";

export default function systemAdminNavBar() {
    const additionalLiElements = [
        `<li class="sidebar-brand">
            <a href="#" id="create-user" class="text-light" >Create User</a>
        </li>`,
        `<li class="sidebar-brand">
            <a href="#" id="user-table" class="text-light" >Update User</a>
        </li>`,
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
        `<li class="sidebar-brand">
            <a href="#" id="datacards" class="text-light">Data-Cards</a>
        </li>`,
        `<li class="sidebar-brand">
            <a href="#" id="simcards" class="text-light">Sim-Cards</a>
        </li>`,
    ];
    return NavBar(additionalLiElements);

}
