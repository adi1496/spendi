import AbstractView from "./absractView.js";

import {signupController} from "../../controllers/authController.js";

class SignUp extends AbstractView {
    constructor() {
        super();
    }

    async getHTML() {
        this.setTitle('BudgetApp | SignUp');

        return /*html*/`<form class="login-form" id="loginForm">
        <h3 class="heading-3 heading-3__auth heading-center" id="title">Welcome</h3>
        <div class="login-field">
            <label for="firstName" class="label">First Name</label>
            <input type="text" name="firstName" id="firstName" class="input-field">
        </div>
        <div class="login-field">
            <label for="lastName" class="label">Last Name</label>
            <input type="text" name="lastName" id="lastName" class="input-field">
        </div>
        <div class="login-field">
            <label for="email" class="label">Email</label>
            <input type="email" name="email" id="email" class="input-field">
        </div>
        <div class="login-field">
            <label for="password" class="label">Password</label>
            <input type="password" name="password" id="password" class="input-field">
        </div>
        <div class="login-field">
            <label for="password-confirm" class="label">Password Confirmation</label>
            <input type="password" name="password-confirm" id="password-confirm" class="input-field">
        </div>
        <button type="submit" class="new-btn login-btn" id ="sign-up-btn">Sign Up</button>
        <p class="question">Already have an account? Then <a data-link=true href="/login" id="to-login">Log In</a></p>
        </form>`;
    }

    // run() {
    //     return ;
    // }
};

export default SignUp;