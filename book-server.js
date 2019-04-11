
const Book = require('./models/Book');
const bookRouter = require('./handlers/bookRouter.js');

bookRouter.handleAllBooks(app, Book);
bookRouter.handleSingleBook(app, Book);
bookRouter.handleBooksByPageRange(app, Book);
bookRouter.handleAllCategories(app, Book);
bookRouter.handleCreateBook(app, Book);
bookRouter.handlePageBooks(app, Book);
bookRouter.handlePageSingleBook(app, Book);


