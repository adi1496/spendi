// routes imports
import Router from './utills/Router.js';
import Dashboard from "./views/ui-components/Dashboard.js";
import Login from "./views/ui-components/Login.js";
import SignUp from "./views/ui-components/SignUp.js";
import NotFound404 from "./views/ui-components/notFound404.js";

// import controllers
import {loginController, signupController, loginWithGoogle, logout} from "./controllers/authController.js";

console.log('The js is loaded');
const appInit = () => {
    window.appState = {};
}

const initRouter = async () => {
    const router = new Router();

    router.route('/error', new NotFound404());

    router.route('/', new Dashboard(), {loginRequired: true, redirect: '/login'});

    router.route('/login', new Login(), {blockedWhenLogged: true, redirect: '/'});

    router.route('/signup', new SignUp(), {blockedWhenLogged: true, redirect: '/'});

    window.router = router;
    await window.router.routeTo();
    await window.router.initRouterLinteners();
}

const initListeners = () => {
    document.body.addEventListener('click', event => {
        event.preventDefault();
        console.log(event.target);

        // user auth
        if(event.target.id === 'sign-up-btn') signupController();
        if(event.target.id === 'login-btn') loginController();
        if(event.target.id === 'logout-btn') logout();
        if(event.target.id === 'login-with-google-btn') loginWithGoogle();
    });
}

appInit();
initRouter();
initListeners();


