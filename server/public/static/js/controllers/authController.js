import {fetchPost, fetchGet} from './../utills/fetch.js';

// SignUp Controller
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

    const response = await fetchPost('/api/v1/users/signup', false, body);
    
    if(response.status === 'error' || response.status === 'fail'){
        // show the error on the screen
        console.log(response.message);
        return alert(response.message);
    }

    //show message on the screen
    console.log(response);
    alert(response.message);
    // history.pushState(null, null, '/created');
}


// Login Controller
export const loginController = async () => {
    const loginForm = document.getElementById('loginForm');

    const formData = new FormData(loginForm);
    const body = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    const response = await fetchPost('/api/v1/users/login', false, body);
    
    if(response.status === 'error' || response.status === 'fail'){
        // show the error on the screen
        console.log(response.message);
        return alert(response.message);
    }

    //show message on the screen
    console.log(response);

    // save the token in localStorage
    window.localStorage.setItem('jwt', response.token);

    // alert message
    // alert('You are logged in!');
    window.location.reload();
}

// Check if User is Logged In Controller
export const isLoggedIn = async () => {
    const token = window.localStorage.getItem('jwt');
    if(!token) return false;

    const response = await fetchGet('/api/v1/users/logged-client', true);
    
    if(response.status === 'error' || response.status === 'fail'){
        // show the error on the screen
        console.log(response.message);
        alert(response.message);
        window.localStorage.removeItem('jwt');
        return false;
    }

    // console.log(response);
    window.appState.user = response.user;
    return true;
}


// Login With Google Controller ---- in progress
export const loginWithGoogle = () => {
    alert('This button is not working yet!');
}


// Logout Controller
export const logout = () => {
    window.localStorage.removeItem('jwt');
    window.location.reload();
}