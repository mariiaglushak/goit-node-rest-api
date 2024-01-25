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



const contactsRouter = express.Router();
const jsonParser = express.json();


contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id",isValidId, getContactsById);

contactsRouter.delete("/:id",isValidId, deleteContact);

contactsRouter.post("/",jsonParser, validateBody(createContactSchema),createContact);

contactsRouter.patch("/:id/favorite",jsonParser, isValidId, validateBody(updateFavoriteSchema),updateStatusContact)

contactsRouter.put("/:id",jsonParser, isValidId, validateBody(createContactSchema),updateContact);

export default contactsRouter;



