import { rename } from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import gravatar from "gravatar";
import { v4 as uuidv4 } from "uuid";

import { UsersModel } from "../shemas/usersShemas.js";
import HttpError from "../helpers/HttpError.js";
import sendEmail from "../helpers/sendEmail.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const register = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  try {
    const user = await UsersModel.findOne({ email });
    if (user !== null) {
      throw HttpError(409, "Email in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = uuidv4();

    await sendEmail({
      to: email,
      from: "glushakmash@gmail.com",
      subject: " Welcome to contacts",
      html: `To confirme your registration please click on the <a href="${process.env.BASE_URL}/api/users/verify/${verificationToken}">Link</a>`,
      text: `To confirme your registration please open the Link http://localhost:3000/api/users/verify/${verificationToken}`,
    });

    const newUser = await UsersModel.create({
      email,
      password: passwordHash,
      subscription,
      avatarURL,
      verificationToken,
    });

    const userResponse = {
      email: newUser.email,
      subscription: newUser.subscription,
    };

    res.status(201).json({ user: userResponse });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    const user = await UsersModel.findOne({ verificationToken });
    if (user === null) {
      return next(HttpError(404, "User not found"));
    }
    await UsersModel.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
  } catch (error) {
    next(error);
  }

  res.status(200).json({
    message: "Verification successful",
  });
};

export const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await UsersModel.findOne({ email });
    if (user === null) {
      throw HttpError(400);
    }

    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    await sendEmail({
      to: email,
      from: "glushakmash@gmail.com",
      subject: " Welcome to contacts",
      html: `To confirme your registration please click on the <a href="${process.env.BASE_URL}/api/users/verify/${user.verificationToken}">Link</a>`,
      text: `To confirme your registration please open the Link http://localhost:3000/api/users/verify/${user.verificationToken}`,
    });

    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  try {
    const user = await UsersModel.findOne({ email });
    if (user === null) {
      throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (passwordCompare === false) {
      throw HttpError(401, "Email or password is wrong");
    }
    if (user.verify === false) {
      throw HttpError(401, "Not verified");
    }

    const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "20h",
    });

    const result = await UsersModel.findByIdAndUpdate(user._id, { token });
    const { subscription } = result;
    const loginResponse = { email, subscription };

    res.send({ token: token, user: loginResponse });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

export const logout = async (req, res, next) => {
  try {
    await UsersModel.findByIdAndUpdate(req.user.id, { token: null });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    const { id } = req.user;
    await rename(
      req.file.path,
      path.join(__dirname, "..", "public/avatars", req.file.filename)
    );

    const user = await UsersModel.findByIdAndUpdate(
      id,
      { avatarURL: req.file.filename },
      { new: true }
    );
    res.json({ avatarURL: user.avatarURL });
  } catch (error) {
    next(error);
  }
};
