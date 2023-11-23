export default function Login() {
    const style = 'style="color: black; margin-left: 220px;"'; // If you have more styles, you can add them here or use a CSS file
    return `
        <div class="container" ${style}>
            <div class="row">
                <div class="col">
                    <h1 class="text-center">Login</h1>
                    <p class="text-center">Please enter your credentials to login</p>
                    <form id="loginForm">
                        <div class="form-group">
                            <label for="emailInput">Email:</label>
                            <input type="email" class="form-control" id="emailInput" placeholder="Enter email" required>
                        </div>
                        <div class="form-group">
                            <label for="passwordInput">Password:</label>
                            <input type="password" class="form-control" id="passwordInput" placeholder="Password" required>
                        </div>
                        <button type="submit" class="btn btn-primary" id="submitButton">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    `;
}
