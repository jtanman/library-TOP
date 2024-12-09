const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function toggleReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks();
}

function displayBooks() {
  const booksContainer = document.querySelector('.books-container');
  booksContainer.innerHTML = ''; // Clear the container
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
      <h2>${book.title}</h2>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? 'Yes' : 'No'}</p>
      <button class="toggle-read-button" data-index="${index}">Toggle Read Status</button>
      <button class="remove-book-button" data-index="${index}">Remove Book</button>
    `;
    booksContainer.appendChild(bookCard);
  });

  document.querySelectorAll('.remove-book-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      removeBookFromLibrary(index);
    });
  });

  document.querySelectorAll('.toggle-read-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      toggleReadStatus(index);
    });
  });
}

document.getElementById('add-book-button').addEventListener('click', () => {
  const form = document.getElementById('book-form');
  form.style.display = form.style.display === 'none' ? '' : 'none';
});

document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  addBookToLibrary(title, author, pages, read);
  document.getElementById('book-form').reset();
  document.getElementById('book-form').style.display = 'none';
});

document.getElementById('pages').addEventListener('input', function() {
  if (this.validity.patternMismatch) {
    this.setCustomValidity('Please input a number');
  } else {
    this.setCustomValidity('');
  }
});

// Example usage:
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, false);
addBookToLibrary('1984', 'George Orwell', 328, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, true);
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, false);
console.log(myLibrary);
