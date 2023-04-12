import bcrypt from "bcrypt";
import User from "../models/users.js";
import Book from "../models/books.js";

/* REGISTER USER */
//this is async because we are calling mongoDB data base from here
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      mailId,
      password,
      city,
      state,
      mobile,
      username,
    } = req.body;

    const salt = await bcrypt.genSalt(); //it provides a random salt, i.e., number of rounds of hashing
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      mailId,
      password: passwordHash,
      city,
      state,
      mobile,
      username,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // 201 -> data created
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user)
      return res.status(400).json({ message: "User does not exists." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    delete user.password; // so that it is not sent back to frontend in res
    res.status(200).json({ 
      user: user,
      message: 'User Logged In'
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const getUserBooks = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found.");
    }

    const books = await Promise.all(user.book.map((id) => Book.findById(id)));

    res.status(200).json({
      books: books
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
