import Router from "express"
import {createContent, fetchContent, editContent, deleteContent, getMonthContent} from '../controllers/contentController.js'

const router = Router();

router.post("/create", createContent);
router.get("/", fetchContent)
router.put("/update", editContent)
router.delete("/delete/:id", deleteContent)
router.get('/month', getMonthContent);

export default router;