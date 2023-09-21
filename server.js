const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Parse JSON request bodies
app.use(express.json());

// Handle CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Serve static files from a directory
app.use(express.static('public'));


mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });


// Define API route
app.get("/api/data", (req, res) => {
  const responseData = { message: "Hello from the backend!" };
  res.json(responseData);
});

app.get("/api/register", (req, res) => {
  const responseRegister = { message: "Hello from the register backend!" };
  res.json(responseRegister);
});

app.get("/api/contact", (req, res) => {
  const responseContact = { message: "Hello from the contact backend!" };
  res.json(responseContact);
});

app.get("/api/insert", (req, res) => {
  const responseInsert = { message: "Hello from the cart insert backend!" };
  res.json(responseInsert);
});

app.get("/api/delete", (req, res) => {
  const responseDelete = { message: "Hello from the cart delete backend!" };
  res.json(responseDelete);
});


// Define routes
const productRoutes = require("./routes/product");
const userRoutes = require('./routes/user');
const contactRoutes = require('./routes/contact');
const cartRoutes = require('./routes/cart');



app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/contacts', contactRoutes);
app.use('/carts', cartRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

