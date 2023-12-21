function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((accumulator, book) => {
    const borrows = book["borrows"];

    if (borrows.some(borrow => !borrow["returned"])) accumulator++;

    return accumulator;
  }, 0);
}

function getMostCommonGenres(books) {
  let mostCommonGeres = [];

  const genreNames = books.map(book => book.genre);
  genreNames.forEach(name => {
    let genre = mostCommonGeres.find(genre =>
      genre.name === name);

    if (genre) {
      // if the genre already in the array, increment its count 
      genre.count++;
    } else{
      // otherwise add a new obj into `mostCommonGeres`
      mostCommonGeres.push({name, count: 1})
    }
  });

  return getMostPopulars(mostCommonGeres, 5);
}

function getMostPopularBooks(books) {

  // Save each book's name and the number of times that has been borrowed as an obj in `mostPopularBooks` 
  let mostPopularBooks = books.reduce((acc, book) => {
    const name = book.title;
    const count = book.borrows.length;

    acc.push({name, count});
    return acc;
  }, []);

  return getMostPopulars(mostPopularBooks, 5);
}

function getMostPopularAuthors(books, authors) {
  let mostPopularAuthors = [];

  // Loop through authors array
  authors.forEach(author => {
    // Filter books array by `authorId`
    const booksByAuthor = books.filter(book => book.authorId === author.id);

    // Loop through books of certain author to count the times for his/her books that have been borrowed
    let count = 0;
    booksByAuthor.forEach(book =>count += book.borrows.length);

    const name = `${author.name.first} ${author.name.last}`;

    mostPopularAuthors.push({name, count});
  });

  return getMostPopulars(mostPopularAuthors, 5);
}

// Helper function: get the designated length of subarray from the given array
function getMostPopulars(arr, len) {
  let result = [];

  if (!arr || arr.length === 0) return result;

  arr.sort((eleA, eleB) => eleA.count < eleB.count ? 1 : -1);

  if (arr.length <= len) return arr;

  for (let i = 0; i < len; i++) {
    result.push(arr[i]);
  }

  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
