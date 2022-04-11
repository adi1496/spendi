exports.transactionQuery = (query) => {
    // lt/gt = lower/greater than; gte/lte = lower/greater than or equal
    const comparationSymbols = ['gt', 'lt', 'gte', 'lte'];
    console.log(query);
    const result = {};
    const excludeFields = ['year'];


    result.options = {};
    for(let prop in query) {
        let isExcluded = false;
        excludeFields.forEach(field => {if(field === prop) isExcluded = true;})
        if(isExcluded) continue;

        if(typeof query[prop] === 'string') result.options[prop] = query[prop].split(',');
        if(typeof query[prop] === 'object') {
            const objProp = {};
            for(let symbol in query[prop]) {
                if(comparationSymbols.includes(symbol)) objProp['$' + symbol] = query[prop][symbol];
            }
            result.options[prop] = objProp;
        }
        console.log(typeof query[prop]);
        // result.options[prop] = query[prop]
    }

    console.log(result);
    return result.options;

}