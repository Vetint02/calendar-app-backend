import Router from "express"
import {createContent, fetchContent} from '../controllers/contentController.js'

const router = Router();

router.post("/create", createContent);
router.post("/", fetchContent)

export default router;