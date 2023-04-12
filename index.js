import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoutes from "./routes/books.js";
import authRoutes from './routes/users.js';
import cloudinary from 'cloudinary';
import morgan from "morgan";

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use("/books", bookRoutes);
app.use('/', authRoutes);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on ${process.env.PORT}. Connected to MongoDB.`
      );
    })
    // Book.updateMany({}, { $set: { price: 70 } }).then(() => {
    //   console.log('Documents updated');
    // }).catch(err => {
    //   console.log(err);
    // });
  })
  .catch((err) => {
    console.log(err);
  })
