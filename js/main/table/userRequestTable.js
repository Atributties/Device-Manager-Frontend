

export default async function createUserRequestsTable(data) {
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
    const desiredFields = ['id', 'requestType', 'requestText', 'messages', 'dateCreated'];

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
            if (field === 'requestText') {
                // Check if the field is 'requestText' and add a dropdown button
                const dropdownButton = createDropdownButton(rowData[field], rowData['messages']);
                cell.appendChild(dropdownButton);
            } else if (field === 'messages') {
                // Check if the field is 'messages' and add a "Show Messages" button
                const showMessagesButton = createShowMessagesButton(rowData[field]);
                cell.appendChild(showMessagesButton);
            } else {
                cell.textContent = rowData[field];
            }
        });
    });

    mainContainer.appendChild(table);
}

function createShowMessagesButton(messages) {
    const button = document.createElement("button");
    button.textContent = "Show Messages";
    button.id = "dropdown-buttonUserRequest";
    button.addEventListener("click", function () {

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
