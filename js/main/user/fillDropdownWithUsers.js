import {fetchUsers} from "../../../api/fetchUsers.js";

export default async function fillDropdownWithUsers(currentUserId) {
    try {
        const users = await fetchUsers();

        const usersDropdown = document.getElementById('users');

        // Clear existing options
        usersDropdown.innerHTML = '';

        // Add a "None" option
        const noneOption = document.createElement('option');
        noneOption.value = 'None';
        noneOption.textContent = 'None';
        usersDropdown.add(noneOption);

        // Populate the dropdown with users
        users.forEach((user) => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.email;

            // Set 'selected' attribute if the user ID matches the current user
            if (user.id === currentUserId) {
                option.selected = true;
            }

            usersDropdown.add(option);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        // Handle the error, e.g., display a default option or show an error message
    }
}