import NavBar from "../../components/navBar/NavBar.js";

export default function adminNavBar() {
    const additionalLiElements = [
        `<li class="sidebar-brand">
            <a href="#" class="text-light">admin</a>
        </li>`,
    ];

    return NavBar(additionalLiElements);
}