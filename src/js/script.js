document.addEventListener('DOMContentLoaded', function () {
    const itemForm = document.getElementById('item-form');
    const itemInput = document.getElementById('item-input');
    const itemList = document.getElementById('item-list');
    const clearListButton = document.getElementById('clear-list');
    const savedItems = JSON.parse(localStorage.getItem('items')) || [];
    savedItems.forEach(item => addItemToDOM(item));

    itemForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const itemName = itemInput.value.trim();
        if (itemName) {
            const item = { name: itemName, completed: false };
            addItemToDOM(item);
            saveItem(item);
            itemInput.value = '';
        }
    });

    itemList.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') {
            const itemElement = e.target.parentElement;
            const itemName = itemElement.firstChild.textContent.trim();
            itemElement.classList.toggle('completed');
            toggleItemCompleted(itemName);
        }
    });

    clearListButton.addEventListener('click', function () {
        itemList.innerHTML = '';
        localStorage.removeItem('items');
    });

    function addItemToDOM(item) {
        const li = document.createElement('li');
        li.textContent = item.name;

        if (item.completed) {
            li.classList.add('completed');
        }

        const button = document.createElement('button');
        button.textContent = '✔';
        li.appendChild(button);
        itemList.appendChild(li);
    }

    function saveItem(item) {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
    }

    function toggleItemCompleted(itemName) {
        const items = JSON.parse(localStorage.getItem('items'));
        const item = items.find(i => i.name === itemName);
        item.completed = !item.completed;
        localStorage.setItem('items', JSON.stringify(items));
    }
});