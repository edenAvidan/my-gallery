'use strict'

const BOOKS_KEY = 'bookDB'

const IMG_NOT_FOUND = 'imgs/img not found.png';

const BOOK_RATING_MIN = 0;
const BOOK_RATING_MAX = 10;

var gBooks;
var gSortBy = { method: '', direction: 1 };

_createBooks();

function getBooksForDisplay() {
    switch (gSortBy.method) {
        case 'ID':
            return gBooks.sort((b1, b2) => (b1.id - b2.id) * gSortBy.direction);
        case 'NAME':
            return gBooks.sort((b1, b2) => {
                return b1.name.toLowerCase().localeCompare(b2.name.toLowerCase()) * gSortBy.direction
            });
        case 'PRICE':
            return gBooks.sort((b1, b2) => (b1.price - b2.price) * gSortBy.direction)
        case 'RATEING':
            return gBooks.sort((b1, b2) => (b1.rating - b2.rating) * gSortBy.direction)
        default:
            return gBooks;
    }
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId);
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function updateBook(bookId, newPrice) {
    const bookToUpdate = getBookById(bookId);
    bookToUpdate.price = newPrice;
    _saveBooksToStorage();
    return bookToUpdate;
}

function addBook(name, price) {
    gBooks.unshift(_createBook(name, price));
    _saveBooksToStorage();
}

function getImg(book) {
    return isFileExists(book.imgUrl) ? book.imgUrl : IMG_NOT_FOUND;
}

function getBookById(bookId) {
    console.log(gBooks);
    console.log(gBooks.find(book => book.id === bookId));
    return gBooks.find(book => book.id === bookId);
}

function setSortBy(sortMethod) {
    gSortBy.direction = (sortMethod === gSortBy.method) ? gSortBy.direction * -1 : 1;
    gSortBy.method = sortMethod;
}

function changeBookRating(book, ratingMod) {
    if ((book.rating === BOOK_RATING_MIN && ratingMod === -1) ||
        (book.rating === BOOK_RATING_MAX && ratingMod === 1)) return false;

    book.rating += ratingMod;
    _saveBooksToStorage();
    return true;
}

function _createBooks() {
    gBooks = loadFromStorage(BOOKS_KEY);

    if (gBooks && gBooks.length) return;

    gBooks = [
        _createBook('A Game of Thrones', 75),
        _createBook('The Eye of the World', 59),
        _createBook('Blood of Elves', 99)
    ]
    _saveBooksToStorage();
}

function _createBook(name, price) {
    return {
        id: makeId(),
        name: name,
        price: price,
        imgUrl: `imgs/${name}.png`,
        rating: 0
    };
}

function _saveBooksToStorage() {
    saveToStorage(BOOKS_KEY, gBooks);
}
