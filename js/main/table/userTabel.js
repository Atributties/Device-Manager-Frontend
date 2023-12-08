import { deleteUser } from '../user/deleteUser.js';
import { updateUser } from '../user/updateUser.js';// Import the new function
import getUserDeviceData from "../device/getDeviceTableUserFromAdmin.js";
export default function createTable(data) {
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

    const desiredFields = ['firstname', 'middlename', 'lastname', 'email', 'userRole'];

    // Create column headers for desired fields
    desiredFields.forEach(field => {
        const th = document.createElement("th");
        th.innerHTML = field;
        headerRow.appendChild(th);
    });

    // Adding headers for update, delete, and view devices
    const updateTh = document.createElement("th");
    updateTh.innerHTML = "Update";
    headerRow.appendChild(updateTh);

    const deleteTh = document.createElement("th");
    deleteTh.innerHTML = "Delete";
    headerRow.appendChild(deleteTh);

    const viewDevicesTh = document.createElement("th");
    viewDevicesTh.innerHTML = "View Devices";
    headerRow.appendChild(viewDevicesTh);

    const tbody = document.createElement("tbody");

    data.forEach(rowData => {
        const row = tbody.insertRow();
        desiredFields.forEach(field => {
            const cell = row.insertCell();
            cell.innerHTML = rowData[field] || ''; // Handle undefined or missing values
        });

        // Add update button
        const updateCell = row.insertCell();
        const updateBtn = document.createElement("button");
        updateBtn.innerHTML = "Update";
        updateBtn.id = "updateButton";
        updateBtn.addEventListener("click", () => updateUser(rowData.id));
        updateCell.appendChild(updateBtn);

        // Add delete button
        const deleteCell = row.insertCell();
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.id = "deleteButton";
        deleteBtn.addEventListener("click", () => deleteUser(rowData.id));
        deleteCell.appendChild(deleteBtn);

        // Add view devices button
        const viewDevicesCell = row.insertCell();
        const viewDevicesBtn = document.createElement("button");
        viewDevicesBtn.innerHTML = "View Devices";
        viewDevicesBtn.id = "viewDevicesButton";
        viewDevicesBtn.addEventListener("click", () => {
            getUserDeviceData(rowData.id); // Use getUserDeviceData here
        });
        viewDevicesCell.appendChild(viewDevicesBtn);
    });

    table.appendChild(tbody);
    mainContainer.appendChild(table);
}


