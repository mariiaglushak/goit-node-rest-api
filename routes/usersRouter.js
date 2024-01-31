import express from "express";
import { uploadAvatar } from "../controllers/userControllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";
import jimpProcessingAvatar from "../middlewares/jimpProcessing.js";



const usersRouter = express.Router();

usersRouter.patch("/avatars", authenticate, upload.single("avatar"), jimpProcessingAvatar,  uploadAvatar);


export default usersRouter;

