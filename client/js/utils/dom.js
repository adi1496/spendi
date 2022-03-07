const getId = (id) => {
    return document.getElementById(id);
}

const dom = {};

export const initDOM = () => {
    dom.monthsList = getId('months-list');
    dom.logOutBtn = getId('logout-btn');
    dom.curency = document.querySelectorAll('#curency'),
    dom.headingMonth = getId('heading-month'),
    dom.month = getId('heading-month'),
    dom.balance = getId('balance-value'),
    dom.monthIncome = getId('income-month'),
    dom.monthExpense = getId('expense-month'),
    dom.monthExpensePercent = getId('expense-month-percent'),
    dom.incomeBtn = getId('income-btn'),
    dom.expenseBtn = getId('expense-btn'),
    dom.addNewItemPopup = {
        inputValue: getId('input-value'),
        inputBoxPlaceholder: document.querySelector('.input-box-placeholder'),
        categoryList: document.querySelector('.categories-list'),
        radioBtns: document.querySelectorAll('.radio-btn'),
        inputDescription: getId('input-description'),
        descriptionBoxPlaceholder: document.querySelector('.description-box-placeholder'),
        cancelBtn: getId('cancel-popup-btn'),
        submitBtn: getId('submit-btn')
    },
    dom.incomesList = getId('incomes-list'),
    dom.expensesList = getId('expenses-list'),
    dom.listsItems = document.querySelectorAll('#list-item'),
    dom.editListItem = document.querySelectorAll('#item-edit'),
    dom.deleteListItem = document.querySelectorAll('#item-delete'),
    
    dom.root = document.documentElement

}




export const refreshDOM = () => {
    dom.editListItem = document.querySelectorAll('#item-edit');
    dom.deleteListItem = document.querySelectorAll('#item-delete');
    dom.listsItems = document.querySelectorAll('#list-item');
}

export const refreshAddNewItemPopupDOM = () => {
    dom.addNewItemPopup.inputValue = getId('input-value');
    dom.addNewItemPopup.inputBoxPlaceholder = document.querySelector('.input-box-placeholder');
    dom.addNewItemPopup.categoryList = document.querySelector('.categories-list');
    dom.addNewItemPopup.radioBtns = document.querySelectorAll('.radio-btn');
    dom.addNewItemPopup.inputDescription = getId('input-description');
    dom.addNewItemPopup.descriptionBoxPlaceholder = document.querySelector('.description-box-placeholder');
    dom.addNewItemPopup.cancelBtn = getId('cancel-popup-btn');
    dom.addNewItemPopup.submitBtn = getId('submit-btn');
}

export default dom;