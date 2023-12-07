const apiUrl = "http://localhost:8080/api/chat"; // Replace with your actual API URL

// Create a new user request
function createUserRequest(userRequestDTO) {
    return fetch(`${apiUrl}/user-requests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userRequestDTO)
    }).then(response => response.json());
}

// Add a message to an existing user request
function addMessageToUserRequest(requestId, messageDTO) {
    return fetch(`${apiUrl}/user-requests/${requestId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageDTO)
    }).then(response => response.json());
}

// Get all user requests for an admin
function getAllUserRequestsForAdmin() {
    return fetch(`${apiUrl}/admin/user-requests`)
        .then(response => response.json());
}

// Get a specific user request with messages for an admin
function getUserRequestWithMessagesForAdmin(requestId) {
    return fetch(`${apiUrl}/admin/user-requests/${requestId}`)
        .then(response => response.json());
}

// Get all user requests for a specific user
function getAllUserRequestsForUser(userId) {
    return fetch(`${apiUrl}/user/${userId}/user-requests`)
        .then(response => response.json());
}

// Get a specific user request with messages for a user
function getUserRequestWithMessagesForUser(userId, requestId) {
    return fetch(`${apiUrl}/user/${userId}/user-requests/${requestId}`)
        .then(response => response.json());
}
