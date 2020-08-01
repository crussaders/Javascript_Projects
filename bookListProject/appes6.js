class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        // tr elements
        const row = document.createElement('tr');
        // insert column
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href = "#" class = "delete">X</a></td>
         `;

        list.appendChild(row);
    }

    showAlert(message, className) {
         // create div
        const div = document.createElement('div');
        // add class name
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // get parent
        const container = document.querySelector('.container');
        // get form
        const form = document.querySelector('#book-form');
        // insert alert
        container.insertBefore(div, form);
        // remove after 3 seconds
        setTimeout(function () {
            document.querySelector('.alert').remove();
        },3000);
    }
    
    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Local Storage
class store {
   static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
             books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks() {
        const books = store.getBooks();

        books.forEach(function (book) {
            const ui = new UI;

            ui.addBookToList(book);
        });
    }

    static  addBook(book) {
        const books = store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = store.getBooks();
        books.forEach(function (book,index) {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));

    }
}
// DOM Load Event
document.addEventListener('DOMContentLoaded', store.displayBooks);



document.getElementById('book-form').addEventListener('submit', function(e){

    // get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

        //   instantiate constructor
        const book = new Book(title, author, isbn);

        // instanatiate ui

        const ui = new UI();

        // validate
        if(title === '' || author === '' || isbn === '') {
            // Error alert
            ui.showAlert('Please fill in the details', 'error');

        } else {
            // Add Book to list

            ui.addBookToList(book);

            // Add to local storage
            store.addBook(book);

            // add success alert

            ui.showAlert('Book added!', 'success');

            // clear fields
            ui.clearFields();

        }

      
        // console.log(book);
    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e) {
    // instanatiate ui

    const ui = new UI();
    // Delete Book
    ui.deleteBook(e.target);

    // Delete from Local Storage
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);




   // show alert
   ui.showAlert('Book Removed!', 'success');


   e.preventDefault();
});