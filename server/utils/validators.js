
// check if POST and PATH methods has body empty
exports.checkBody = (req, res, next) => {
    if(!req.method === 'POST' || !req.method === 'PATCH') return next();
    if(!req.body) return res.status(400).json({
        status: 'fail',
        message: 'There is no data in this request!'
    });

    next();
}



// validate email address
exports.validateEmail = (email) => {
    email = email.split('');
    let at = [];
    email.forEach( (el, i) => {
        if(el === '@') {
            at.push(el);
            at.push(i);
        }
    });

    if(at === [] || at.length > 2) return false;

    let lettersAfterDot = 0;
    let dot = [];
    for(let i = email.length - 1; i > at[1]; i--) {
        if(email[i] !== '.') {
            lettersAfterDot++;
        }else if(email[i] === '.'){
            dot.push(email[i]);
            dot.push(i);
        }
    }

    if(dot === [] || lettersAfterDot < 2 || dot.length > 4) return false;

    return true;

}