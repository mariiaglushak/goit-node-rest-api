import jsonwebtoken from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";

import { UsersModel } from "../shemas/usersShemas.js";



export const authenticate = async(req, res, next) => {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === "undefined") {
    return next(HttpError(401, "Not authorized"));
  }

  const [bearer, token] = authHeader.split(" ", 2);
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Not authorized"));
  }

 


  jsonwebtoken.verify(token, process.env.JWT_SECRET, async(err, decode) => {
    if (err) {
      return next(HttpError(401, "Not authorized"));
    }
    

    const user = await UsersModel.findById(decode.id);
    if (user === null) {
      return next(HttpError(401, "Not authorized"));
    }

    if (user.token !== token) {
      return next(HttpError(401, "Not authorized"));
    }
    
    
    
    req.user = {
      id: decode.id,
      email: user.email,
      subscription: user.subscription,
    };

     next();
  });

 
 
  
}