import express from 'express'
import { getUserBooks, login, register } from "../controllers/users.js"

const router = express.Router();

router.post("/login", login);
router.post('/register', register);
router.get('/get-user-books/:id', getUserBooks)

export default router;