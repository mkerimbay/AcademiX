const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfessorSchema = new Schema({
     firstName: String,
     lastName: String,
     email: String,
     rank: String
});

module.exports = mongoose.model('Professor',ProfessorSchema);