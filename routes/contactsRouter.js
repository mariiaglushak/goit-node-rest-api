import express from "express";
// import {
//   getAllContacts,
//   getContactById,
//   deleteContact,
//   createContact,
//   updateContact,
// } from "../controllers/contactsControllers.js";

import { addContact,removeContact,listContacts,getContactById } from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import { createContactSchema } from "../shemas/contactsShemas.js";


const contactsRouter = express.Router();

contactsRouter.get("/", async(req,res,next)=>{
  try{
    const contacts= await listContacts();
    res.json(contacts);

  }catch(error){
   next(error);

  };
  
});

contactsRouter.get("/:id", async(req,res,next)=>{
  try{
    const {id}=req.params;
    const contact= await getContactById(id);
    if(!contact){
      throw HttpError(404,res[404]);

      // return res.status(404).json({
      //   message:"Not found"
      // })
    };
    res.json(contact);

  }catch(error){
   next(error);
  };
});

// contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", async(req,res,next)=>{
  try{
    const newContact= await addContact();

  }catch(error){
    next(error);
  }
});

// contactsRouter.put("/:id", updateContact);

export default contactsRouter;