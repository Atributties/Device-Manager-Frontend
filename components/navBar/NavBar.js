

export default function NavBar(additionalLiElements = []) {
    return `
        <div id="wrapper" class="toggled">
            <!-- Sidebar -->
            <div id="sidebar-wrapper" class="bg-dark">
                <ul class="sidebar-nav">
                    <li class="sidebar-brand">
                        <a href="#" class="text-light">Device Manager</a>
                    </li>
                    ${additionalLiElements.join('')}
                </ul>
            </div>
        </div>
    `;
}