import Dashboard from "../views/Dashboard.js";
import Login from "../views/Login.js";

class Router {
    constructor(){
        this.potentialPaths = []; //element example {route: '/home', view: () => {} or class}
    }

    route(route, viewFunction) {
        this.potentialPaths.push({route: route, view: viewFunction});
    }

    async routeTo() {
        let matchRoute;
        this.potentialPaths.forEach(path => {
            if(path.route === location.pathname) matchRoute = path;
        });

        if(!matchRoute) {
            matchRoute = {route: '/error', view: () => console.log('404 not found')};
        }

        document.getElementById('root').innerHTML = await matchRoute.view.getHTML();
    }

    async navigateTo(url) {
        history.pushState(null, null, url);
        await routeTo();
    }

}

// init routers linteners
const initRouterLinteners = async () => {
    // when DOM is loaded then check the path if exists and then load the view for that page
    document.addEventListener('DOMContentLoaded', () => {
        window.router.routeTo();
        
        // listener to all anchor tags <a> that have data-link setted
        document.body.addEventListener('click', e => {
            e.preventDefault();
            if(e.target.dataset.link) window.router.navigateTo(e.target.href);
        })
    });
    
    window.addEventListener('popstate', window.router.routeTo);
}

const initRouter = async () => {
    const router = new Router();

    router.route('/', new Dashboard());

    router.route('/login', new Login());


    window.router = router;
    await initRouterLinteners();
}

export default initRouter;