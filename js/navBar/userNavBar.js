import NavBar from "../../components/navBar/NavBar.js";

export default function userNavBar() {
    const additionalLiElements = [
        `<li class="sidebar-brand">
            <a href="#" class="text-light">User</a>
        </li>`,
    ];

    return NavBar(additionalLiElements);
}