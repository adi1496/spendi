class AbstractView {
    constructor() {
        this.title = undefined;
        this.html = undefined;
        this.redirect = undefined;
    }

    setTitle() {
        document.title = this.title;
    }

    async validateRender() {
        return;
    }


    run() {
        return ;
    }


    async render() {
        return '';
    }
}

export default AbstractView;