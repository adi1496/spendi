const fs = require('fs');

const mongoose = require('mongoose');

const transactionsSchema = require('./transactionsSchema.js');

const db = 'mongodb://localhost:27017/budget-app'

mongoose.connect(db, {  
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database successfully connected...📟');
}).catch(err => {
    console.log(err);
});

const insert = async (array, userId, type) => {
    array.forEach(async el => {
        const transaction = {
            type: type,
            category: el.name,
            date: new Date(Date.now()),
            value: el.value,
            description: el.description,
            userId: userId
        }

        const Transaction = mongoose.model(`${userId}-${transaction.date.getFullYear()}`, transactionsSchema);

        const newTransaction = await Transaction.create(transaction);

        console.log(newTransaction);
    });
}

const getData = async () => {
    const file = fs.readFileSync(`./data.json`, 'utf-8');

    const json = JSON.parse(file);
    const userId = '6224c67781b7b204a478998e';

    // console.log(json.incomes);
    // await insert(json.incomes, userId, 'income');
    await insert(json.expenses, userId, 'expense');
};

getData();