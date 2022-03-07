const getMonthYear = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date();

    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

const getMonthYearLocalStorage = () => {
    const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    const date = new Date();

    return `${monthNames[date.getMonth()]}-${date.getFullYear()}`;
}

const printErrorLoginPage = (message, pivotElement) => {
    const err = document.createElement('div');
    err.classList.add('error');
    err.textContent = message;
    if(document.querySelector('.error')){
        document.querySelector('.error').remove();
    }
    pivotElement.insertAdjacentElement('afterend', err);
}

const convertStorageMonthYearToNormal = (string) => {
    return string.split('-').join(' ');
}

const Functions = {
    getMonthYear: getMonthYear,
    getMonthYearLocalStorage: getMonthYearLocalStorage,
    printErrorLoginPage: printErrorLoginPage,
    convertStorageMonthYearToNormal: convertStorageMonthYearToNormal
}

export default Functions;