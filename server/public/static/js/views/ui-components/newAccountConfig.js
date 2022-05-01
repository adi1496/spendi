import AbstractView from "./absractView.js";

import {isLoggedIn} from './../../controllers/authController.js';
import {initNewAccountPage} from './../../controllers/newAccountController.js';

class NewAccount extends AbstractView {
    constructor() {
        super();
        this.title = 'BudgetApp | Account Config';
    }


    async validateRender() {
        const isUserLogged = await isLoggedIn();
        if(!isUserLogged ) return '/login';
        if(appState.user.configDone) return '/';
        return 'ok';
    }

    run() {
        return initNewAccountPage();
    }

    async render() {
        this.setTitle();
        
        return /*html*/`<form class="new-user-form" id="new-user-form">
        <h3 class="heading-3 heading-center" id="title">Welcome <span id="user-name"></span></h3>
        <div class="login-field">
            <label for="name" class="label">Please copmose your herotag below:</label>
            <input type="text" name="herotag" id="herotag" class="input-field" value="@">
        </div>
        <div class="login-field">
            <label for="name" class="label">Please select your curency💰</label>
            <select class="" name="curency" id="curency">
                <option value="€" selected>Euro - €</option>
                <option value="$">US Dollar - $</option>
                <option value="RON">Romanian Leu - RON</option>
                <option value="£">Great Britain Pound - £</option>
            </select>
        </div>
        <div class="login-field">
            <label for="name" class="label">Please write the email of a friend to share
             your transaction hsitory. If there are more friends to share with please
             separate them with a coma ,</label>
            <input type="text" name="email" id="email" class="input-field">
        </div>
        <button class="new-btn login-btn" id ="config-btn">I will use this</button>
        </form>`;
    }
};

export default NewAccount;