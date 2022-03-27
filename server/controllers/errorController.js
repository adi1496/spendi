const sendErrorDev = (res, err) => {
    console.log(err);


    res.status(err.statusCode).json({
        message: err.message,
        err
    })
}


const sendErrorProd = (res, err) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development') return sendErrorDev(res, err);

    if(process.env.NODE_ENV === 'production'){
        // it is not done yet
        console.log(err._message);
        let error = {...err};
        // if(err._message.split(' ').includes('validation')) console.log('yes');
        


        sendErrorProd(res, err);
    }
}