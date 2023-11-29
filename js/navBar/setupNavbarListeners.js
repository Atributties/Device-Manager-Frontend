import createUserPage from "../main/user/createUser.js";
import getUserTable from "../main/user/getUserTable.js";
import Main from "../../components/main/Main.js";
import createDevicePage from "../main/device/createDevice.js";
import getDeviceTable from "../main/device/getDeviceTable.js";
import createSimCardPage from "../main/simcard/createSimcard.js";
import createDataCardPage from "../main/datacard/createDatacard.js";
import getDatacardTable from "../main/datacard/getDatacardTable.js";
import getSimcardTabel from "../main/simcard/getSimcardTabel.js";

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

    document.getElementById("update-user")?.addEventListener("click", (event) => {
        event.preventDefault();
        clearMainContainer();
    });
    document.getElementById('create-simCard')?.addEventListener("click", (event) => {
        event.preventDefault();
        createSimCardPage();
    });
    document.getElementById("create-dataCard")?.addEventListener("click", (event) => {
        event.preventDefault();
        createDataCardPage();

    });
    document.getElementById("datacards")?.addEventListener("click", (event) => {
        event.preventDefault();
        clearMainContainer();
        getDatacardTable();

    });
    document.getElementById("simcards")?.addEventListener("click", (event) => {
        event.preventDefault();
        clearMainContainer();
        getSimcardTabel();

    });

    function clearMainContainer() {
        const mainContainer = document.getElementById('main-container');
        mainContainer.innerHTML = ''; // Clear the content
    }

    // Add more listeners as needed for other navbar links
}
