import AbstractView from "./absractView.js";

class Dashboard extends AbstractView {
    constructor() {
        super();
        this.setTitle('Budget App | Dashboard');
    }

    async getHTML() {
        return /*html*/`<nav class="nav">
        <select class="nav__month" name="months-list" id="months-list">
            <!-- <option value="jan">January</option> -->
        </select>
        <div class="nav__user-box">
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
        <div class="header__balance">Your Balance: <span class="header__balance-value" id="balance-value"></span> <span class="header__balance-value" id="curency">€</span></div>
    
        <div class="header__box-bar">
            <div class="header__box-bar-text">Income:</div>
            <div class="header__box-bar-sign">+</div>
            <div class="header__box-bar-value"><span id="income-month"></span> <span id="curency">€</span></div>
        </div>
        <div class="header__box-bar header__box-bar--red">
            <div class="header__box-bar-text">Expenses:</div>
            <div class="header__box-bar-sign">-</div>
            <div class="header__box-bar-value"><span id="expense-month"></span> <span id="curency">€</span></div>
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
    
    </section>`;
    }

    run() {
        return ;
    }
};

export default Dashboard;