// handle GET requests for [domain]/api/books - return all books
const handleAllBooks = (app, Book) => {
    app.route('/api/books')
        .get(function (req,resp) {
            // use mongoose to retrieve all books from Mongo
            Book.find({}, function(err, data) {
                if (err) {
                    resp.json({ message: 'Unable to connect to books' });
                } else {
                    // return JSON retrieved by Mongo as response
                    resp.json(data);
                }
             });
        });
};
// handle requests for specific book: e.g., /api/books/0321886518
const handleSingleBook = (app, Book) => {
    app.route('/api/books/:isbn')
        .get(function (req,resp) {
            Book.find({isbn10: req.params.isbn}, (err, data) => {
                if (err) {
                   resp.json({ message: 'Book not found' });
                } else {
                    resp.json(data);
                }
            });
        });
};
const handleBooksByPageRange = (app, Book) => {
    app.route('/api/books/pages/:min/:max')
        .get(function (req,resp) {
            Book.find().where('production.pages')
                .gt(req.params.min)
                .lt(req.params.max)
                .sort({ title: 1})
                .select('title isbn10')
                .exec( function(err, data) {
                    if (err) {
                        resp.json({ message: 'Books not found' });
                    } else {
                        resp.json(data);
                }
            });
        });
};

const handleAllCategories = (app, Book) => {
    app.route('/api/categories')
        .get(function (req,resp) {
            // use an aggregrate function for this query
            Book.aggregate([
                { $group: {_id: "$category.main", count: {$sum:1}} },
                { $sort: {_id:1} }
            ], (err, data) => {
                if (err) {
                    resp.json({ message: 'Unable to connect to books' });
                } else {
                    resp.json(data);
                }
            });
        });
};

const handleCreateBook = (app, Book) => {
    app.route('/api/create/book')
        .post(function (req, resp){
            //get form data from http request
            const aBook = {
                isbn10 : req.body.isbn10,
                isbn13 : req.body.isbn13,
                title : req.body.title,
                year : req.body.year,
                publisher : req.body.publisher,
                production: {
                    pages: req.body.pages
                }
            };
            Book.create(aBook, function (err, data){
                if (err){
                    resp.json({message:'Unable to connect to books'});
                }else{
                    const msg = `New Book was saved isbn=${aBook.isbn10}`;
                    resp.json({message:msg});
                }
            });
        });
};


const handlePageBooks = (app, Book) => {
    app.route('/site/list')
        .get(function (req,resp) {
            Book.find({}, function(err, data) {
                if (err) {
                    resp.render('error', { page: 'site/list'});
                } else {
                    resp.render('list', { bookData: data });
                }
            });
        });
};

const handlePageSingleBook = (app, Book) => {
    app.route('/site/book/:isbn')
        .get(function (req,resp) {
            Book.find({isbn10: req.params.isbn}, (err, data) => {
                if (err) {
                    resp.render('error', { page: 'site/book'});
                } else {
                    resp.render('book', { bookData: data[0] });
                }
            });
        });
}

module.exports = { 
    handleAllBooks,
    handleSingleBook,
    handleBooksByPageRange,
    handleAllCategories,
    handleCreateBook,
    handlePageBooks,
    handlePageSingleBook
};