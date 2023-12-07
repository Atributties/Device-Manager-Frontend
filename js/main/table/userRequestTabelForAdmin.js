import formatDateTime from "../modules/dateTimeFormat.js";
import fetchUserRequestInfo from "../message/createMessageForUserRequest.js";

export default async function createUserRequestsTableForAdmin(data) {

    if (!data || data.length === 0) {
        console.error("No data provided to create table");
        return;
    }

    const mainContainer = document.getElementById("main-container");
    if (!mainContainer) {
        console.error("Main container not found");
        return;
    }

    const table = document.createElement("table");
    table.className = "custom-table";

    const header = table.createTHead();
    const headerRow = header.insertRow();
    const desiredFields = ['id', 'user', 'requestType', 'requestText', 'messages', 'dateCreated'];

    desiredFields.forEach(field => {
        const th = document.createElement("th");
        th.textContent = field.charAt(0).toUpperCase() + field.slice(1); // Capitalize field names
        headerRow.appendChild(th);
    });

    const tbody = table.appendChild(document.createElement("tbody"));

    data.forEach(rowData => {
        const row = tbody.insertRow();
        desiredFields.forEach(field => {
            const cell = row.insertCell();

            if (field ==='user') {
                const dropdownButtonUser = createDropdownButtonForUser(rowData[field], rowData['user'])
                cell.appendChild(dropdownButtonUser)
            } else if (field === 'requestText') {
                // Check if the field is 'requestText' and add a dropdown button
                const dropdownButton = createDropdownButton(rowData[field], rowData['messages']);
                cell.appendChild(dropdownButton);
            } else if (field === 'messages') {
                // Check if the field is 'messages' and add a "Show Messages" button
                const showMessagesButton = createShowMessagesButton(rowData.id);

                cell.appendChild(showMessagesButton);
            }else if (field === 'dateCreated') {
                // Check if the field is 'dateCreated' and format the date using the imported function
                cell.textContent = formatDateTime(rowData[field]);
            }
            else {
                cell.textContent = rowData[field];
            }
        });
    });

    mainContainer.appendChild(table);
}

function createShowMessagesButton(userRequestId) {
    const button = document.createElement("button");
    button.textContent = "Show Messages";
    button.id = "dropdown-buttonUserRequest";
    button.addEventListener("click", function () {
        localStorage.setItem('userRequestID', userRequestId);
        fetchUserRequestInfo(userRequestId)


    });

    return button;
}

function createDropdownButton(text) {
    const button = document.createElement("button");
    button.id = "dropdown-buttonUserRequest";
    button.textContent = "Show Text";

    // Add an event listener to show the text when the button is clicked
    button.addEventListener("click", function (event) {
        showTextDropdown(event, text);
    });

    return button;
}

function showTextDropdown(event, text) {
    // Create a dropdown window to display the entire text
    const dropdown = document.createElement("div");
    dropdown.id = "text-dropdownUserRequest";

    const content = document.createElement("div");
    content.textContent = text;

    dropdown.appendChild(content);

    // Position the dropdown directly below the button
    const rect = event.target.getBoundingClientRect();
    dropdown.style.position = "absolute";
    dropdown.style.top = rect.bottom + "px";
    dropdown.style.left = rect.left + "px";

    // Add an event listener to close the dropdown when clicking outside
    document.addEventListener("click", function closeDropdown(e) {
        if (!dropdown.contains(e.target) && e.target !== event.target) {
            document.removeEventListener("click", closeDropdown);
            dropdown.remove();
        }
    });

    document.body.appendChild(dropdown);
}

function createDropdownButtonForUser(user) {
    const button = document.createElement("button");
    button.id = "dropdown-buttonUser";
    button.textContent = user.email;

    // Add an event listener to show the user info when the button is clicked
    button.addEventListener("click", function (event) {
        showUserDropdownForUser(event, user);
    });

    return button;
}

function showUserDropdownForUser(event, user) {
    // Create a dropdown window to display the selected user information
    const dropdown = document.createElement("div");
    dropdown.id = "user-info-dropdown";

    // Display only selected user properties in the dropdown
    const selectedProperties = ['id', 'firstname', 'middlename', 'lastname', 'email', 'userRole', 'username'];

    selectedProperties.forEach(property => {
        const propertyContainer = document.createElement("div");

        const propertyKey = document.createElement("span");
        propertyKey.className = "property-key"; // Add the class
        propertyKey.textContent = `${property}:`;

        const propertyValue = document.createElement("span");
        propertyValue.className = "property-value"; // Add the class
        propertyValue.textContent = ` ${user[property]}`;

        propertyContainer.appendChild(propertyKey);
        propertyContainer.appendChild(propertyValue);
        dropdown.appendChild(propertyContainer);
    });

    // Position the dropdown directly below the button
    const rect = event.target.getBoundingClientRect();
    dropdown.style.position = "absolute";
    dropdown.style.top = rect.bottom + "px";
    dropdown.style.left = rect.left + "px";

    // Add an event listener to close the dropdown when clicking outside
    document.addEventListener("click", function closeDropdown(e) {
        if (!dropdown.contains(e.target) && e.target !== event.target) {
            document.removeEventListener("click", closeDropdown);
            dropdown.remove();
        }
    });

    document.body.appendChild(dropdown);
}