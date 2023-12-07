import createUserPage from "../main/user/createUser.js";
import getUserTable from "../main/user/getUserTable.js";
import createDevicePage from "../main/device/createDevice.js";
import getDeviceTable from "../main/device/getDeviceTable.js";
import createSimCardPage from "../main/simcard/createSimcard.js";
import createDataCardPage from "../main/datacard/createDatacard.js";
import getDatacardTable from "../main/datacard/getDatacardTable.js";
import getSimcardTabel from "../main/simcard/getSimcardTabel.js";
import fetchAllData from "../main/dataInformation/barChartAllData.js";
import getDeviceTableUser from "../main/device/getDeviceTableUser.js";
import createUserRequestPage from "../main/user/createUserRequest.js";
import getUserRequestsTable from "../main/user/getUserRequestTable.js";

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
    document.getElementById("device-manager-link")?.addEventListener("click", (event) => {
        event.preventDefault();
        clearMainContainer();
        fetchAllData();
    });

    document.getElementById("user-devices")?.addEventListener("click", (event) => {
        event.preventDefault();
        clearMainContainer();
        getDeviceTableUser();
    });

    document.getElementById("user-request")?.addEventListener("click", (event) => {
        event.preventDefault();
        clearMainContainer();
        createUserRequestPage();
    });

    document.getElementById("view-user-request")?.addEventListener("click", (event) => {
        event.preventDefault();
        clearMainContainer();
        getUserRequestsTable();
    });

    function clearMainContainer() {
        const mainContainer = document.getElementById('main-container');
        mainContainer.innerHTML = ''; // Clear the content
    }

}
