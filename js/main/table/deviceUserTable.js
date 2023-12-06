export default function createUserTables(deviceData, simcardData, datacardData) {
    const mainContainer = document.getElementById("main-container");
    if (!mainContainer) {
        console.error("Main container not found");
        return;
    }

    mainContainer.innerHTML = '';

    // Create and append device table with title
    if (deviceData.length > 0) {
        appendTableWithTitle(mainContainer, "Devices", deviceData, ['id', 'imeiNumber', 'serialNumber', 'deviceType', 'deviceModel', 'status', 'comments', 'dateCreated', 'lastUpdated']);
    }

    // Create and append simcard table with title
    if (simcardData.length > 0) {
        appendTableWithTitle(mainContainer, "Simcards", simcardData, ['id', 'phoneNumber', 'iccidNumber', 'pin', 'puk', 'status']);
    }

    // Create and append datacard table with title
    if (datacardData.length > 0) {
        appendTableWithTitle(mainContainer, "Datacards", datacardData, ['id', 'iccidNumber', 'pin', 'puk', 'status']);
    }

    if (!deviceData.length && !simcardData.length && !datacardData.length) {
        const noDataMessage = document.createElement("h2");
        noDataMessage.textContent = "You have no devices, simcards, or datacards";
        mainContainer.appendChild(noDataMessage);
    }
}

function appendTableWithTitle(container, title, data, fields) {
    const titleElement = document.createElement("h2");
    titleElement.textContent = title;
    container.appendChild(titleElement);

    const table = createTable(data, fields);
    container.appendChild(table);
}

function createTable(data, fields) {
    const table = document.createElement("table");
    table.className = "custom-table";

    const header = table.createTHead();
    const headerRow = header.insertRow();
    fields.forEach(field => {
        const th = document.createElement("th");
        th.textContent = field.charAt(0).toUpperCase() + field.slice(1);
        headerRow.appendChild(th);
    });

    const tbody = document.createElement("tbody");
    data.forEach(rowData => {
        const row = tbody.insertRow();
        fields.forEach(field => {
            const cell = row.insertCell();
            cell.textContent = rowData[field] || '';
        });
    });

    table.appendChild(tbody);
    return table;
}


