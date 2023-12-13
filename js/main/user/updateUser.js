import postObjectAsJson from "../../../api/postObjectAsJson.js";
import fetchAnyUrl from "../../../api/fetchAnyUrl.js";
import {getToken} from "../../../utils/jwtUtils.js";

const url = 'http://localhost:8080/user';
const token = getToken();

export async function updateUser(userId) {
    const updateUrl = url + "/" + userId;
    try {
        const user = await fetchAnyUrl(updateUrl, "PUT", token); // Await the Promise
        updateUserPage(user);
    } catch (error) {
        console.error("Error fetching user:", error);
    }

}

 export function updateUserPage(user) {
     const container = document.getElementById('main-container');
     if (!container) {
         console.error("Update device container not found");
         return;
     }


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
                    <option value="DEVICE_ADMIN" ${user.userType === 'DEVICE_ADMIN' ? 'selected' : ''}>Admin</option>
                    <option value="USER" ${user.userType === 'USER' ? 'selected' : ''}>User</option>
                </select>

                <button type="button" onclick="updateUserSubmit(${user.id})" id="updateUserButton">Update User</button>
            </form>
        `;

    // Insert the generated HTML into the container
    container.innerHTML = userUpdateTemplate;


     // Attach event listener to the button after rendering the form
     document.getElementById('updateUserButton').addEventListener('click', function() {
         updateUserSubmit(user);
     });
}

// Example function for updating user data (you can replace this with your actual logic)
function updateUserSubmit(user) {
    const formData = {
        firstname: document.getElementById('firstname').value,
        middlename: document.getElementById('middlename').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        userType: document.getElementById('userType').value
    };
    const updateUrl = `${url}/${user.id}`;
    postObjectAsJson(updateUrl, formData, "PUT", token).then(() => {
        console.log("User updated successfully");
        // Optionally, you might want to refresh the data or navigate the user to a different page
    }).catch(error => {
        console.error("Error updating user:", error);
    });

    // Perform any further processing or send the data to your backend
    console.log('Updating user with ID:', user.id, 'Data:', formData);
    postObjectAsJson(url + "/" + user.id, formData, "PUT", token)
        .then(response => {
            if (response.ok) {
                alert("User updated successfully");
                // reload
                window.location.reload();
            } else {
                alert("Failed to update user. Status: " + response.status);
            }
        })
        .catch(error => {
            console.error("Error updating user:", error);
            alert("An error occurred while updating the user.");
        });
}