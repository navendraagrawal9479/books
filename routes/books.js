import express from 'express';
import { addBook, getAllBooks, getIndividualBook, searchBook } from '../controllers/books.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getIndividualBook);
router.get('/search-book/:q', searchBook);

router.post('/', singleUpload, addBook)

export default router;