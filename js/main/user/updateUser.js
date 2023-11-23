import postObjectAsJson from "../../../api/postObjectAsJson.js";
import fetchAnyUrl from "../../../api/fetchAnyUrl.js";
import {getToken} from "../../../utils/jwtUtils.js";

const url = 'http://localhost:8080/user';
const token = getToken();

async function fetchUserById(userId) {
    const updateUrl = url + "/" + userId;
    try {
        const user = await fetchAnyUrl(updateUrl, token); // Await the Promise
        updateUserPage(user);
    } catch (error) {
        console.error("Error fetching user:", error);
    }


}

export default function updateUserPage(user) {
    // Get the container element
    const container = document.getElementById('update-user');

    // Define the user update HTML template with pre-filled data
    const userUpdateTemplate = `
            <h2 id="updateUserHeading">Update User</h2>
            <form id="updateUserForm">
                <label for="firstname">First Name:</label>
                <input type="text" id="firstname" name="firstname" value="${user.firstname}" required>

                <label for="middlename">Middle Name:</label>
                <input type="text" id="middlename" name="middlename" value="${user.middlename}">

                <label for="lastname">Last Name:</label>
                <input type="text" id="lastname" name="lastname" value="${user.lastname}" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="${user.email}" required>

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" value="${user.password}" required>

                <label for="userType">User Type:</label>
                <select id="userType" name="userType" required>
                    <option value="ADMIN" ${user.userType === 'ADMIN' ? 'selected' : ''}>Admin</option>
                    <option value="USER" ${user.userType === 'USER' ? 'selected' : ''}>User</option>
                </select>

                <button type="button" onclick="updateUser(${user})" id="updateUserButton">Update User</button>
            </form>
        `;

    // Insert the generated HTML into the container
    container.innerHTML = userUpdateTemplate;
}

// Example function for updating user data (you can replace this with your actual logic)
function updateUser(user) {
    const formData = {
        firstname: document.getElementById('firstname').value,
        middlename: document.getElementById('middlename').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        userType: document.getElementById('userType').value
    };

    // Perform any further processing or send the data to your backend
    console.log('Updating user with ID:', user.id, 'Data:', formData);
    postObjectAsJson(url + user.id, formData, "PUT", token)
}