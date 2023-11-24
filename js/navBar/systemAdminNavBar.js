import NavBar from "../../components/navBar/NavBar.js";



export default function systemAdminNavBar() {
    const additionalLiElements = [
        `<li class="sidebar-brand">
            <a href="#" class="text-light" id="create-user-link">Create User</a>
        </li>`,
        `<li class="sidebar-brand">
            <a href="#" class="text-light" id="user-table">User Table</a>
        </li>`
    ];
    return NavBar(additionalLiElements);

}
