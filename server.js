const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const cors = require("cors");

const { connectDB } = require("./config/dbconnection.js");
app.use(cors());

const contactRoutes = require("./routes/ContactRoutes");
const userRoutes = require("./routes/UserRoutes");
const errorHandle = require("./middleware/errorHandle");

// Use the contactRoutes for the '/api/contact' path

connectDB();
app.use(express.json());
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandle);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
