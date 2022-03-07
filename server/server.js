const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: `${__dirname}/config.env`});

const app = require('./app.js');

console.log(process.env.NODE_ENV);

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log('The app is listening on port ' + port);
});


const db = process.env.DB_DEV

mongoose.connect(db, {  
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database successfully connected...📟');
}).catch(err => {
    console.log(err);
});