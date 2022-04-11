import {logout} from './../controllers/authController.js';

const getAuthHeader = () => {
    const jwt = localStorage.getItem('jwt');
    if(!jwt) logout();

    return `Bearer ${jwt}`;
    // return 'x';
}

export const fetchPost = async (url, authNeeded, body, headers) => {
    const options = {
        method: 'POST',
        mode: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    if(authNeeded) options.headers.authorization = getAuthHeader();

    // authorization
    if(headers && typeof headers === 'object') {
        for(let prop in headers) {
            options.headers[prop] = headers[prop]
        };
    }

    const response = await fetch(url, options);

    const json = await response.json();

    return json;
}

export const fetchGet = async (url, authNeeded, headers) => {
    const options = {
        method: 'GET',
        mode: 'same-origin',
        headers: {},
    }

    if(authNeeded) options.headers.authorization = getAuthHeader();

    // authorization
    if(headers && typeof headers === 'object') {
        for(let prop in headers) {
            options.headers[prop] = headers[prop]
        };
    }

    const response = await fetch(url, options);
    // console.log(response);

    const json = await response.json();

    return json;
}