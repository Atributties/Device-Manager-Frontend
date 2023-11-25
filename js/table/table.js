export default function createTable(data) {
    // Ensure data is not empty
    if (!data || data.length === 0) {
        console.error("No data provided to create table");
        return;
    }

    // Get the main container
    const mainContainer = document.getElementById("main-container");
    if (!mainContainer) {
        console.error("Main container not found");
        return;
    }

    // Create table and its elements
    const table = document.createElement("table");
    table.className = "custom-table";

    const header = table.createTHead();
    const headerRow = header.insertRow();

    // Create column headers
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement("th");
        th.innerHTML = key;
        headerRow.appendChild(th);
    });

    // Create table body and rows
    const tbody = document.createElement("tbody");
    data.forEach(rowData => {
        const row = tbody.insertRow();
        Object.values(rowData).forEach(value => {
            const cell = row.insertCell();
            cell.innerHTML = value;
        });
    });

    // Append the tbody to the table and the table to the main container
    table.appendChild(tbody);
    mainContainer.appendChild(table);
}
