export const fetchPost = (url, body, headers) => {
    const options = {
        method: 'POST',
        mode: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    // authorization
    if(headers && typeof headers === 'object') {
        for(let prop in headers) {
            options.headers[prop] = headers[prop]
            if(prop === 'authorization') options.headers[prop] = `Bearer ${headers[prop]}`;
        };
    }

    return fetch(url, options);
}

export const fetchGet = (url, headers) => {
    const options = {
        method: 'GET',
        mode: 'same-origin',
        headers: {},
    }

    // authorization
    if(headers && typeof headers === 'object') {
        for(let prop in headers) {
            options.headers[prop] = headers[prop]
            if(prop === 'authorization') options.headers[prop] = `Bearer ${headers[prop]}`;
        };
    }

    // console.log(options);

    return fetch(url, options);
}