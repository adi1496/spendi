import AbstractView from "./absractView.js";

class AddNewTransaction extends AbstractView {
    constructor() {
        super();

    }

    async getHTML() {
        return `<div class="dark-screen" id="dark-screen-popup">
        <div class="add-new">
            <h4 class="heading-4">Add New Income</h4>
            
            <input type="number" class="add-new__input-value" id="input-value" step="0.1"
            placeholder="Enter the amount here:" autocomplete="off">

            <div class="add-new__categories-list">
                <label class="add-new__category-item" for="{%item-id%}">
                    <input type="radio" class="add-new__radio-btn" id="{%item-id%}" name="category-item">
                    <svg class="add-new__category-icon">
                        <use xlink:href="img/svg/category-icons.svg#icon-coin-euro"></use>
                    </svg>
                    <div class="add-new__category-description">Salary</div>
                </label>
                
            </div>

            <input type="text" class="add-new__description" placeholder="Type a note">

            <div class="buttons">
                <button class="new-btn" id="cancel-popup-btn">Cancel</button>
                <button class="new-btn add-btn" data-type="{%add-type%}" id="submit-btn">Add New Income</button>
            </div>
        </div>
        </div>`;
    }
};


const exampleExpense = `<li class="transactions__item" id="list-item" data-id="1646145533229" data-type="-">
<div class="transactions__item__name transactions__item__name--red">Food</div>
<div class="transactions__item--description">Eat restaurant Bravisol</div>
<div class="transactions__item__value transactions__item__value--red">13 € <span class="transactions__item--percent" id="item-percent">153%</span></div>
<div class="transactions__item__options">
    <div class="transactions__item--edit" id="item-edit">
        <svg class="transactions__item-icon transactions__item-icon--edit">
            <use xlink:href="img/svg/icons.svg#icon-pencil"></use>
        </svg>
    </div>
    <div class="transactions__item--delete" id="item-delete">
        <svg class="transactions__item-icon transactions__item-icon--delete">
            <use xlink:href="img/svg/icons.svg#icon-cancel-circle"></use>
        </svg>
    </div>
</div>
</li>`;


export default TransactionItem;