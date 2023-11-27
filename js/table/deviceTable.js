export default function createDeviceTable(data) {
    if (!data || data.length === 0) {
        console.error("No device data provided to create table");
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

    // Define the fields from your Device entity that you want to display
    const desiredFields = ['imeiNumber', 'serialNumber', 'deviceType', 'deviceModel', 'deviceStatus', 'comments', 'dateCreated', 'lastUpdated'];

    // Create column headers for desired fields
    desiredFields.forEach(field => {
        const th = document.createElement("th");
        th.innerHTML = field.charAt(0).toUpperCase() + field.slice(1); // Capitalize field names
        headerRow.appendChild(th);
    });

    const tbody = document.createElement("tbody");

    data.forEach(rowData => {
        const row = tbody.insertRow();
        desiredFields.forEach(field => {
            const cell = row.insertCell();
            let cellValue = rowData[field];

            // If the field is a date, format it accordingly
            if ((field === 'dateCreated' || field === 'lastUpdated') && cellValue) {
                cellValue = new Date(cellValue).toLocaleString(); // Format date
            }

            cell.innerHTML = cellValue || ''; // Handle undefined or missing values
        });
    });

    table.appendChild(tbody);
    mainContainer.appendChild(table);
}
