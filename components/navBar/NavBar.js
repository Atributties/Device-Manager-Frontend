export default function NavBar(additionalLiElements = []) {
    return `
        <div id="wrapper" class="toggled">
            <div id="sidebar-wrapper" class="bg-dark">
                <ul class="sidebar-nav">
                    <li class="sidebar-brand">
                        <a href="#" class="text-light">Device Manager</a>
                    </li>
                    ${additionalLiElements.join('')}
                    <li class="sidebar-brand">
                        <a href="#" class="text-light" onclick="logout()">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    `;
}
