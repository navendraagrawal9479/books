import getDataUri from "../middlewares/dataUri.js";
import Book from "../models/books.js";
import cloudinary from "cloudinary";
import User from "../models/users.js";

export const getAllBooks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const totalBooks = await Book.find().countDocuments();
    const items_per_page = process.env.ITEMS_PER_PAGE;
    const books = await Book.find()
      .skip((page - 1) * items_per_page) //skip these nnumber of records in the beginning
      .limit(items_per_page);
    res.status(200).json({
      books: books,
      metaData: { totalBooks, postsPerPage: items_per_page },
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const getIndividualBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      throw new Error("Book Not Found.");
    }

    const recommendedBooks = await Book.find({Book_Author: book.Book_Author});

    res.status(200).json({
      book: book,
      recommendedBooks: recommendedBooks
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const searchBook = async (req, res) => {
  try {
    const { q } = req.params;
    const data = await Book.find({
      $or: [
        { Book_Title: { $regex: q, $options: "i" } },
        { Book_Author: { $regex: q, $options: "i" } },
        { Publisher: { $regex: q, $options: "i" } },
      ],
    }).limit(20);

    res.status(200).json({
      books: data,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const addBook = async (req, res) => {
  try {
    const file = req.file;

    const fileUrl = getDataUri(file);

    const cloudUri = await cloudinary.uploader.upload(fileUrl.content);

    const {
      Book_Title,
      Book_Author,
      Year_Of_Publication,
      Publisher,
      price,
    } = req.body;

    const newBook = new Book({
      Book_Title,
      Book_Author,
      Year_Of_Publication,
      Publisher,
      price,
      Image_URL_L: cloudUri.secure_url,
      Image_URL_M: cloudUri.secure_url,
      Image_URL_S: cloudUri.secure_url,
    });

    await newBook.save();

    res.status(201).json({
      book: newBook,
      message: "Book Created",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

