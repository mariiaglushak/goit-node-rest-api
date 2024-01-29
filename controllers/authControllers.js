import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";


import { UsersModel } from "../shemas/usersShemas.js";
import HttpError from "../helpers/HttpError.js";





export const register=async(req,res,next)=>{
  const {email, password, subscription} =req.body;
  try{
    const user = await UsersModel.findOne({ email });
    if (user !== null) {
     
      throw HttpError(409, "Email in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await UsersModel.create({ email, password: passwordHash, subscription });
    
    const userResponse = { email: newUser.email, subscription: newUser.subscription };
    
    res.status(201).json({ user: userResponse });
    
  }catch(error){
    next(error);
  }
  
}


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

    const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "20h" });

    const result = await UsersModel.findByIdAndUpdate(user._id, { token });
    const { subscription } = result;
    const loginResponse = { email, subscription };

    res.send({ token: token,user: loginResponse });
    
  } catch (error) {
    next(error)
  }
}




export const getCurrent = async(req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  })

  
};




export const logout = async (req, res, next) => {
  try {
    await UsersModel.findByIdAndUpdate(req.user.id, { token: null });
    res.status(204).end();
    
  } catch (error) {
    next(error);
  };
  
};

