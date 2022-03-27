import AbstractView from "./absractView.js";

class NotFound404 extends AbstractView {
    constructor() {
        super();
        
    }

    async getHTML() {
        this.setTitle('BudgetApp | 404 Not Found');
        return /*html*/`<h1 class="heading-1">404 Page Not Found!</h1>`;
    }
};

export default NotFound404;