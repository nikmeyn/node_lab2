// handle GET requests for [domain]/api/images - return all images
const handleAllImages = (app, Image) => {
    app.route('/api/images')
        .get(function (req,resp) {
            // use mongoose to retrieve all images from Mongo
            Image.find({}, function(err, data) {
                if (err) {
                    resp.json({ message: 'Unable to connect to images' });
                } else {
                    // return JSON retrieved by Mongo as response
                    resp.json(data);
                }
             });
        });
};

// handle requests for specific image: e.g., /api/images/1
const handleSingleImage = (app, Image) => {
    app.route('/api/images/:id')
        .get(function (req,resp) {
            Image.find({id: req.params.id}, (err, data) => {
                if (err) {
                   resp.json({ message: 'Image not found' });
                } else {
                    resp.json(data);
                }
            });
        });
};

// handle requests for specific image by city: e.g., /api/images/city/Calagry
const handleCityImage = (app, Image) => {
    app.route('/api/images/city/:city')
        .get(function (req,resp) {
            Image.find({ 'location.city' : new RegExp(req.params.city, 'i') }, (err, data) => {
                if (err) {
                   resp.json({ message: 'Images from that city are not found' });
                } else {
                    resp.json(data);
                }
            });
        });
};

// handle requests for specific image by country: e.g., /api/images/country/Canada
const handleCountryImage = (app, Image) => {
    app.route('/api/images/country/:country')
        .get(function (req,resp) {
            Image.find({ 'location.country' : new RegExp(req.params.country, 'i') }, (err, data) => {
                if (err) {
                   resp.json({ message: 'Images from that country are not found' });
                } else {
                    resp.json(data);
                }
            });
        });
};

const handleTravelCountries = (app, Image) => {
    app.route('/travel')
        .get(function (req,resp) {
            // use an aggregrate function for this query
            Image.aggregate([
                { $group: { _id: {countryName: "$location.country"} , count: {$sum:1} } } ,
                { $sort: {"_id.countryName":1} }
            ], (err, data) => {
                if (err) {
                    resp.render('error', { page: '/travel'});
                } else {
                    resp.render('countries', { countryData: data });
                }
            });
        });
};

const handleTravelCountryImages = (app, Image) => {
    app.route('/travel/photos/:country')
        .get(function (req,resp) {
            // use an aggregrate function for this query
            Image.find({ 'location.country' : new RegExp(req.params.country, 'i') } , (err, data) => {
                if (err) {
                    resp.render('error', { page: 'travel/photos'});
                } else {
                    resp.render('countryImages', { countryData: data });
                }
            });
        });
};

const handlePageSinglePhoto = (app, Image) => {
    app.route('/travel/photo/:id')
        .get(function (req,resp) {
            Image.find({id: req.params.id}, (err, data) => {
                if (err) {
                    resp.render('error', { page: 'travel/photo'});
                } else {
                    console.log(data[0]);
                    resp.render('photo', { photoData: data[0] });
                }
            });
        });
}

module.exports = { 
    handleAllImages,
    handleSingleImage,
    handleCityImage,
    handleCountryImage,
    handleTravelCountries,
    handleTravelCountryImages,
    handlePageSinglePhoto
};