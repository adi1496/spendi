const sendErrorDev = (res, err) => {
    console.log(err);


    res.status(err.statusCode).json({
        message: err.message,
        err
    })
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development') return sendErrorDev(res, err);

    if(process.env.NODE_ENV === 'production'){
        // it is not done yet
        console.log(err);

        res.stauts(500).json({
            stauts: 'Error',
            message: 'Not yet implemented'
        })
    }
}