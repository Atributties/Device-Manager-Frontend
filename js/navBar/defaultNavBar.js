import NavBar from "../../components/navBar/NavBar.js";

export default function defaultNavBar() {
    const additionalLiElements = [
        `<li class="sidebar-brand">
            <a href="#" id="login-link" class="text-light">Login</a>
        </li>`,
    ];

    return NavBar(additionalLiElements);
}