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

    a() {
        alert('fuck');
    }

    async render() {
        console.log('this was rendered');
        this.setTitle();
        return /*html*/`<nav class="nav">
        <svg class="nav__menu" id="nav-menu" width="230" height="230" viewBox="0 0 230 230" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="path-1-inside-1_9_9" fill="white">
            <path d="M214.286 56.972C201.422 34.9616 181.609 17.8497 157.961 8.32584C134.312 -1.19799 108.17 -2.59376 83.642 4.35789C59.1141 11.3096 37.5915 26.2145 22.4569 46.7301C7.32238 67.2457 -0.56601 92.2088 0.0316001 117.696C0.62921 143.183 9.67894 167.749 25.7584 187.532C41.8379 207.316 64.0354 221.196 88.8622 226.99C113.689 232.785 139.737 230.165 162.913 219.543C186.089 208.922 205.079 190.9 216.897 168.311L169.001 143.252C162.738 155.224 152.674 164.775 140.392 170.404C128.11 176.033 114.305 177.421 101.148 174.35C87.9909 171.279 76.2271 163.924 67.7056 153.439C59.1842 142.955 54.3882 129.936 54.0715 116.429C53.7548 102.922 57.9353 89.6922 65.956 78.8198C73.9767 67.9474 85.3828 60.0483 98.3816 56.3643C111.38 52.6802 125.235 53.4199 137.767 58.4671C150.3 63.5143 160.8 72.5829 167.618 84.2476L214.286 56.972Z"/>
            </mask>
            <path d="M214.286 56.972C201.422 34.9616 181.609 17.8497 157.961 8.32584C134.312 -1.19799 108.17 -2.59376 83.642 4.35789C59.1141 11.3096 37.5915 26.2145 22.4569 46.7301C7.32238 67.2457 -0.56601 92.2088 0.0316001 117.696C0.62921 143.183 9.67894 167.749 25.7584 187.532C41.8379 207.316 64.0354 221.196 88.8622 226.99C113.689 232.785 139.737 230.165 162.913 219.543C186.089 208.922 205.079 190.9 216.897 168.311L169.001 143.252C162.738 155.224 152.674 164.775 140.392 170.404C128.11 176.033 114.305 177.421 101.148 174.35C87.9909 171.279 76.2271 163.924 67.7056 153.439C59.1842 142.955 54.3882 129.936 54.0715 116.429C53.7548 102.922 57.9353 89.6922 65.956 78.8198C73.9767 67.9474 85.3828 60.0483 98.3816 56.3643C111.38 52.6802 125.235 53.4199 137.767 58.4671C150.3 63.5143 160.8 72.5829 167.618 84.2476L214.286 56.972Z" fill="#00FFBF" stroke="#00798C" stroke-width="16" mask="url(#path-1-inside-1_9_9)"/>
            <path d="M150.032 134.656C150.032 141.568 147.472 147.456 142.352 152.32C137.317 157.099 129.979 160 120.336 161.024V175.36H109.84V161.152C103.525 160.725 97.552 159.573 91.92 157.696C86.288 155.819 81.808 153.429 78.48 150.528L84.24 137.6C87.3973 140.16 91.2373 142.336 95.76 144.128C100.283 145.835 104.976 146.901 109.84 147.328V121.728C103.781 120.277 98.704 118.699 94.608 116.992C90.5973 115.2 87.2267 112.64 84.496 109.312C81.7653 105.899 80.4 101.419 80.4 95.872C80.4 88.96 82.9173 83.072 87.952 78.208C92.9867 73.344 100.283 70.4427 109.84 69.504V55.04H120.336V69.248C125.115 69.504 129.765 70.3147 134.288 71.68C138.896 73.0453 142.907 74.8373 146.32 77.056L141.072 89.984C134.587 86.2293 127.675 83.9253 120.336 83.072V108.928C126.48 110.379 131.557 111.957 135.568 113.664C139.664 115.371 143.077 117.931 145.808 121.344C148.624 124.672 150.032 129.109 150.032 134.656ZM96.912 95.104C96.912 97.92 98.0213 100.181 100.24 101.888C102.459 103.595 105.659 105.045 109.84 106.24V83.456C105.488 84.1387 102.245 85.504 100.112 87.552C97.9787 89.6 96.912 92.1173 96.912 95.104ZM120.336 147.072C124.859 146.389 128.187 145.067 130.32 143.104C132.539 141.141 133.648 138.709 133.648 135.808C133.648 132.907 132.496 130.603 130.192 128.896C127.888 127.104 124.603 125.611 120.336 124.416V147.072Z" fill="#00FFBF"/>
        </svg>

        <div class="nav__user-box">
            <div class="nav__user-name" id="user-name"></div>
            <img src="img/user.png" alt="user-img" class="nav__user-img">
            <button class="nav__logout-btn" id="logout-btn">Logout</button>
        </div>
    </nav>
    
    <svg class="add-transaction-btn" id="show-add_btns" width="230" height="230" viewBox="0 0 230 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="path-1-inside-1_9_9" fill="white">
        <path d="M214.286 56.972C201.422 34.9616 181.609 17.8497 157.961 8.32584C134.312 -1.19799 108.17 -2.59376 83.642 4.35789C59.1141 11.3096 37.5915 26.2145 22.4569 46.7301C7.32238 67.2457 -0.56601 92.2088 0.0316001 117.696C0.62921 143.183 9.67894 167.749 25.7584 187.532C41.8379 207.316 64.0354 221.196 88.8622 226.99C113.689 232.785 139.737 230.165 162.913 219.543C186.089 208.922 205.079 190.9 216.897 168.311L169.001 143.252C162.738 155.224 152.674 164.775 140.392 170.404C128.11 176.033 114.305 177.421 101.148 174.35C87.9909 171.279 76.2271 163.924 67.7056 153.439C59.1842 142.955 54.3882 129.936 54.0715 116.429C53.7548 102.922 57.9353 89.6922 65.956 78.8198C73.9767 67.9474 85.3828 60.0483 98.3816 56.3643C111.38 52.6802 125.235 53.4199 137.767 58.4671C150.3 63.5143 160.8 72.5829 167.618 84.2476L214.286 56.972Z"/>
        </mask>
        <path d="M214.286 56.972C201.422 34.9616 181.609 17.8497 157.961 8.32584C134.312 -1.19799 108.17 -2.59376 83.642 4.35789C59.1141 11.3096 37.5915 26.2145 22.4569 46.7301C7.32238 67.2457 -0.56601 92.2088 0.0316001 117.696C0.62921 143.183 9.67894 167.749 25.7584 187.532C41.8379 207.316 64.0354 221.196 88.8622 226.99C113.689 232.785 139.737 230.165 162.913 219.543C186.089 208.922 205.079 190.9 216.897 168.311L169.001 143.252C162.738 155.224 152.674 164.775 140.392 170.404C128.11 176.033 114.305 177.421 101.148 174.35C87.9909 171.279 76.2271 163.924 67.7056 153.439C59.1842 142.955 54.3882 129.936 54.0715 116.429C53.7548 102.922 57.9353 89.6922 65.956 78.8198C73.9767 67.9474 85.3828 60.0483 98.3816 56.3643C111.38 52.6802 125.235 53.4199 137.767 58.4671C150.3 63.5143 160.8 72.5829 167.618 84.2476L214.286 56.972Z" fill="#00FFBF" stroke="#00798C" stroke-width="16" mask="url(#path-1-inside-1_9_9)"/>
        <path class="add-transaction-btn__el1" d="M150.032 134.656C150.032 141.568 147.472 147.456 142.352 152.32C137.317 157.099 129.979 160 120.336 161.024V175.36H109.84V161.152C103.525 160.725 97.552 159.573 91.92 157.696C86.288 155.819 81.808 153.429 78.48 150.528L84.24 137.6C87.3973 140.16 91.2373 142.336 95.76 144.128C100.283 145.835 104.976 146.901 109.84 147.328V121.728C103.781 120.277 98.704 118.699 94.608 116.992C90.5973 115.2 87.2267 112.64 84.496 109.312C81.7653 105.899 80.4 101.419 80.4 95.872C80.4 88.96 82.9173 83.072 87.952 78.208C92.9867 73.344 100.283 70.4427 109.84 69.504V55.04H120.336V69.248C125.115 69.504 129.765 70.3147 134.288 71.68C138.896 73.0453 142.907 74.8373 146.32 77.056L141.072 89.984C134.587 86.2293 127.675 83.9253 120.336 83.072V108.928C126.48 110.379 131.557 111.957 135.568 113.664C139.664 115.371 143.077 117.931 145.808 121.344C148.624 124.672 150.032 129.109 150.032 134.656ZM96.912 95.104C96.912 97.92 98.0213 100.181 100.24 101.888C102.459 103.595 105.659 105.045 109.84 106.24V83.456C105.488 84.1387 102.245 85.504 100.112 87.552C97.9787 89.6 96.912 92.1173 96.912 95.104ZM120.336 147.072C124.859 146.389 128.187 145.067 130.32 143.104C132.539 141.141 133.648 138.709 133.648 135.808C133.648 132.907 132.496 130.603 130.192 128.896C127.888 127.104 124.603 125.611 120.336 124.416V147.072Z" fill="#00FFBF"/>
    </svg>

    <div class="add-fixed-div add-fixed-div--hidden" id="add-btns-container">
        <button class="add-fixed-div__btn" id="income-btn">+</button>
        <button class="add-fixed-div__btn" id="expense-btn">-</button>
        <button class="add-fixed-div__btn" id="invest-btn">%</button>
    </div>

    
    <header class="header">
    
        <div class="header__month u-margin-top--big" id="current-month">December 2020</div>
        <div class="header__balance-info">
            <div class="header__balance"><span id="balance-value"></span> left</div>
            <div class="header__budget">out of <span id="budget-month"></span> won this month</div>
        </div>
    
    </header>
    
    <main class="main">

        <section class="panel">
            <div class="panel__box">
                <div class="panel__details">
                    <div class="panel__month">Month Budget<span class="panel__value" id="budget-month"></span></div>
                    <div class="panel__percent" id="panel-percent">65%</div>
                </div>
                <div class="panel__bar">
                    <div class="panel__bar-progress" id="panel-progress-bar"></div>
                </div>
            </div>
        </section>

        <section class="overview">
            <h3 class="heading-3 heading-3__overview">Transactions</h3>
            <ul class="overview__transactions" id="transactions-list">
                
            </ul>

        </section>

    </main>
    
    <div class="dark-screen dark-screen--hidden" id="dark-screen-popup">
        <form class="add-new">
            <h4 class="heading-4">Add New Transaction</h4>

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
                
                <label class="add-new__category-item" for="{%item-id%}">
                <input type="radio" class="add-new__radio-btn" id="{%item-id%}" name="category-item">
                <svg class="add-new__category-icon">
                <use xlink:href="img/svg/category-icons.svg#icon-coin-euro"></use>
                </svg>
                <div class="add-new__category-description">Salary</div>
                </label>
                
                <label class="add-new__category-item" for="{%item-id%}">
                <input type="radio" class="add-new__radio-btn" id="{%item-id%}" name="category-item">
                <svg class="add-new__category-icon">
                <use xlink:href="img/svg/category-icons.svg#icon-coin-euro"></use>
                </svg>
                <div class="add-new__category-description">Salary</div>
                </label>
                <label class="add-new__category-item" for="{%item-id%}">
                <input type="radio" class="add-new__radio-btn" id="{%item-id%}" name="category-item">
                <svg class="add-new__category-icon">
                <use xlink:href="img/svg/category-icons.svg#icon-coin-euro"></use>
                </svg>
                <div class="add-new__category-description">Salary</div>
                </label>
                <label class="add-new__category-item" for="{%item-id%}">
                <input type="radio" class="add-new__radio-btn" id="{%item-id%}" name="category-item">
                <svg class="add-new__category-icon">
                <use xlink:href="img/svg/category-icons.svg#icon-coin-euro"></use>
                </svg>
                <div class="add-new__category-description">Salary</div>
                </label>
                <label class="add-new__category-item" for="{%item-id%}">
                <input type="radio" class="add-new__radio-btn" id="{%item-id%}" name="category-item">
                <svg class="add-new__category-icon">
                <use xlink:href="img/svg/category-icons.svg#icon-coin-euro"></use>
                </svg>
                <div class="add-new__category-description">Salary</div>
                </label>
                <label class="add-new__category-item" for="{%item-id%}">
                <input type="radio" class="add-new__radio-btn" id="{%item-id%}" name="category-item">
                <svg class="add-new__category-icon">
                <use xlink:href="img/svg/category-icons.svg#icon-coin-euro"></use>
                </svg>
                <div class="add-new__category-description">Salary</div>
                </label>
                <label class="add-new__category-item" for="{%item-id%}">
                <input type="radio" class="add-new__radio-btn" id="{%item-id%}" name="category-item">
                <svg class="add-new__category-icon">
                <use xlink:href="img/svg/category-icons.svg#icon-coin-euro"></use>
                </svg>
                <div class="add-new__category-description">Salary</div>
                </label>
            
            </div>

            <button class="add-new__add-category">+ Add Category</button>
            
            <input type="text" class="add-new__description" placeholder="Type a note">
            
            <div class="buttons">
            <button class="new-btn cancel-btn" id="cancel-popup-btn">Cancel</button>
                <button class="new-btn add-btn" data-type="{%add-type%}" id="submit-btn">Add New Transaction</button>
            </div>
        </form>
        </div>

        <div class="menu" id="menu-container"></div>`;
    }

};


{/* <svg class="nav__menu" id="nav-menu">
    <use id="nav-menu" xlink:href="img/svg/icons.svg#icon-th-menu"></use>
</svg> */}

export default Dashboard;