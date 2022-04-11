// routes imports
import Router from './utills/Router.js';
import Dashboard from "./views/ui-components/Dashboard.js";
import Login from "./views/ui-components/Login.js";
import SignUp from "./views/ui-components/SignUp.js";
import NotFound404 from "./views/ui-components/notFound404.js";
import NewAccountPage from './views/ui-components/newAccountConfig.js';

// import controllers
import {loginController, signupController, loginWithGoogle, logout} from "./controllers/authController.js";
import * as dashboardController from './controllers/dashboardController.js';
import {newAccountLinstener} from './controllers/newAccountController.js';


console.log('The js is loaded');
const AppState = {working: true};
const appInit = () => {
    window.appState = {};
    console.log(AppState);
}

const initRouter = async () => {
    const router = new Router();

    router.route('/error404', new NotFound404());

    router.route('/', new Dashboard());

    router.route('/login', new Login());

    router.route('/signup', new SignUp());

    router.route('/new-account-config', new NewAccountPage());

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


        if(location.pathname === '/') dashboardController.dashboardListeners(event);
        if(location.pathname === '/new-account-config') newAccountLinstener(event);

    });

}

appInit();
initRouter();
initListeners();


