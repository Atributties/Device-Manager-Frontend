import deleteDevice from "../device/deleteDevice.js";
import fetchDeviceById from "../device/updateDevice.js";


export default async function createDeviceTable(data) {
    if (!data || data.length === 0) {
        console.error("No device data provided to create table");
        return;
    }

    const mainContainer = document.getElementById("main-container");
    if (!mainContainer) {
        console.error("Main container not found");
        return;
    }

    // Create a dropdown for device statuses
    const statusFilter = document.createElement("select");
    statusFilter.id = "statusFilter";
    const allStatusOption = document.createElement("option");
    allStatusOption.value = "";
    allStatusOption.text = "All Devices";
    statusFilter.appendChild(allStatusOption);

    // Assuming you have an array of all possible device statuses
    const deviceStatuses = ["IN_USE", "IN_STORAGE", "UNDER_REPAIR", "RETIRED"];
    deviceStatuses.forEach(status => {
        const option = document.createElement("option");
        option.value = status;
        option.text = status;
        statusFilter.appendChild(option);
    });

    mainContainer.appendChild(statusFilter);

    statusFilter.addEventListener("change", function() {
        filterByStatus(this.value);
    });

    const table = document.createElement("table");
    table.className = "custom-table";

    const header = table.createTHead();
    const headerRow = header.insertRow();

    // Define the fields from your Device entity that you want to display
    const desiredFields = ['id', 'imeiNumber', 'serialNumber', 'deviceType', 'deviceModel', 'status', 'comments', 'dateCreated', 'lastUpdated'];

    // Create column headers for desired fields
    desiredFields.forEach(field => {
        const th = document.createElement("th");
        th.innerHTML = field.charAt(0).toUpperCase() + field.slice(1);
        headerRow.appendChild(th);
    });

    // Add headers for the action buttons
    const updateTh = document.createElement("th");
    updateTh.innerHTML = "Update";
    headerRow.appendChild(updateTh);


    const deleteTh = document.createElement("th");
    deleteTh.innerHTML = "Delete";
    headerRow.appendChild(deleteTh);


    const tbody = document.createElement("tbody");

    for (let rowData of data) {
        const row = tbody.insertRow();
        row.id = 'row-' + rowData.id;

        desiredFields.forEach(field => {
            const cell = row.insertCell();
            let cellValue = rowData[field];
            if ((field === 'dateCreated' || field === 'lastUpdated') && cellValue) {
                cellValue = new Date(cellValue).toLocaleString();
            }
            cell.innerHTML = cellValue || '';
        });

        const updateCell = row.insertCell();
        const updateButton = document.createElement("button");
        updateButton.innerHTML = "Update";
        updateButton.id = "updateButton1";
        updateButton.onclick = function() {
            fetchDeviceById(rowData.id);
        };
        updateCell.appendChild(updateButton);


        const deleteCell = row.insertCell();
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.id = "deleteButton1";
        deleteButton.onclick = function() {
            deleteDevice(rowData.id);
        };
        deleteCell.appendChild(deleteButton);


    }

    table.appendChild(tbody);
    mainContainer.appendChild(table);
}

function filterByStatus(status) {
    const rows = document.querySelectorAll("#main-container table tbody tr");

    rows.forEach(row => {
        const statusCell = row.cells[5]; // Adjust the index to match 'deviceStatus' column in your table
        if (status === "" || statusCell.textContent === status) {
            row.style.display = ""; // Show row
        } else {
            row.style.display = "none"; // Hide row
        }
    });
}

