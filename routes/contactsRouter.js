import express from "express";
import {
  getAllContacts,
  getContactsById,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact
} from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";
import { createContactSchema,updateFavoriteSchema } from "../shemas/contactsShemas.js";
import { isValidId } from "../helpers/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";



const contactsRouter = express.Router();
const jsonParser = express.json();


contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id",authenticate, isValidId, getContactsById);

contactsRouter.delete("/:id",authenticate,isValidId, deleteContact);

contactsRouter.post("/",authenticate ,jsonParser, validateBody(createContactSchema),createContact);

contactsRouter.patch("/:id/favorite",authenticate, jsonParser, isValidId, validateBody(updateFavoriteSchema),updateStatusContact)

contactsRouter.put("/:id",authenticate ,jsonParser, isValidId, validateBody(createContactSchema),updateContact);

export default contactsRouter;



