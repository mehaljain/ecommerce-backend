const mongoose = require("mongoose");

// const DB =process.env.DATABASE;

const dbConnection = mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

module.exports = dbConnection;
