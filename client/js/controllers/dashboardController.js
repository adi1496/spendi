import firebase from 'firebase/app';
import 'firebase/firestore';

import dom, {initDOM, refreshDOM, refreshAddNewItemPopupDOM} from '../utils/dom.js';

import DashboardModel from '../models/dashboardModel.js';
import dashboardView from '../views/dashboardViews.js';
import {mainPage} from '../utils/pages.js';
import Functions from './../utils/functions.js';

// init dashboard
const initDashboard = async (user, month) => {
    // get dom elements
    initDOM();
    // init user's prop
    if(user) {
        console.log('called initUserProp');
        await DashboardModel.initUserProperties(user);
    }
    
    // init the state of the app
    const state = await DashboardModel.initState(month);
    console.log(state);
    
    
    // use the state to populate the user interface
    dashboardView.initView(state);

    // add events listeners to the new items added to the page
    addEventListenersToNewListItems();
}



/**************
 * DashBoard controller
 */

const dashboardController = (user) => {
    document.getElementById('root').innerHTML = mainPage;
    initDashboard(user, Functions.getMonthYearLocalStorage());

    // add event listener for selected month
    dom.monthsList.addEventListener('change', changeSelectedMonth);

    // add event listeners for add-income and add-expense buttons
    dom.incomeBtn.addEventListener('click', activateAddNewItemPopup);
    dom.expenseBtn.addEventListener('click', activateAddNewItemPopup);

    // Log Out Button
    dom.logOutBtn.addEventListener('click', e => {
        e.preventDefault();
        firebase.auth().signOut();
    });
}


// change selected month
function changeSelectedMonth(e) {
    window.localStorage.setItem('currentMonth', e.currentTarget.value);
    initDashboard(undefined, e.currentTarget.value);
}



// Add event listener to every new items added to the page (income or expese)
const addEventListenersToNewListItems = () => {
    dom.listsItems.forEach(item => item.addEventListener('click', dashboardView.addItemHoverClass));

    dom.deleteListItem.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            const element = e.currentTarget.parentElement.parentElement;

            dashboardView.removeDomItem(element);
            const month = dom.monthsList.value;
            const state = DashboardModel.deleteItemFromState(element.dataset.type, element.dataset.id, month);

            // if income then update all expenses percentages
            if(element.dataset.type === '+') {
                state.expenses.forEach(expense => {
                    dashboardView.updatePercentItem(expense.id, expense.percent);
                })
            }

        });
    });
}




/**************** LISTENERS CALLBACK FUNCTIONS **********************/ 

// activate ADD NEW ITEM POPUP
function activateAddNewItemPopup(event) {
    event.preventDefault();
    // show the popup to add a new item
    dashboardView.showAddNewItemPopup(event);
    // Get all the elements of the popup
    refreshAddNewItemPopupDOM();

    // add the categories
    const userProp = JSON.parse(window.localStorage.getItem('user'));
    if(event.currentTarget.id === 'income-btn'){
        dashboardView.addCategoriesToPopup(userProp.incomesList)
    }else if(event.currentTarget.id === 'expense-btn') {
        dashboardView.addCategoriesToPopup(userProp.expensesList)
    }

    refreshAddNewItemPopupDOM();

    // allow only numbers and math symbols in the value input (popup)
    dashboardView.allowOnlyNumbersAndMathSymbols(dom.addNewItemPopup.inputValue);

    dom.addNewItemPopup.inputDescription.addEventListener('input', e => {
        if(dom.addNewItemPopup.descriptionBoxPlaceholder.style.visibility !== 'hidden'){
            dom.addNewItemPopup.descriptionBoxPlaceholder.style.visibility = 'hidden';
        }
    });

    // when select a type of income/expense change the style on page
    dom.addNewItemPopup.radioBtns.forEach(radioBtn => {
        radioBtn.addEventListener('change', dashboardView.selectCategory);
    })

    // close the popup with cancel button
    dom.addNewItemPopup.cancelBtn.addEventListener('click', e => {
        e.preventDefault();
        dashboardView.closeAddNewItemPopup();
    });

    // when submit the popup
    dom.addNewItemPopup.submitBtn.addEventListener('click', addNewItem);
}



// when popup submited, add a new item
function addNewItem(e) {
    e.preventDefault();
    const input = {
        type: e.currentTarget.dataset.type,
        description: dom.addNewItemPopup.inputDescription.textContent,
        value: dom.addNewItemPopup.inputValue.textContent,
    };

    dom.addNewItemPopup.radioBtns.forEach(radio => {
        if(radio.checked) input.name = radio.id;
    });

    // create new income / expense
    const month = dom.monthsList.value;
    const newStateAndInput =  DashboardModel.createNewEntry(input, month);
    
    // add the new item to page
    dashboardView.addNewItemToDOM(newStateAndInput.input);

    // if income then update all expenses percentages
    if(newStateAndInput.input.type === '+') {
        // dashboardView.clearExpensesList();
        newStateAndInput.state.expenses.forEach(expense => {
            dashboardView.updatePercentItem(expense.id, expense.percent);
        })
    }

    // update the header
    dashboardView.updateWithNewState(newStateAndInput.state);

    // add event listener for the new elements inserted
    addEventListenersToNewListItems();

    // close popup
    dashboardView.closeAddNewItemPopup();
}


export default dashboardController;