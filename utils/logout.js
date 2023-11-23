
export default function logout() {
    // Clear stored user role and JWT token
    localStorage.removeItem('userRole');
    localStorage.removeItem('jwtToken');

}

