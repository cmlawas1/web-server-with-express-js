/*
    Author: Claizel Coubeili Cepe
    Program Description: Utility code to save an object in a file, and to get all saved items in the file.
*/
import { appendFileSync, readFileSync } from 'node:fs';

// saves one book object in the file named books
const saveBook = (book) => {
    try {
        appendFileSync("books.txt", `${book.name},${book.isbn},${book.author},${book.year}\n`);
    } catch (err) {
        console.log(err);
    }
}

// returns an array of book objects in the file. if the file does not contain anything, will return empty list
const getBooks = () => {
    const books = [];
    try {
        const data = readFileSync("books.txt", "utf-8").split("\n");
        data.pop();

        if (data.length == 0) {
            console.log("The file is empty!");
        } else {
            data.forEach(line => {
                let oneBook = line.split(",");
                books.push({ name: oneBook[0], isbn: oneBook[1], author: oneBook[2], year: oneBook[3] });
            });
        }

    } catch (err) {
        console.log(err);
    }

    return books;
}

export { saveBook, getBooks }
