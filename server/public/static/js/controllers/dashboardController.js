import { fetchGet } from "../utills/fetch.js";
import { updateNavBar, addTransactionItem, printBalances, updateBalanceProgressBar } from "../views/dashboardView.js";

export const dashboardListeners = (event) => {
    console.log(event);
    if(event.id === 'income-btn' || event.id === 'cancel-popup-btn') 
        document.getElementById('dark-screen-popup').classList.toggle('dark-screen--hidden');

    if(event.id === 'nav-menu') {
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
    appState.incomeTotal = sumIncomes;
    appState.expensesTotal = sumExpenses;
    appState.expensesPercent = ((sumExpenses * 100) / sumIncomes).toFixed(2);
    appState.balance = appState.incomeTotal - appState.expensesTotal;

    printBalances();
    updateBalanceProgressBar();

    appState.transactions.forEach(trans => {
        addTransactionItem(trans, appState.incomeTotal);
    })
}