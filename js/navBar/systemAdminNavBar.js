import NavBar from "../../components/navBar/NavBar.js";


export default function systemAdminNavBar(routes) {


    const additionalLiElements = [
        `<li class="sidebar-brand">
            <a href="#" class="text-light" >Create User</a>
        </li>`,
    ];
    return NavBar(additionalLiElements);
}