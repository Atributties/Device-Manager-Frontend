import createUserPage from "../main/user/createUser.js";
import getUserTable from "../main/user/getUserTable.js";
import Main from "../../components/main/Main.js";
import createDevicePage from "../main/device/createDevice.js";
import getDeviceTable from "../main/device/getDeviceTable.js";

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

    document.getElementById('employees')?.addEventListener('click', (event) => {
        event.preventDefault();
        clearMainContainer();
        getUserTable();
    });

    document.getElementById('device-manager-link')?.addEventListener('click', (event) => {
        event.preventDefault();
        clearMainContainer();
        document.getElementById('main-container').innerHTML = Main();
    });

    document.getElementById('devices')?.addEventListener('click', (event) => {
        event.preventDefault();
        clearMainContainer();
        getDeviceTable();
    });

    document.getElementById('create-device')?.addEventListener('click', (event) => {
        event.preventDefault();
        clearMainContainer();
        createDevicePage();
    });

    document.getElementById('update-device')?.addEventListener('click', (event) => {
        event.preventDefault();
        clearMainContainer();
    });

    function clearMainContainer() {
        const mainContainer = document.getElementById('main-container');
        mainContainer.innerHTML = ''; // Clear the content
    }

    // Add more listeners as needed for other navbar links
}
