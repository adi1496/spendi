import AbstractView from "./absractView.js";

class NotFound404 extends AbstractView {
    constructor() {
        super();
        this.title ='BudgetApp | 404 Not Found';
    }

    async validateRender() {
        return 'ok';
    }

    async render() {
        this.setTitle();
        return /*html*/`<h1 class="heading-1">404 Page Not Found!</h1>`;
    }
};

export default NotFound404;