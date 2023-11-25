// app.js

import loadLogin from "./utils/login.js";
import updateNavbarForRole from "./js/navBar/fillNavBar.js";
import logout from './utils/logout.js';
import getUserTable from "./js/main/user/getUserTable.js";
import createUserPage from "./js/main/user/createUser.js";
import getDeviceTable from "./js/main/device/getDeviceTable.js";
import createDevicePage from "./js/main/device/createDevice.js";
import setupNavbarListeners from "./js/navBar/setupNavbarListeners.js";
import Main from "./components/main/Main.js";


async function initializeApp() {
    // Check if the user is already logged in
    const storedRole = localStorage.getItem('userRole');

    if (storedRole) {
        // If the role is stored, the user is already logged in
        await updateNavbarForRole(storedRole);
    } else {
        // If the role is not stored, the user needs to log in
        await loadLogin();
        const newRole = localStorage.getItem('userRole');
        await updateNavbarForRole(newRole);
    }
    setupNavbarListeners();
    await getUserTable();
    document.getElementById('main-container').innerHTML = Main();
    window.logout = logout;

}

//Test for show table

//const testButton = document.getElementById("test-button")
//testButton.addEventListener('click', getDeviceTable)

//Test for show create userform
//const createUser = document.getElementById("createUserBTN")
//createUser.addEventListener('click', createDevicePage)

initializeApp();















