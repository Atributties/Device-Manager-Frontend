import deleteSimcard from "../simcard/deleteSimcard.js";
import { updateSimCard } from "../simcard/updateSimCard.js"; // Import the updateSimCard function

export default function createSimcardTable(data) {
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

    // Adding headers for update and delete
    const updateTh = document.createElement("th");
    updateTh.innerHTML = "Update";
    headerRow.appendChild(updateTh);

    const deleteTh = document.createElement("th");
    deleteTh.innerHTML = "Delete";
    headerRow.appendChild(deleteTh);

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
        updateBtn.addEventListener("click", () => updateSimCard(rowData.id)); // Call the updateSimCard function
        updateCell.appendChild(updateBtn);

        // Add delete button
        const deleteCell = row.insertCell();
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.id = "deleteButton";
        deleteBtn.addEventListener("click", () => deleteSimcard(rowData.id));
        deleteCell.appendChild(deleteBtn);
    });

    table.appendChild(tbody);
    mainContainer.appendChild(table);
}