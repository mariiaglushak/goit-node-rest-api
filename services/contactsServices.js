// const fs=require("node:fs/promises")

import {readFile,writeFile} from "fs/promises";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = path.join(__dirname, "..", "db", "contacts5.json");

// const path=require("node:path");
// const crypto = require("node:crypto");

import crypto from "crypto";

console.log(contactsPath);


// const contactsPath=path.join("../db/contacts.json");
// console.log(contactsPath);



const listContacts=async() =>{
  const data= await readFile(contactsPath,{ encoding: "utf-8" });
  return JSON.parse(data);
  
}

const getContactById= async(contactId)=> {
  const contacts= await listContacts();
  const contact=contacts.find((contact) => contact.id === contactId);

  return contact || null;
 
}


const removeContact= async(contactId)=> {
  const contacts= await listContacts();
  const index= contacts.findIndex(contact=>contact.id===contactId);

  if(index === -1){
    return null;
  } 
  const newContacts = [...contacts.slice(0, index), ...contacts.slice(index + 1)];
  await writeFile(contactsPath,JSON.stringify(newContacts,undefined,2));

  return contacts[index];

}




const addContact=async (contact)=> {

  const allContacts= await listContacts();
  const newContact= { id: crypto.randomUUID(), ...contact };

  allContacts.push(newContact);

  await writeFile(contactsPath,JSON.stringify(allContacts,undefined,2));

  return newContact;
 
}


// module.exports={
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact
// };

export {listContacts,getContactById,removeContact,addContact};