const express = require('express');

const ownMiddlewares = require('./utils/middlewares.js');
const validators = require('./utils/validators.js');
const errorController = require('./controllers/errorController.js');

const userRouter = require('./routes/userRoutes.js');
const transactionsRouter = require('./routes/transactionRoutes.js');

const app = express();

app.use((req, res, next) => {
    // console.log(req.path);
    next();
})

app.use(ownMiddlewares.bodyParser);

app.get('/', (req, res) => {
    res.end('It is working');
})


app.use('/api/v1/users', userRouter);
app.use('/api/v1/transactions', transactionsRouter);

app.use((error, req, res, next) => {
    // console.log(error);
    errorController(error, req, res, next);
})

module.exports = app;