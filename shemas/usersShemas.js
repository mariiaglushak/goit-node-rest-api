import mongoose from "mongoose";
import Joi from "joi";

const subscriptionList = ["starter", "pro", "business"];

const userShema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
      dafault: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      dafault: null,
    },
  },
  { versionKey: false, timestamps: true }
);

export const userJoiSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
    "string.base": "field email must be a string",
  }),
  password: Joi.string().required().messages({
    "any.required": "missing required password field",
    "string.base": "field password must be a string",
  }),
  subscription: Joi.string()
    .valid(...subscriptionList)
    .messages({
      "any.only": "Subscription must be one of {#valids}",
      "string.base": "field subscription must be a string",
    }),
});

export const verufyEmailJoiSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
    "string.base": "field email must be a string",
  }),
});

export const UsersModel = mongoose.model("User", userShema);
