// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI Constructor

function UI () {}

// add book to list

UI.prototype.addBookToList = function(book) {
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
// show alert
UI.prototype.showAlert = function(message, className) {
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

UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}



// clear fields

UI.prototype.clearFields = function() 
{
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}




// Event Listener for add book

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

            // add success alert

            ui.showAlert('Book added!', 'success');

            // clear fields
            ui.clearFields();

        }

      
        // console.log(book);
    e.preventDefault();
});

// add event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
     // instanatiate ui

     const ui = new UI();

     ui.deleteBook(e.target);
    // show alert
    ui.showAlert('Book Removed!', 'success');


    e.preventDefault();
});