import Router from "express"
import {createContent} from '../controllers/contentController.js'

const router = Router();

router.post("/create", createContent);

export default router;