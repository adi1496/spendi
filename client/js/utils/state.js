class State {
    constructor(data) {
        this.balance = data.balance;
        this.monthIncomesValue = data.monthIncomesValue;
        this.monthExpensesValue = data.monthExpensesValue;
        this.monthExpensesPercentage = data.monthExpensesPercentage;
        this.incomes = data.incomes;
        this.expenses = data.expenses;
    }

    updateBalance() {
        const val = this.monthIncomesValue - this.monthExpensesValue;
        this.balance = parseFloat(val.toFixed(2));
    }

    calcTotalExpensesPercentage() {
        if(this.monthIncomesValue === 0){
            this.monthExpensesPercentage = 0;
        }else {
            let result = (this.monthExpensesValue * 100) / this.monthIncomesValue;
            result = result.toFixed(2);
            this.monthExpensesPercentage = parseFloat(result);
        }
    }

    calcEveryExpensePercentage() {
        this.expenses.forEach(expense => {
            if(this.monthIncomesValue === 0) {
                expense.percent = 0;
            }else {
                let result = (this.monthExpensesValue * 100) / this.monthIncomesValue;
                result = result.toFixed(2);
                expense.percent = parseFloat(result);
            }
        })
    }

    updateIncomes(newIncome) {
        // push new item to incomes array
        this.incomes.push(newIncome);
        //update the month income value 
        this.updateIncExpValue('inc');

        // update every expense percentage value
        this.calcEveryExpensePercentage();

        // update month percentage value
        this.calcTotalExpensesPercentage();
        
        // update Balance
        this.updateBalance();
    }

    updateExpeses(newExpense) {
        // push new item to expenses array
        this.expenses.push(newExpense);
        //update the month expense value 
        this.updateIncExpValue('exp');

        // calculate the parcentage of expenses from incomes
        this.calcTotalExpensesPercentage();
        // update Balance
        this.updateBalance();
    }

    updateIncExpValue(type) {
        let sum = 0;
        if(type === 'inc') {
            this.incomes.forEach(income => sum += income.value);
            this.monthIncomesValue = parseFloat(sum.toFixed(2));
        }else if(type === 'exp') {
            this.expenses.forEach(expense => sum += expense.value);
            this.monthExpensesValue = parseFloat(sum.toFixed(2));
        }
    }

    deleteIncome(dataId) {
        const newIncomes = [];
        this.incomes.forEach(income => {
            if(income.id !== dataId) {
                newIncomes.push(income);
            }
        });
        // assign incomes array without the deleted array
        this.incomes = newIncomes;

        // update month Income value
        this.updateIncExpValue('inc');

        // update every expense percentage value
        this.calcEveryExpensePercentage();

        // update month percentage value
        this.calcTotalExpensesPercentage()

        // update balance
        this.updateBalance();
    }

    deleteExpense(dataId) {
        const newExpenses = [];
        this.expenses.forEach(expense => {
            if(expense.id !== dataId) {
                newExpenses.push(expense);
            }
        });
        // assign incomes array without the deleted array
        this.expenses = newExpenses;

        // update month Expenses value
        this.updateIncExpValue('exp');

        // update month percentage value
        this.calcTotalExpensesPercentage()

        //update balance
        this.updateBalance();
    }
}

export default State;