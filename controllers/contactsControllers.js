import {
  addContact,
  listContacts,
  removeContact,
  updateContacts,
  getContactById
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";




export const getAllContacts = async(req,res,next)=>{
  try{
    const contacts= await listContacts();
    res.json(contacts);

  }catch(error){
   next(error);

  };
  
};




export const getContactsById = async(req,res,next)=>{
  try{
    const {id}=req.params;
    const contact= await getContactById(id);
    if(!contact){
      throw HttpError(404,res[404]);

    };
    res.json(contact);

  }catch(error){
   next(error);
  };
};




export const deleteContact = async(req,res,next)=>{
  try{
    const {id} =req.params;
    const removedContact= await removeContact(id);
    if(!removedContact){
      throw HttpError(404,res[404]);
    }
    res.status(200).json(removedContact);

  }catch(error){
   next(error);
  };
};




export const createContact = async(req,res,next)=>{
  try{
    const newContact= await addContact(req.body);
    res.status(201).json(newContact);
    
  }catch(error){
    next(error);
  }
};




export const updateContact = async(req,res,next)=>{

  try{
    const {id}=req.params;
    const updatedContacts = await updateContacts(id,req.body);
    if(!updatedContacts){
      throw HttpError(404,res[404]);
    }
    res.json(updatedContacts);

  }catch(error){
    next(error);
  }
};

