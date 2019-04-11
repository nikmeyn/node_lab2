
const Image = require('./models/Image');
const imageRouter = require('./handlers/imageRouter.js');

imageRouter.handleAllImages(app, Image);
imageRouter.handleSingleImage(app, Image);
imageRouter.handleCityImage(app, Image);
imageRouter.handleCountryImage(app, Image);
imageRouter.handleTravelCountries(app, Image);
imageRouter.handleTravelCountryImages(app, Image);
imageRouter.handlePageSinglePhoto(app, Image);

