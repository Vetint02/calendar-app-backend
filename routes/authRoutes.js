import Router from "express";
import {loginUser, logoutUser, frontEndAuthentication} from "../controllers/authController.js";

const router = Router();

router.post("/", loginUser);
router.get('/me', frontEndAuthentication)
router.post('/logout', logoutUser);

export default router;