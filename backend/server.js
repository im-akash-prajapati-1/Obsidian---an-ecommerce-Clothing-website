const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/ProductRoutes");
const CartRoutes = require("./routes/CartRoutes");
const CheckoutRoutes = require("./routes/CheckoutRoutes");
const OrderRoutes = require("./routes/orderRoutes");
const UploadRoutes = require("./routes/uploadRoutes");
const SubscribeRoute = require("./routes/SubscribeRoute");
const adminRoutes = require("./routes/adminRoutes");
const ProductAdminRoutes = require("./routes/ProductAdminRoutes")
const AdminOrderRoutes = require("./routes/AdminOrderRoutes")

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

//connet to MongoDB
connectDB();

app.get("/", (req, res) => {
    res.send("WELCOOMEE");
});

// API Rutes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/checkout", CheckoutRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/upload", UploadRoutes);
app.use("/api/subscribe", SubscribeRoute);
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", ProductAdminRoutes);
app.use("/api/admin/orders", AdminOrderRoutes);

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});