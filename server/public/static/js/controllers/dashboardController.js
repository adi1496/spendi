import { fetchGet } from "../utills/fetch.js";
import { updateNavBar, addTransactionItem, printBalances, updateBalanceProgressBar } from "../views/dashboardView.js";

export const dashboardListeners = (event) => {
    console.log(event);
    switch (event.id) {
        case 'show-add_btns':
            const addBtnsContainer = document.getElementById('add-btns-container');
            const showaddBtns = document.getElementById('show-add_btns');

            showaddBtns.classList.toggle('add-transaction-btn--active');
            addBtnsContainer.classList.toggle('add-fixed-div--hidden');
            break;
        
        case 'income-btn':
        case 'cancel-popup-btn':
            document.getElementById('dark-screen-popup').classList.toggle('dark-screen--hidden');
            break;
        
        case 'nav-menu':
            const menuCont = document.getElementById('menu-container');
            menuCont.classList.toggle('menu--visible');
            if(menuCont.classList.value.split(' ').includes('menu--visible')) {
                document.getElementById('nav-menu').classList.add('nav__menu--active');
            }else {
                document.getElementById('nav-menu').classList.remove('nav__menu--active');
            }
    }
}

export const initDasboard = async () => {
    console.log('dashboar initialized');
    updateNavBar();

    const todayDate = new Date(Date.now());
    const getTransactionsOptions = {
        year: todayDate.getFullYear(),
        month: todayDate.getMonth() + 1
    }

    const urlQuery = `?year=${getTransactionsOptions.year}&month=${getTransactionsOptions.month}`;
    console.log(urlQuery);

    const response = await fetchGet(`/api/v1/transactions/${urlQuery}`, true);
    console.log(response);

    if(response.status === 'fail' || response.status === 'error') {
        return alert(response.message);
    }

    let sumIncomes = 0;
    let sumExpenses = 0;
    response.transactions.forEach(trans => {
        if(trans.type === 'income') sumIncomes += trans.value;
        if(trans.type === 'expense') sumExpenses += trans.value;
    });

    appState.transactions = response.transactions;
    appState.month = getTransactionsOptions.month;
    appState.year = getTransactionsOptions.year;
    appState.incomeTotal = sumIncomes;
    appState.expensesTotal = sumExpenses;
    if(sumIncomes > 0){
        appState.expensesPercent = ((sumExpenses * 100) / sumIncomes).toFixed(2);
    }else {
        appState.expensesPercent = 0;
    }
    appState.balance = appState.incomeTotal - appState.expensesTotal;

    printBalances();
    updateBalanceProgressBar();

    appState.transactions.forEach(trans => {
        addTransactionItem(trans, appState.incomeTotal);
    })
}