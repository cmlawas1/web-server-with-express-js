import needle from 'needle';

/* tests for POST /add-book */

//object with complete keys and non-empty values
needle.post('http://localhost:3000/add-book', {
    name: 'Harry Potter and the Philosopher’s Stone',
    isbn: '978-0-7475-3269-9',
    author: 'J.K Rowling',
    year: '1997'
}, (err,res) => {
    console.log(res.body);
});

//object with 1 missing key
needle.post('http://localhost:3000/add-book', {
    name: 'Harry Potter and the Philosopher’s Stone',
    isbn: '978-0-7475-3269-9',
    author: 'J.K Rowling'
}, (err,res) => {
    console.log(res.body);
});

//object with complete keys but 1 key has an empty string as its value
needle.post('http://localhost:3000/add-book', {
    name: 'The Little Prince',
    isbn: '978-0156012195',
    author: '',
    year: '1943'
}, (err,res) => {
    console.log(res.body);
});

/* tests for GET /find-by-isbn-author */

//ISBN not existing
needle.get('http://localhost:3000/find-by-isbn-author?isbn=111111&author=J.K+Rowling', (err,res) => {
    console.log(res.body);
});

//author not existing
needle.get('http://localhost:3000/find-by-isbn-author?isbn=978-0-7475-3269-9&author=M+Meyer', (err,res) => {
    console.log(res.body);
});

//isbn and author is not existing
needle.get('http://localhost:3000/find-by-isbn-author?isbn=1746373-2343-2&author=M+Meyer', (err,res) => {
    console.log(res.body);
});

//isbn and author is found
needle.get('http://localhost:3000/find-by-isbn-author?isbn=978-0-7475-3269-9&author=J.K+Rowling', (err,res) => {
    console.log(res.body);
});

/* tests for GET /find-by-author */

//author is found
needle.get('http://localhost:3000/find-by-author?author=J.K+Rowling', (err,res) => {
    console.log(res.body);
});

//author is not found
needle.get('http://localhost:3000/find-by-author?author=M+Meyer', (err,res) => {
    console.log(res.body);
});