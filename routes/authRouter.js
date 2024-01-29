import express from "express";
import { register, login, getCurrent,logout } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { userJoiSchema } from "../shemas/usersShemas.js";
import { authenticate } from "../middlewares/authenticate.js";


const authRouter = express.Router();
const jsonParser = express.json();

authRouter.post("/register", jsonParser, validateBody(userJoiSchema), register);

authRouter.post("/login", jsonParser, validateBody(userJoiSchema), login);
authRouter.get("/current", authenticate, getCurrent);
authRouter.get("/logout", authenticate, logout);

export default authRouter;