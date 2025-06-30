const express = require("express");
const connectDB = require("./Connections/connection");
const cors = require("cors");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const franchiseInquiryRoutes = require("./routes/franchiseInquiry");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/franchise-inquiry", franchiseInquiryRoutes);

app.use("/api/payment", require("./routes/paymentRoutes"));


connectDB();

app.get("/", (req, res) => {
  res.send("Epoxy Elegance Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
