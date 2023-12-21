function findAuthorById(authors, id) {
  return authors.find(author => author["id"] === id);
}

function findBookById(books, id) {
  return books.find(book => book["id"] === id);
}

function partitionBooksByBorrowedStatus(books) {
  const booksCheckedOut = books.reduce((accumulator, book) => {
    const borrows = book["borrows"];
    if (borrows.some(borrow => !borrow["returned"])) accumulator.push(book);

    return accumulator;
  }, []);

  const booksReturned = books.reduce((accumulator, book) => {
    const borrows = book["borrows"];
    if (borrows.every(borrow => borrow["returned"])) accumulator.push(book);

    return accumulator;
  }, []);

  return [booksCheckedOut, booksReturned];
}

function getBorrowersForBook(book, accounts) {
  const borrows = book["borrows"];

  const borrowers = borrows.reduce((accumulator, borrow) => {
    let account = accounts.find(account => account["id"] === borrow["id"])
    account["returned"] = borrow["returned"];
    accumulator.push(account);

    return accumulator;
  }, []);

  if (borrowers.length > 10) return getSubarray(borrowers, 10);

  return borrowers;
}

/* Helper function: get the designated length of subarray from the given array */
function getSubarray(arr, len) {
  let result = [];

  if (arr.length !== 0) {
    for (let i = 0; i < len; i++) {
      result.push(arr[i]);
    }
  }

  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
