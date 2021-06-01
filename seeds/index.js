const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60acaf0615cd22dbcd423cae',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'this is description of cmapsites',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dxm5klwte/image/upload/v1622258870/Yelpcamp/ds2w6bo9ozy4y2xy1i1s.jpg',
                    filename: 'YelpCamp'
                },
                {
                    url: 'https://res.cloudinary.com/dxm5klwte/image/upload/v1622258685/Yelpcamp/az7rdykgebvai2bq1mik.jpg',
                    filename: 'YelpCamp'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})