import dom, {refreshDOM} from '../utils/dom.js';
import placeholders from '../utils/placeholders.js';
import Functions from '../utils/functions.js';

const initView = (state) => {
    const curency = JSON.parse(window.localStorage.getItem('user')).curency;
    dom.curency.forEach(el => el.textContent = curency);
    dom.balance.textContent = state.balance;
    dom.monthIncome.textContent = state.monthIncomesValue;
    dom.monthExpense.textContent = state.monthExpensesValue;
    dom.monthExpensePercent.textContent = `${state.monthExpensesPercentage}%`;
    dom.incomesList.innerHTML = '';
    dom.expensesList.innerHTML = '';
    state.incomes.forEach(income => addNewItemToDOM(income));
    state.expenses.forEach(expense => addNewItemToDOM(expense));
    dom.monthsList.innerHTML = '';
    addMonthsListToDOM();
}

function addMonthsListToDOM(){
    const months = JSON.parse(window.localStorage.getItem('user')).months;
    months.forEach(month => {
        const option = document.createElement('option');
        if(month === window.localStorage.getItem('currentMonth')) option.selected = true;
        option.value = month;
        option.textContent = Functions.convertStorageMonthYearToNormal(month);
        dom.monthsList.insertAdjacentElement('beforeend', option);
    });
};

const firstLetterUppercase = (text) => {
    text = text.split('');
    text[0] = text[0].toUpperCase();
    return text.join('');
}

const addNewItemToDOM = (input) => {
    input.curency = JSON.parse(window.localStorage.getItem('user')).curency;
    let element = placeholders.itemPlaceholder.replace('{%name%}', firstLetterUppercase(input.name));
    element = element.replace('{%id%}', input.id);
    element = element.replace('{%type%}', input.type);
    element = element.replace('{%description%}', input.description);
    element = element.replace('{%value%}', `${input.value} ${input.curency}`);

    if(input.type === '+'){
        element = element.replace('{%class-color%}', 'item-value-blue');
        element = element.replace('{%percent-placeholder%}', '');
        dom.incomesList.insertAdjacentHTML('beforeend', element);
    }else if(input.type === '-') {
        element = element.replace('{%class-color%}', 'item-value-red');
        const percent = placeholders.percentPlaceholder.replace('{%percent%}', `${parseInt(input.percent)}%`);
        element = element.replace('{%percent-placeholder%}', ` ${percent}`);
        dom.expensesList.insertAdjacentHTML('beforeend', element);
    }

    refreshDOM();
}

const updatePercentItem = (id, percent) => {
    dom.listsItems.forEach(item => {
        if(item.dataset.id == id) {
            item.childNodes[5].childNodes[1].textContent = `${percent}%`;
        }
    })
}



// Remove item from UI
const removeDomItem = (element) => {
    element.remove();
}


// SHOW ADD NEW ITEM POPUP
const showAddNewItemPopup = event => {
    let element;
    if(event.currentTarget.id === 'income-btn') {
        dom.root.style.setProperty('--color-inputs', '#0d66a1');
        element = placeholders.addPopupPlaceholder.replace(/{%type%}/g, 'Income');
        element = element.replace('{%class-btn%}', 'add-btn');
        element = element.replace('{%add-type%}', '+');
    }else if(event.currentTarget.id === 'expense-btn') {
        dom.root.style.setProperty('--color-inputs', '#ee2727');
        element = placeholders.addPopupPlaceholder.replace(/{%type%}/g, 'Expense');
        element = element.replace('{%class-btn%}', 'add-btn-red');
        element = element.replace('{%add-type%}', '-');
    }

    document.body.insertAdjacentHTML('beforeend', element);
}

const addCategoriesToPopup = (list) => {
    list.forEach(category => {
        let item = placeholders.categoryItem.replace(/{%item-id%}/g, category);
        item = item. replace('{%item-name%}', firstLetterUppercase(category));

        dom.addNewItemPopup.categoryList.insertAdjacentHTML('beforeend', item);
    });
}

// CLOSE ADD NEW ITEM POPUP
const closeAddNewItemPopup = () => {
    document.getElementById('dark-screen-popup').remove();
}

// HIGHLIGHT THE CATEGORY SELECTED
const selectCategory = (e) => {
    dom.addNewItemPopup.radioBtns.forEach(radio => {
        radio.parentElement.style.backgroundColor = '#ffffff';
    });
    if(e.target.checked) {
        e.target.parentElement.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color-inputs');
    }
}




// Update UI When state changes
const updateWithNewState = (state) => {
    dom.balance.textContent = state.balance;
    dom.monthIncome.textContent = state.monthIncomesValue;
    dom.monthExpense.textContent = state.monthExpensesValue;
    dom.monthExpensePercent.textContent = `${parseInt(state.monthExpensesPercentage)}%`;
}



const allowOnlyNumbersAndMathSymbols = (element) => {
    element.addEventListener('keydown', e => {
        if(document.querySelector('.input-box-placeholder').style.visibility !== 'hidden'){
            document.querySelector('.input-box-placeholder').style.visibility = 'hidden';
        }

        // const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '/', '*'];
        const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

        let isOk = false;
        allowedChars.forEach(char => {
            if(e.key === char) isOk = true;
        });

        if(isOk === false && e.key !== 'Backspace'){
            e.preventDefault();
        }
    });
}

const addItemHoverClass = (e) => {
    dom.listsItems.forEach(item => {
        if(item !== e.currentTarget) item.classList.remove('item-hover');
    });
    e.currentTarget.classList.toggle('item-hover');
}

const mainPageViews = {
    initView: initView,
    addNewItemToDOM: addNewItemToDOM,
    removeDomItem: removeDomItem,
    updateWithNewState: updateWithNewState,
    showAddNewItemPopup: showAddNewItemPopup,
    addCategoriesToPopup: addCategoriesToPopup,
    selectCategory: selectCategory,
    closeAddNewItemPopup: closeAddNewItemPopup,
    allowOnlyNumbersAndMathSymbols: allowOnlyNumbersAndMathSymbols,
    addItemHoverClass: addItemHoverClass,
    updatePercentItem: updatePercentItem
}

export default mainPageViews;