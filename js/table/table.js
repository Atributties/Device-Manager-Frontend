
export default function createTable(data) {
    const mainContainer = document.getElementById("test-table");

    const table = document.createElement("table");
    table.className = "custom-table";

    const header = table.createTHead();
    const headerRow = header.insertRow();

    // Assuming the keys of the first item in the data object as column headers
    Object.keys(data[0]).forEach(function (key) {
        const th = document.createElement("th");
        th.innerHTML = key;
        headerRow.appendChild(th);
    });

    const tbody = document.createElement("tbody");

    data.forEach(function (rowData) {
        const row = tbody.insertRow();

        // Filling the cells with data
        Object.values(rowData).forEach(function (value) {
            const cell = row.insertCell();
            cell.innerHTML = value;
        });
    });

    table.appendChild(tbody);
    mainContainer.appendChild(table);
    console.log(table)
}
