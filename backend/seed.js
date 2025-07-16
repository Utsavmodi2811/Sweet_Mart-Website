const mongoose = require('mongoose');
const Product = require('./models/Product');
const { products } = require('./data/initialData');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Data seeded!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  }); 