import createUserPage from "../main/user/createUser.js";
import getUserTable from "../main/user/getUserTable.js";
import Main from "../../components/main/Main.js";

export default function setupNavbarListeners() {
    // Listener for "Create User" link
    document.getElementById('create-user')?.addEventListener('click', (event) => {
        event.preventDefault();
        createUserPage();
    });

    // Listener for "User Table" link
    document.getElementById('user-table')?.addEventListener('click', (event) => {
        event.preventDefault();
        clearMainContainer();
        getUserTable();
    });

    document.getElementById('device-manager-link')?.addEventListener('click', (event) => {
        event.preventDefault();
        clearMainContainer();
        document.getElementById('main-container').innerHTML = Main();
    });

    function clearMainContainer() {
        const mainContainer = document.getElementById('main-container');
        mainContainer.innerHTML = ''; // Clear the content
    }

    // Add more listeners as needed for other navbar links
}
