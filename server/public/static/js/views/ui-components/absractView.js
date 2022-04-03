class AbstractView {
    constructor() {

    }

    setTitle(title) {
        document.title = title;
    }

    async getHTML() {
        return '';
    }

    run() {
        return ;
    }
}

export default AbstractView;