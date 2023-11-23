// app.js

import loadLogin from "./utils/login.js";
import updateNavbarForRole from "./js/navBar/fillNavBar.js";
import getUserTable from "./js/main/user/getUserTable.js";


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
}

//const testButton = document.getElementById("test-button")
//testButton.addEventListener('click', getUserTable)


initializeApp();















