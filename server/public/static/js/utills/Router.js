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
        console.log(location.pathname);

        let matchRoute;
        this.potentialPaths.forEach(path => {
            if(path.route === location.pathname) matchRoute = path;
        });

        if(!matchRoute) return this.navigateTo('/error404');

        const responseValidateRender = await matchRoute.component.validateRender();
        if(responseValidateRender !== 'ok') return this.navigateTo(responseValidateRender);
        document.getElementById('root').innerHTML = await matchRoute.component.render();
        matchRoute.component.run();

    }

    async navigateTo(url) {
        let existRoute = false;
        this.potentialPaths.forEach(path => {
            if(path.route === url || `${location.origin}${path.route}` === url) existRoute = true;
        });

        
        if(!existRoute) url = `${location.origin}/error404`;

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