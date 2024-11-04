const mongoose = require('mongoose');
const Result = require('../models/Result.js'); // Import the Result model

mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const results = [
  {
    questionId: "q1",
    heading: "Benefits by status",
    responses: {
      yes: {
        citizen: "Here is a list of scholarships for citizens",
        pr: "Here is a list of scholarships for permanent residents",
        temporary: "Here is a list of scholarships for temporary residents",
        special: "Here is a list of scholarships for special status"
      },
      no: {
        default: "No problem! Feel free to explore other resources."
      }
    }
  },
  {
    questionId: "q2",
    heading: "Benefits by status",
    responses: {
      yes: {
        citizen: "Here is a list of scholarships for citizens",
        pr: "Here is a list of scholarships for permanent residents",
        temporary: "Here is a list of scholarships for temporary residents",
        special: "Here is a list of scholarships for special status"
      },
      no: {
        default: "No problem! Feel free to explore other resources."
      }
    }
  }
];

Result.insertMany(results)
  .then(() => {
    console.log("Data inserted");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
    mongoose.connection.close();
  });