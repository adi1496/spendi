import AbstractView from "./absractView.js";

class Login extends AbstractView {
    constructor() {
        super();
        this.setTitle('BudgetApp | Login');
    }

    async getHTML() {
        return `<form class="login-form">
        <h3 class="heading-3 heading-center" id="title">Welcome back</h3>
        <div class="login-field">
            <label for="email" class="label">Email</label>
            <input type="email" name="email" id="email" class="input-field">
        </div>
        <div class="login-field">
            <label for="password" class="label">Password</label>
            <input type="password" name="password" id="password" class="input-field">
        </div>
        
        <button class="new-btn login-btn" id="login-btn">Login</button>
        <button class="new-btn google-btn" id="login-with-google-btn">Login With Google</button>
        
        <p class="question">Forgot password? Reset it <a href="#">here</a></p>
        <p class="question">Don't have an account? Then <a href="#" id="to-signup">Sign Up</a></p>
        </form>`;
    }
};

export default Login;