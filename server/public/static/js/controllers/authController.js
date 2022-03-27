import {fetchPost} from './../utills/fetch.js';

export const signupController = async () => {
    const signUpForm = document.getElementById('loginForm');

    const formData = new FormData(signUpForm);
    const body = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('password-confirm')
    }

    const response = await fetchPost('/api/v1/users/signup', body);

    const json = await response.json();
    
    if(json.status === 'error' || json.status === 'fail'){
        // show the error on the screen
        console.log(json.message);
        return alert(json.message);
    }

    //show message on the screen
    console.log(json);
    alert(json.message);
    // history.pushState(null, null, '/created');
}

export const loginController = async () => {
    const loginForm = document.getElementById('loginForm');

    const formData = new FormData(loginForm);
    const body = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    const response = await fetchPost('/api/v1/users/login', body);

    const json = await response.json();
    
    if(json.status === 'error' || json.status === 'fail'){
        // show the error on the screen
        console.log(json.message);
        return alert(json.message);
    }

    //show message on the screen
    console.log(json);

    // save the token in localStorage
    window.localStorage.setItem('jwt', json.token);

    // alert message
    // alert('You are logged in!');
    window.location.reload();
}


export const loginWithGoogle = () => {
    alert('This button is not working yet!');
}

export const logout = () => {
    window.localStorage.removeItem('jwt');
    window.location.reload();
}