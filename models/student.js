

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
     firstName: String,
     lastName: String,
     email: {
          type: String,
          required: true, 
          unique: true
     }
});

StudentSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Student', StudentSchema);