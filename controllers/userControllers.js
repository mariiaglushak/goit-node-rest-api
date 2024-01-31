import { rename } from "fs/promises";
import path from "path";
import { UsersModel } from "../shemas/usersShemas.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export const uploadAvatar = async (req, res, next) => {
  try {
    const { id } = req.user;
    await rename(req.file.path, path.join(__dirname, "..", "public/avatars", req.file.filename));
    
    const user= await UsersModel.findByIdAndUpdate(id, { avatarURL: req.file.filename }, { new: true });
    res.json({avatarURL: user.avatarURL});
  } catch (error) {
    next(error);
  };
  
};