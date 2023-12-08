const User = require('../models/user')

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/academix');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});


const seedDB = async () => {
    await User.deleteMany({});

    // for (const course of fake_courses) {
    // const c = new Course(course);
    // await c.save();
    // }
}
    

seedDB().then(() => {
    mongoose.connection.close()
})