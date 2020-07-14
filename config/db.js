//var mongoose = require("mongoose");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// Replace this with your MONGOURI.
const MONGOURI = "mongodb://localhost:27017/test";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;