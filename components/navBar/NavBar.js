
export default function NavBarHTML() {
    return `
        <div id="wrapper" class="toggled">
            <!-- Sidebar -->
            <div id="sidebar-wrapper" class="bg-dark">
                <ul class="sidebar-nav">
                    <li class="sidebar-brand">
                        <a href="#" class="text-light">Device Manager</a>
                    </li>
                    <li>
                        <a href="#" class="text-light">Create User</a>
                    </li>
                    <li>
                        <a href="#" class="text-light">Login</a>
                    </li>
                    <li>
                        <a href="#" class="text-light">Dashboard</a>
                    </li>
                    <!-- Add more items as needed -->
                </ul>
            </div>
            
           
        </div>
    `;
}