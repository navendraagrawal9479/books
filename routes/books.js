import express from 'express';
import { addBook, getAllBooks, getIndividualBook, recommendBook, searchBook } from '../controllers/books.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getIndividualBook);
router.get('/search-book/:q', searchBook);
router.get('/recommend-book/:q', recommendBook);

router.post('/', singleUpload, addBook)

export default router;