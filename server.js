//import statements
import express from 'express';
const app = express();
import {saveBook, getBooks} from './utils.js';

//to parse the body of the request
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//add book
app.post('/add-book', (req,res) => {    
    if(Object.values(req.body).length == 4) { //checks if all parameter values are present
        if(req.body.name != "" && req.body.isbn != "" && req.body.author != "" &&req.body.year != "") { //checks if all parameter values are not empty
            saveBook(req.body); //saves book to text file if conditions are satisfied
            res.send({success:true}); //value returned by the server
        } else {
            res.send({success:false});
        }
    } else {
        res.send({success:false});
    }
});

//finds book using isbn and author
app.get('/find-by-isbn-author', (req,res) => {
    let books = getBooks();
    let oneBook = []; //holder of book that has the same isbn and author

    //checks if queried isbn and author exist in books.txt
    for(let i = 0; i < books.length; i++) {
        if(books[i].isbn == req.query.isbn && books[i].author == req.query.author) {
            oneBook = [].concat.apply([], Object.values(books[i])); //places values in Object books[i] into an array
            oneBook = oneBook.join(','); //turns array of books[i] values into a string
        }
    }

    //checks if oneBook is an empty array
    if(oneBook.length > 0) {
        res.send(oneBook); //sends oneBook if book by author is found
    } else {
        res.send(''); //sends nothing if book is not found
    }
});

//finds book using author
app.get('/find-by-author', (req,res) => {
    let books = getBooks();
    let matchedbooks = []; //array holder of all matched books by author
    
    //finds books written by author using a for loop
    for(let i = 0; i < books.length; i++) {
        if(books[i].author == req.query.author) {
            let oneBook = [].concat.apply([], Object.values(books[i])); //places values in Object books[i] into an array
            oneBook = oneBook.join(',');
            matchedbooks.push(oneBook); //appends book in matchedbooks if a book by author is found
        }
    }

    //checks if matchedbooks is an empty array
    if(matchedbooks.length > 0) {
        res.send(matchedbooks.join('<br/>')); //sends matchedbooks content if book(s) by author is/are found
    } else {
        res.send(''); //sends nothing if no books by author are found
    }
});

app.listen(3000,() => {
    console.log('Server started at port 3000');
});