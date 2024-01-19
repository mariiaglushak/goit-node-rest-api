import express from "express";
import {
  getAllContacts,
  getContactsById,
  deleteContact,
  createContact,
  updateContact
} from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";
import { createContactSchema } from "../shemas/contactsShemas.js";



const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getContactsById);

contactsRouter.delete("/:id",deleteContact);

contactsRouter.post("/",validateBody(createContactSchema),createContact);

contactsRouter.put("/:id",validateBody(createContactSchema),updateContact);

export default contactsRouter;