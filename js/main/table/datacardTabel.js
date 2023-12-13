import deleteDatacard from "../datacard/deleteDatacard.js";
import { updateDataCard } from "../datacard/updateDataCard.js";

export default async function createDatacardTable(data) {
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
    const updateTh = document.createElement("th");
    updateTh.innerHTML = "Update";
    headerRow.appendChild(updateTh);

    const deleteTh = document.createElement("th");
    deleteTh.innerHTML = "Delete";
    headerRow.appendChild(deleteTh);

    const tbody = document.createElement("tbody");

    for (const rowData of data) {
        const row = tbody.insertRow();
        desiredFields.forEach(field => {
            const cell = row.insertCell();
            cell.innerHTML = rowData[field] || ''; // Handle undefined or missing values
        });

        // Add update button cell
        const updateCell = row.insertCell();
        const updateBtn = document.createElement("button");
        updateBtn.innerHTML = "Update";
        updateBtn.id = "updateButton";
        updateBtn.addEventListener("click", () => updateDataCard(rowData.id)); // Call the updateDataCard function
        updateCell.appendChild(updateBtn);

        // Add delete button cell
        const deleteCell = row.insertCell();
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.id = "deleteButton";
        deleteBtn.addEventListener("click", () => deleteDatacard(rowData.id));
        deleteCell.appendChild(deleteBtn);


    }

    table.appendChild(tbody);
    mainContainer.appendChild(table);
}