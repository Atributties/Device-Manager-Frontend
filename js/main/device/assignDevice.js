// assignDevice.js
import { getToken } from "../../../utils/jwtUtils.js"; // Adjust the path as necessary

export async function assignDevice(deviceId, userId) {
    const token = getToken();
    try {
        const response = await fetch(`http://localhost:8080/device/${deviceId}/assign`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Include the authorization token
            },
            body: JSON.stringify({ user: { id: userId } }),
        });

        if (!response.ok) {
            // You might want to check for different response statuses here
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        alert("Device assigned successfully");
        window.location.reload();
    } catch (error) {
        console.error('Error assigning device:', error);
        alert(`An error occurred while assigning the device: ${error.message}`);
    }
}


