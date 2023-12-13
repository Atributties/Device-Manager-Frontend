export default function logout() {
    // Clear stored user role and JWT token
    localStorage.removeItem('userRole');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('loginTime')
    window.location.reload();
}

