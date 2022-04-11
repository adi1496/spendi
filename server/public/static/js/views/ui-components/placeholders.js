export const transactionItem = 
/*html*/`<li class="transactions__item" id="list-item" data-id="%data-id%">
    <div class="transactions__item__name %class-red%">%category%</div>
    <div class="transactions__item__date">%date%</div>
    <div class="transactions__item--description">%description%</div>
    <div class="transactions__item__value %class-red%">%value% %currency% %percent-span%</div>
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