const fs=require("node:fs/promises");

const path=require("node:path");
const crypto = require("node:crypto");


const contactsPath=path.join(__dirname,"..","..","db","contacts.json");
console.log(contactsPath);



const listContacts=async() =>{
  const data= await fs.readFile(contactsPath,{ encoding: "utf-8" });
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
  await fs.writeFile(contactsPath,JSON.stringify(newContacts,undefined,2));

  return contacts[index];

}




const addContact=async (contact)=> {

  const allContacts= await listContacts();
  const newContact= { id: crypto.randomUUID(), ...contact };

  allContacts.push(newContact);

  await fs.writeFile(contactsPath,JSON.stringify(allContacts,undefined,2));

  return newContact;
 
}


module.exports={
  listContacts,
  getContactById,
  removeContact,
  addContact
};