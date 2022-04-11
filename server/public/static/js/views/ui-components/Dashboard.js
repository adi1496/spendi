import AbstractView from "./absractView.js";

import {initDasboard} from './../../controllers/dashboardController.js';
import {isLoggedIn} from './../../controllers/authController.js';

class Dashboard extends AbstractView {
    constructor() {
        super();
        this.title = 'Budget App | Dashboard';
    }
    
    async validateRender() {
        const isUserLogged = await isLoggedIn();
        if(!isUserLogged ) return '/login';
        if(!appState.user.configDone) return '/new-account-config';
        return 'ok';
    }
    
    
    run() {
        return initDasboard();
    }

    async render() {
        console.log('this was rendered');
        this.setTitle();
        return /*html*/`<nav class="nav">
        <svg class="nav__menu" id="nav-menu">
            <use id="nav-menu" xlink:href="img/svg/icons.svg#icon-th-menu"></use>
        </svg>
        <div class="nav__user-box">
            <div class="nav__user-name" id="user-name"></div>
            <img src="img/user.png" alt="user-img" class="nav__user-img">
            <button class="nav__logout-btn" id="logout-btn">Logout</button>
        </div>
    </nav>
    
    <button class="add-fixed-btn income-btn" id="income-btn">+</button>
    <button class="add-fixed-btn expense-btn" id="expense-btn">-</button>
    
    <header class="header">
        <div class="header__logo">
            <h1 class="heading-1">Budget</h1>
            <h1 class="heading-1">APP</h1>
        </div>
    
        <!-- <h2 class="heading-2">Your Budget <span id="heading-month">December 2020</span></h2> -->
        <div class="header__balance">Your Balance: <span class="header__balance-value" id="balance-value"></span> <span class="header__balance-value" id="currency"></span></div>
    
        <div class="header__box-bar">
            <div class="header__box-bar-text">Income:</div>
            <div class="header__box-bar-sign">+</div>
            <div class="header__box-bar-value"><span id="income-month-value"></span> <span id="currency"></span></div>
        </div>
        <div class="header__box-bar header__box-bar--red">
            <div class="header__box-bar-text">Expenses:</div>
            <div class="header__box-bar-sign">-</div>
            <div class="header__box-bar-value"><span id="expense-month-value"></span> <span id="currency"></span></div>
            <div class="header__box-bar-percent" id="expense-month-percent"></div>
        </div>
    </header>
    
    <section class="transactions">
        <div class="transactions-box">
            <h3 class="heading-3 heading-3-blue">Incomes</h3>
            <ul class="transactions__list" id="incomes-list">
                
            </ul>
        </div>
    
    
        <div class="transactions-box">
            <h3 class="heading-3 heading-3-red">Expenses</h3>
            <ul class="transactions__list" id="expenses-list">
                
            </ul>
        </div>
    
    </section>
    
    <div class="dark-screen dark-screen--hidden" id="dark-screen-popup">
        <div class="add-new">
            <h4 class="heading-4">Add New Income</h4>
            
            <input type="number" class="add-new__input-value" id="input-value" step="0.1"
            placeholder="Enter the amount here:" autocomplete="off">

            <div class="add-new__categories-list">
                <label class="add-new__category-item" for="{%item-id%}">
                    <input type="radio" class="add-new__radio-btn" id="{%item-id%}" name="category-item">
                    <svg class="add-new__category-icon">
                        <use xlink:href="img/svg/category-icons.svg#icon-coin-euro"></use>
                    </svg>
                    <div class="add-new__category-description">Salary</div>
                </label>
                
            </div>

            <input type="text" class="add-new__description" placeholder="Type a note">

            <div class="buttons">
                <button class="new-btn" id="cancel-popup-btn">Cancel</button>
                <button class="new-btn add-btn" data-type="{%add-type%}" id="submit-btn">Add New Income</button>
            </div>
        </div>
        </div>

        <div class="menu" id="menu-container"></div>`;
    }

};

export default Dashboard;