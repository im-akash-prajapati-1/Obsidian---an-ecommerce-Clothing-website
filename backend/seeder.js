const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/user");
const products = require("./data/products");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    // Clear Existing Data
    await Product.deleteMany();

    // Create a Default Admin User
    const createdUsers = await User.create([
      {
        name: "Admin User",
        email: "admin@gmail.com",
        password: "admin@123",
        role: "admin",
      }
    ]);

    const sampleProducts = products.map((product, index) => ({
      ...product,
      user:createdUsers[0]._id,
    }));

    // insert products into database
    await Product.insertMany(sampleProducts);
    console.log("Seeding Successfull");
    process.exit();
  } catch (error) {
    console.error("Error in Seeding the Data:", error);
    process.exit(1);
  }
};

seedData();
