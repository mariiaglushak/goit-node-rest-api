import HttpError from "../helpers/HttpError.js";
import { contactsModel } from "../shemas/contactsShemas.js";

export const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const contacts = await contactsModel.find({ owner });
  res.json(contacts);
};

export const getContactsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsModel.findById(id);
    if (contact === null) {
      throw HttpError(404);
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedContact = await contactsModel.findByIdAndDelete(id);
    if (removedContact === null) {
      next(HttpError(404));
    }

    res.status(200).json({ message: "Contact deleted" });
  } catch {
    next(HttpError(404));
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const newContact = await contactsModel.create({ ...req.body, owner });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContacts = await contactsModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (updatedContacts === null) {
      throw HttpError(404);
    }
    res.json(updatedContacts);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContacts = await contactsModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (updatedContacts === null) {
      throw HttpError(404);
    }
    res.json(updatedContacts);
  } catch (error) {
    next(error);
  }
};
