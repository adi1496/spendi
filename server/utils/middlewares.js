const AppError = require('./../utils/appError.js');

exports.bodyParser = async(req, res, next) => {
    // console.log(req.method, req.headers);
    const isPostPatch = req.method === 'POST' || req.method === 'PATCH';
    if(isPostPatch){
        if(req.headers['content-type'] === 'application/json'){
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            });
        
            req.on('end', async () => {
                try{
                    data = await JSON.parse(data);
                }catch(err) {
                    // console.log(err);
                    next(new AppError('This is not JSON format', 400));
                }
                // console.log(req.headers);
                req.body = data;
                next();
            });
        }
    }else {
        next();
    }
}