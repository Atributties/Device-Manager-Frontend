export default async function createUserRequestsTable(data) {
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
    const desiredFields = ['id', 'requestType', 'requestText', 'messages', 'dateCreated'];

    desiredFields.forEach(field => {
        const th = document.createElement("th");
        th.textContent = field.charAt(0).toUpperCase() + field.slice(1); // Capitalize field names
        headerRow.appendChild(th);
    });

    const tbody = table.appendChild(document.createElement("tbody"));

    data.forEach(rowData => {
        const row = tbody.insertRow();
        desiredFields.forEach(field => {
            const cell = row.insertCell();
            if (field === 'requestText' && rowData[field].length > 2) {
                const shortText = rowData[field].substring(0, 2) + '...';
                const fullText = rowData[field];

                const textSpan = document.createElement('span');
                textSpan.textContent = shortText;
                textSpan.style.cursor = 'pointer';
                textSpan.title = 'Click to see full text';
                textSpan.onclick = () => showModal(fullText);

                cell.appendChild(textSpan);
            } else {
                cell.textContent = rowData[field];
            }
        });
    });

    mainContainer.appendChild(table);
}

function showModal(fullText) {
    // Create the modal container
    const modal = document.createElement('div');
    modal.id = 'myModal';
    modal.className = 'modal';

    // Modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    const closeButton = document.createElement('span');
    closeButton.className = 'close';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => modal.style.display = 'none';

    const textContent = document.createElement('p');
    textContent.textContent = fullText;

    modalContent.appendChild(closeButton);
    modalContent.appendChild(textContent);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    // Display the modal
    modal.style.display = 'block';

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}



