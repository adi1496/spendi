export const mainPage = `
<nav class="nav">
    <select class="month" name="months-list" id="months-list">
    </select>
    <div class="user-box">
        <img src="img/user.png" alt="user-img" class="user-img">
        <button class="logout-btn" id="logout-btn">Logout</button>
    </div>
</nav>

<button class="add-fixed-btn income-btn" id="income-btn">+</button>
<button class="add-fixed-btn expense-btn" id="expense-btn">-</button>

<header class="header">
    <div class="logo">
        <h1 class="heading-1">Budget</h1>
        <h1 class="heading-1">APP</h1>
    </div>

    <!-- <h2 class="heading-2">Your Budget <span id="heading-month">December 2020</span></h2> -->
    <div class="balance">Your Balance: <span class="balance-value" id="balance-value"></span> <span class="balance-value" id="curency">€</span></div>

    <div class="box-bar">
        <div class="box-bar-text">Income:</div>
        <div class="box-bar-sign">+</div>
        <div class="box-bar-value"><span id="income-month"></span> <span id="curency">€</span></div>
    </div>
    <div class="box-bar box-bar-red">
        <div class="box-bar-text">Expenses:</div>
        <div class="box-bar-sign">-</div>
        <div class="box-bar-value"><span id="expense-month"></span> <span id="curency">€</span></div>
        <div class="box-bar-percent" id="expense-month-percent"></div>
    </div>
</header>

<section class="section-list">
    <div class="section-list-box">
        <h3 class="heading-3 heading-3-blue">Incomes</h3>
        <ul class="list incomes-list" id="incomes-list">

        </ul>
    </div>


    <div class="section-list-box">
        <h3 class="heading-3 heading-3-red">Expenses</h3>
        <ul class="list expenses-list" id="expenses-list">
        
        </ul>
    </div>

</section>`;






export const loginPage = `<form class="login-form">
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



export const signupPage = `<form class="login-form">
<h3 class="heading-3 heading-center" id="title">Welcome back</h3>
<div class="login-field">
    <label for="name" class="label">Name</label>
    <input type="text" name="name" id="name" class="input-field">
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

<button class="new-btn login-btn" id ="sign-up-btn">Sign Up</button>

<p class="question">Already have an account? Then <a href="#" id="to-login">Log In</a></p>
</form>`;



export const newUserPage = `<form class="new-user-form">
<h3 class="heading-3 heading-center" id="title">Welcome <span id="user-name"></span></h3>
<p class="message">Please select your curency💰</p>
<div class="login-field">
    <label for="name" class="label">Name</label>
    <select name="curency" id="curency">
        <option value="€" selected>Euro - €</option>
        <option value="$">US Dollars - $</option>
        <option value="RON">Romanian Leu - RON</option>
        <option value="£">Great Britain Pound - £</option>
    </select>
</div>

<button class="new-btn login-btn" id ="ok-btn">I will use this</button>
</form>`;