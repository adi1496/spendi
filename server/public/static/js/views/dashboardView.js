import {transactionItem} from './ui-components/placeholders.js';
import { camelCase } from '../utills/formatString.js';
import { getDayName } from '../utills/formatDates.js';


export const addTransactionItem = (transaction, incomeTotal) => {
    let item = transactionItem;


    const transactionsList = document.getElementById('transactions-list');

    const monthArr = transaction.month.toString().split('');
    if(monthArr.length < 2) monthArr.unshift('0');
    let date = new Date(transaction.date);
    const dateAttr = {};
    dateAttr.month = monthArr.join('');
    dateAttr.dayNumber = date.getDate();
    dateAttr.dayName = getDayName(date.getDay());
    dateAttr.year = date.getFullYear();

    const transactionDate = `${dateAttr.dayName} ${dateAttr.dayNumber}.
                                ${dateAttr.month}.${dateAttr.year}`;

    item = item.replace('%data-id%', transaction._id);
    item = item.replace('%category%', camelCase(transaction.category));
    item = item.replace('%date%', transactionDate);
    item = item.replace('%description%', transaction.description);
    item = item.replace('%currency%', appState.user.baseCurrency);
    
    if(transaction.type === 'income') {
        item = item.replace('%value%', transaction.value);
        item = item.replace(/%class-income%/g, 'income-color');
    }
    if(transaction.type === 'expense') {
        item = item.replace('%value%', `-${transaction.value}`);
        item = item.replace(/%class-income%/g, '');
    }

    transactionsList.insertAdjacentHTML('afterbegin', item);

}

export const updateBalanceProgressBar = () => {
    const panelPercent = document.getElementById('panel-percent');
    const panelProgressBar = document.getElementById('panel-progress-bar');

    panelPercent.textContent = `${appState.expensesPercent}%`;
    panelProgressBar.style.width = `${appState.expensesPercent}%`;
}


export const printBalances = () => {
    const incomeCurrentMonth = document.querySelectorAll('#budget-month');
    const balanceCurrentMonth = document.getElementById('balance-value');

    incomeCurrentMonth.forEach(el => {
        el.textContent = `${appState.incomeTotal} ${appState.user.baseCurrency}`;
    });

    balanceCurrentMonth.textContent = `${appState.balance} ${appState.user.baseCurrency}`;

}

export const updateNavBar = () =>{
    const userName = document.getElementById('user-name');
    userName.textContent = appState.user.firstName;
}