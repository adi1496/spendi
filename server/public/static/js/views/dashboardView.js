import {transactionItem} from './ui-components/placeholders.js';
import { camelCase } from '../utills/formatString.js';
import { getDayName } from '../utills/formatDates.js';


export const addTransactionItem = (transaction, incomeTotal) => {
    let item = transactionItem;


    const incomesList = document.getElementById('incomes-list');
    const expensesList = document.getElementById('expenses-list');

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
    item = item.replace('%value%', transaction.value);
    item = item.replace('%currency%', appState.user.baseCurrency);

    if(transaction.type === 'income') {
        item = item.replace('%percent-span%', '');
        item = item.replace(/%class-red%/g, '');
        incomesList.insertAdjacentHTML('beforeend', item);
    }
    if(transaction.type === 'expense') {
        let percentSpan = /*html*/`<span class="transactions__item--percent" id="item-percent">%percent%%</span>`;
        const percent = Math.ceil((transaction.value * 100) / incomeTotal);
        percentSpan = percentSpan.replace('%percent%', percent);
        item = item.replace('%percent-span%', percentSpan);
        item = item.replace(/%class-red%/g, 'transactions__item--red');
        expensesList.insertAdjacentHTML('afterbegin', item);
    }
}


export const printBalances = () => {
    const incomeCurrentMonth = document.getElementById('income-month-value');
    const expenseCurrentMonth = document.getElementById('expense-month-value');
    const balanceCurrentMonth = document.getElementById('balance-value');
    const currencyAll = document.querySelectorAll('#currency');

    incomeCurrentMonth.textContent = appState.incomeTotal;
    expenseCurrentMonth.textContent = appState.expensesTotal;
    balanceCurrentMonth.textContent = appState.balance;

    currencyAll.forEach(el => el.textContent= appState.user.baseCurrency);

}

export const updateNavBar = () =>{
    const userName = document.getElementById('user-name');
    userName.textContent = appState.user.firstName;
}