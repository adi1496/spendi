class AbstractView {
    constructor() {

    }

    setTitle(title) {
        document.title = title;
    }

    async getHTML() {
        return '';
    }
}

export default AbstractView;