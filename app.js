// app.js

import loadLogin from "./utils/login.js";
import updateNavbarForRole from "./js/navBar/fillNavBar.js";
import logout from './utils/logout.js';
import getUserTable from "./js/main/user/getUserTable.js";
import setupNavbarListeners from "./js/navBar/setupNavbarListeners.js";


const SESSION_TIMEOUT = 60 * 60 * 1000;

async function initializeApp() {
    // Check if the user is already logged in
    const storedRole = localStorage.getItem('userRole');
    const loginTime = localStorage.getItem('loginTime');

    if (storedRole && loginTime && Date.now() - loginTime < SESSION_TIMEOUT) {
        // If the role is stored, the user is already logged in
        await handleLoggedInUser(storedRole);
    } else {
        // If the role is not stored, the user needs to log in
        await handleLoggedOutUser();
    }

    setupNavbarListeners();
    await getUserTable();
    window.logout = logout;
}

async function handleLoggedInUser(role) {
    await updateNavbarForRole(role);
}

async function handleLoggedOutUser() {
    await loadLogin();
    const newRole = localStorage.getItem('userRole');
    await updateNavbarForRole(newRole);
}

function updateLoginTime() {
    localStorage.setItem('loginTime', Date.now());
}

initializeApp();
updateLoginTime();














