const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  citizen: { type: String, required: false },
  pr: { type: String, required: false },
  temporary: { type: String, required: false },
  special: { type: String, required: false },
  default: { type: String, required: false }
}, { _id: false });

const resultSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Use _id as the identifier
  heading: { type: String, required: true },
  responses: {
    yes: { type: responseSchema, required: false },
    no: { type: responseSchema, required: false }
  }
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;