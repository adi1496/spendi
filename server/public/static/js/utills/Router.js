import {fetchGet} from './fetch.js';

class Router {
    constructor(){
        this.potentialPaths = [];
    }

    route(route, viewFunction, options) {
        if(!options) options = {};
        this.potentialPaths.push({route: route, component: viewFunction, options});
    }

    async routeTo() {
        let matchRoute;
        this.potentialPaths.forEach(path => {
            if(path.route === location.pathname) matchRoute = path;
        });

        if(!matchRoute) return this.navigateTo('/error');
        
        let userLogged = await this.isLogged();
        // console.log(userLogged);

        if(matchRoute.options.loginRequired && !userLogged) return this.navigateTo('/login');

        if(userLogged && matchRoute.options.blockedWhenLogged) return this.navigateTo('/');

        document.getElementById('root').innerHTML = await matchRoute.component.getHTML();
        matchRoute.component.run();

    }

    async isLogged() {
        const token = window.localStorage.getItem('jwt');
        if(!token) return false;

        const response = await fetchGet('/api/v1/users/logged-client', {authorization: token});

        const json = await response.json();
        
        if(json.status === 'error' || json.status === 'fail'){
            // show the error on the screen
            console.log(json.message);
            alert(json.message);
            window.localStorage.removeItem('jwt');
            return false;
        }

        // console.log(json);
        window.appState.user = json.user;
        return true;
    }

    async navigateTo(url) {
        let existRoute = false;
        this.potentialPaths.forEach(path => {
            if(path.route === url || `${location.origin}${path.route}` === url) existRoute = true;
        });

        
        if(!existRoute) url = `${location.origin}/error`;

        history.pushState(null, null, url);
        await this.routeTo();
    }

    // init routers linteners
    async initRouterLinteners() {
            
        // listener to all anchor tags <a> that have data-link setted
        document.body.addEventListener('click', e => {
            e.preventDefault();
            if(e.target.dataset.link) window.router.navigateTo(e.target.href);
        })
        
        window.addEventListener('popstate', e => {
            e.preventDefault();
            window.router.routeTo()
        });
    }

}

export default Router;