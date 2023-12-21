function findAccountById(accounts, id) {
  return accounts.find(account => account["id"] === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => 
    accountA["name"]["last"].toLowerCase() <= accountB["name"]["last"].toLowerCase() ? -1 : 1);
}

function getTotalNumberOfBorrows(account, books) {
  const accId = account["id"];

  return books.reduce((count, book) => {
    const borrows = book["borrows"];
    if (borrows.some(borrow => borrow["id"] === accId)){
      count++;
    }

    return count;
  }, 0); 
}

function getBooksPossessedByAccount(account, books, authors) {
  const accID = account["id"];

  let booksCheckedOut = books.filter(book => {
    const borrows = book["borrows"];
    return borrows.some(borrow => borrow["id"] === accID && !borrow["returned"]);
  });

  booksCheckedOut.forEach(book => {
    const author = authors.find(author => author["id"] === book["authorId"])
    book["author"] = author;
  });

  return booksCheckedOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
