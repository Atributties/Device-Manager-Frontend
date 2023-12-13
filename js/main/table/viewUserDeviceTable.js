import deleteDevice from "../device/deleteDevice.js";
import updateDevice from "../device/updateDevice.js";

export default function viewUserDeviceTable(deviceData, simcardData, datacardData) {
    const mainContainer = document.getElementById("main-container");
    if (!mainContainer) {
        console.error("Main container not found");
        return;
    }

    mainContainer.innerHTML = '';

    const appendTableWithActionsAndTitle = (title, data, fields) => {
        // Add title
        const titleElement = document.createElement("h2");
        titleElement.textContent = title;
        mainContainer.appendChild(titleElement);

        // Create and append table
        const table = createTableWithActions(data, fields);
        mainContainer.appendChild(table);
    };

    // Function to create a table with update and delete buttons
    const createTableWithActions = (data, fields) => {
        const table = document.createElement("table");
        table.className = "custom-table";

        const header = table.createTHead();
        const headerRow = header.insertRow();

        // Create column headers
        fields.forEach(field => {
            const th = document.createElement("th");
            th.textContent = field.charAt(0).toUpperCase() + field.slice(1);
            headerRow.appendChild(th);
        });

        // Headers for actions
        const updateTh = document.createElement("th");
        updateTh.textContent = "Update";
        headerRow.appendChild(updateTh);

        const deleteTh = document.createElement("th");
        deleteTh.textContent = "Delete";
        headerRow.appendChild(deleteTh);

        const tbody = document.createElement("tbody");

        // Create rows with data and action buttons
        data.forEach(rowData => {
            const row = tbody.insertRow();
            fields.forEach(field => {
                const cell = row.insertCell();
                cell.textContent = rowData[field] || '';
            });

            // Update button
            const updateCell = row.insertCell();
            const updateButton = document.createElement("button");
            updateButton.textContent = "Update";
            updateButton.id = "updateButton";
            updateButton.onclick = () => updateDevice(rowData.id);
            updateCell.appendChild(updateButton);

            // Delete button
            const deleteCell = row.insertCell();
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.id = "deleteButton";
            deleteButton.onclick = () => deleteDevice(rowData.id);
            deleteCell.appendChild(deleteButton);
        });

        table.appendChild(tbody);
        return table;
    };

    // Append tables for devices, simcards, and datacards
    if (deviceData.length > 0) {
        const deviceFields = ['id', 'imeiNumber', 'serialNumber', 'deviceType', 'deviceModel', 'status', 'comments', 'dateCreated', 'lastUpdated'];
        appendTableWithActionsAndTitle("Devices", deviceData, deviceFields);
    }

    if (simcardData.length > 0) {
        const simcardFields = ['id', 'phoneNumber', 'iccidNumber', 'pin', 'puk', 'status'];
        appendTableWithActionsAndTitle("Simcards", simcardData, simcardFields);
    }

    if (datacardData.length > 0) {
        const datacardFields = ['id', 'iccidNumber', 'pin', 'puk', 'status'];
        appendTableWithActionsAndTitle("Datacards", datacardData, datacardFields);
    }

    if (!deviceData.length && !simcardData.length && !datacardData.length) {
        const noDataMessage = document.createElement("h2");
        noDataMessage.textContent = "No devices, simcards, or datacards available";
        mainContainer.appendChild(noDataMessage);
    }
}

// Remember to adjust the import paths to match your project structure
