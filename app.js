// app.js

import loadLogin from "./utils/login.js";
import updateNavbarForRole from "./js/navBar/fillNavBar.js";




async function initializeApp() {
    // Check if the user is already logged in
    const storedRole = localStorage.getItem('userRole');

    if (storedRole) {
        // If the role is stored, the user is already logged in
        updateNavbarForRole(storedRole);
    } else {
        // If the role is not stored, the user needs to log in
        await loadLogin();
        const newRole = localStorage.getItem('userRole');
        updateNavbarForRole(newRole);
    }
}


initializeApp();















