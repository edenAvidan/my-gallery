'use strict'

function onInit() {
    renderBooks();
}

function renderBooks() {
    const books = getBooksForDisplay();

    const strHTML = books.map(book => {
        return `
        <tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}</td>
        <td>${book.rating}</td>
        <td><button class="read-btn" onclick="onReadBook('${book.id}')">Read</button></td>
        <td><button class="update-btn" onclick="onUpdateBook('${book.id}')">Update</button></td>
        <td><button class="delete-btn" onclick="onRemoveBook('${book.id}')">Delete</button></td>
        </tr>
        `})
    document.querySelector('.books tbody').innerHTML = strHTML.join('');
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onAddBook() {
    const elBookName = document.querySelector('input[name=name]');
    const elBookPrice = document.querySelector('input[name=price]');
    const bookName = elBookName.value.trim();

    elBookName.value = '';

    if (!bookName) {
        elBookName.style.backgroundColor = 'red';
        return;
    }

    addBook(bookName, +elBookPrice.value);
    elBookName.style.backgroundColor = 'white';
    elBookPrice.value = '';
    renderBooks();
}

function onReadBook(bookId) {
    const book = getBookById(bookId);
    const elModal = document.querySelector('.read-modal');

    elModal.querySelector('h2').innerText = book.name;
    elModal.querySelector('img').src = getImg(book);
    elModal.querySelector('.book-id').innerText = book.id;
    elModal.querySelector('.book-price').innerText = book.price;

    const elRating = elModal.querySelector('.rating');

    elRating.querySelector('span').innerText = book.rating
    elRating.querySelector('.minus').onclick = () => onChangeRating(book, -1);
    elRating.querySelector('.plus').onclick = () => onChangeRating(book, 1);

    elModal.classList.add('open');
}

function onCloseModal() {
    const elModal = document.querySelector(`.read-modal`)
    elModal.classList.remove('open');
}

function onSetSortBy(sortBy) {
    setSortBy(sortBy);
    renderBooks();
}

function onChangeRating(book, ratingMod) {
    if (!changeBookRating(book, ratingMod)) return;

    document.querySelector('.rating span').innerText = book.rating;
    renderBooks();
}

function onUpdateBook(bookId) {
    const newPrice = prompt('Enter new price');
    if (!newPrice || +newPrice < 0) return;

    const updatedBook = updateBook(bookId, +newPrice);

    _updateReadModalPrice(updatedBook);
    renderBooks();
}

function _updateReadModalPrice(book) {
    const elModal = document.querySelector('.read-modal');
    const currModalBookId = +elModal.querySelector('.book-id').innerText;
    if (currModalBookId === book.id) {
        elModal.querySelector('.book-price').innerText = book.price;
    }
}
