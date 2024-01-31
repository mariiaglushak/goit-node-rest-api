import multer from "multer";
import path from "path";
import crypto from "crypto";



import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join( __dirname, "..", "tmp"));
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const suffix = crypto.randomUUID();

    cb(null,`${basename}-${suffix}${extname}`);
  },
});


export const upload = multer({ storage });

