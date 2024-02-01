import express from "express";
import { uploadAvatar } from "../controllers/userControllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";
import jimpProcessingAvatar from "../middlewares/jimpProcessing.js";
import {
  register,
  login,
  getCurrent,
  logout,
} from "../controllers/userControllers.js";
import validateBody from "../helpers/validateBody.js";
import { userJoiSchema } from "../shemas/usersShemas.js";

const usersRouter = express.Router();
const jsonParser = express.json();

usersRouter.post(
  "/register",
  jsonParser,
  validateBody(userJoiSchema),
  register
);
usersRouter.post("/login", jsonParser, validateBody(userJoiSchema), login);
usersRouter.get("/current", authenticate, getCurrent);
usersRouter.get("/logout", authenticate, logout);
usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  jimpProcessingAvatar,
  uploadAvatar
);

export default usersRouter;
