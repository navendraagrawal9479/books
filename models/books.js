import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  ISBN: {
    type: String
  },
  Book_Title: {
    type: String,
  },
  Book_Author: {
    type: String,
  },
  Year_Of_Publication: {
    type: String,
  },
  Publisher: {
    type: String,
  },
  Image_URL_S: {
    type: String,
  },
  Image_URL_M: {
    type: String,
  },
  Image_URL_L: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  }
});

const Book = mongoose.model('book', bookSchema);

export default Book;