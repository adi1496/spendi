import firebase from 'firebase/app';
import 'firebase/firestore';

import Views from '../views/dashboardViews.js';
import State from '../utils/state.js';
import Functions from '../utils/functions.js';


// Update localStorage
const updateLocalStorage = (newState) => {
    window.localStorage.setItem(Functions.getMonthYearLocalStorage(), JSON.stringify(newState));
}

//Init State
let state;
const initState = async (month) => {
    const db = firebase.firestore();
    // const localStorageData = window.localStorage.getItem(Functions.getMonthYearLocalStorage());
    const userId = JSON.parse(window.localStorage.getItem('user')).userId;
    const docRef = db.collection('users').doc(userId)
    .collection('months').doc(month);

    const doc = await docRef.get();
    if(doc.exists){
        // if doc exists, get the data
        console.log(doc.data().expenses, 'heu');
        fetch('http://127.0.0.1/5000/api/v1/transactions/data', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        state = new State(doc.data());
    }else {
        // if doc doesn't exist create a new doc(maybe started another month)
        console.log('Document does not exists');
        const newState = {
            balance: 0,
            monthIncomesValue: 0,
            monthExpensesValue: 0,
            monthExpensesPercentage: 0,
            incomes: [],
            expenses: []
        }
        db.collection('users').doc(userId).collection('months')
        .doc(month).set(newState);
        state = new State(newState);
    }

    return state;
}

const initUserProperties = async (user) => {
    const db = firebase.firestore();

    const userRef = await  db.collection('users').doc(user.uid).collection('months').get();
    console.log(userRef.docs);
    const months = [];
    userRef.docs.forEach(doc => {
        months.push(doc.id);
    });

    const docRef = await db.collection('users').doc(user.uid).get();
    const userProp = docRef.data();

    const userLS = {
        userId: user.uid,
        curency: userProp.curency,
        incomesList: userProp.incomesList,
        expensesList: userProp.expensesList,
        months: months
    }

    window.localStorage.setItem('user', JSON.stringify(userLS));
    window.localStorage.setItem('currentMonth', Functions.getMonthYearLocalStorage());
}


// Create New Income / Expense
const createNewEntry = (input, month) => {
    input.value = parseFloat(input.value);
    input.id = Date.now();

    if(input.type === '+') {
        state.updateIncomes(input);
    }else if(input.type === '-') {
        input.percent = (input.value * 100) / state.monthIncomesValue;
        input.percent = input.percent.toFixed(2);
        state.updateExpeses(input);
    }

    // Views.addNewItemToDOM(input);
    // Views.updateWithNewState(state);

    // updateLocalStorage(state);
    const db = firebase.firestore();
    const userId = JSON.parse(window.localStorage.getItem('user')).userId;

    db.collection('users').doc(userId).collection('months')
    .doc(month).set({
        balance: state.balance,
        monthIncomesValue: state.monthIncomesValue,
        monthExpensesValue: state.monthExpensesValue,
        monthExpensesPercentage: state.monthExpensesPercentage,
        incomes: state.incomes,
        expenses: state.expenses
    });
    console.log(state);

    return {
        input: input,
        state: state
    }
}


// delete income / expense from state
const deleteItemFromState = (type, id, month) => {
    id = parseInt(id);
    if(type === '+'){
        state.deleteIncome(id);
    }else if(type === '-') {
        state.deleteExpense(id);
    }

    Views.updateWithNewState(state);

    const db = firebase.firestore();
    const userId = JSON.parse(window.localStorage.getItem('user')).userId;
    
    db.collection('users').doc(userId).collection('months')
    .doc(month).set({
        balance: state.balance,
        monthIncomesValue: state.monthIncomesValue,
        monthExpensesValue: state.monthExpensesValue,
        monthExpensesPercentage: state.monthExpensesPercentage,
        incomes: state.incomes,
        expenses: state.expenses
    });

    return state;
    // updateLocalStorage(state);
}


// Create an Object with all functions and export it
const Model = {
    initState: initState,
    initUserProperties: initUserProperties,
    createNewEntry: createNewEntry,
    deleteItemFromState: deleteItemFromState
}

export default Model;