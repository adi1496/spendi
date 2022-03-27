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
        return false;
    }
}

export default AbstractView;