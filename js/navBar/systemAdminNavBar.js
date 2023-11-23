import NavBar from "../../components/navBar/NavBar.js";

export default function systemAdminNavBar(routes) {
    const additionalLiElements = [
        `<li class="sidebar-brand">
            <a href="#" class="text-light" id="create-user-link">Create User</a>
        </li>`,
        `<li class="sidebar-brand">
            <a href="#" class="text-light" id="logout-link">Logout</a>
        </li>`
    ];
    return NavBar(additionalLiElements);
}
