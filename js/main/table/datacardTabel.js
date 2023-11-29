import deleteDatacard from "../datacard/deleteDatacard.js";


export default function createDatacardTabel(data) {
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

    // Extract headers from the first data entry's keys
    const desiredFields = Object.keys(data[0]);

    // Create column headers for desired fields
    desiredFields.forEach(field => {
        const th = document.createElement("th");
        th.innerHTML = field;
        headerRow.appendChild(th);
    });

    // Adding headers for actions
    const actionTh = document.createElement("th");
    actionTh.innerHTML = "Actions";
    headerRow.appendChild(actionTh);

    const tbody = document.createElement("tbody");

    data.forEach(rowData => {
        const row = tbody.insertRow();
        desiredFields.forEach(field => {
            const cell = row.insertCell();
            cell.innerHTML = rowData[field] || ''; // Handle undefined or missing values
        });

        // Add update and delete buttons
        const actionCell = row.insertCell();
        const updateBtn = document.createElement("button");
        updateBtn.innerHTML = "Update";
        updateBtn.addEventListener("click", () => updateUser(rowData.id)); // Assuming id is the unique identifier
        actionCell.appendChild(updateBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.addEventListener("click", () => deleteDatacard(rowData.id));
        actionCell.appendChild(deleteBtn);
    });

    table.appendChild(tbody);
    mainContainer.appendChild(table);
}
