const listItems = document.querySelectorAll('#list-item');

listItems.forEach(item => {
    item.addEventListener('click', e => {
        e.currentTarget.childNodes[7].classList.toggle('transactions__item__options--visible');
    })
})

