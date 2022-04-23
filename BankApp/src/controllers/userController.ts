import {Request, Response} from 'express';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import User from '../models/user.models'



const userLogin = async (req: Request, res: Response) => {
        const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        const validatePassword = await bcrypt.compare(password, user.password);

        if(user && validatePassword) {
            return res.status(200).json({
                msg:'login successful',
                token: generateToken(user._id)
            })
        } 
    } catch (error) {
        return res.status(400).json("Invalid login credentials")
    }
        


}

const registerUser = async (req: Request, res: Response) => {
    const { firstname, lastname, password, email} = req.body;
   try{
    if(!firstname || !lastname || !email || !password) {
       return res.status(400)
        .json('please complete all fields')
    }
    
    const userExists = await User.findOne({ email: email});
    if(userExists) {
        return res.status(400)
        .json('User already exists')
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await new User({
        firstname,
        lastname,
        password: hashedPassword,
        email
    }).save()

   return res.status(201).json({
        msg: `${user.firstname} ${user.lastname} registered successfully`,
        token: generateToken(user._id)
    })
   }catch(err) {
      return res.status(400)
       .json('Invalid User data')
   }
}


// generate JWT
const generateToken = (id: string) =>  {
     return jwt.sign({id},`${process.env.JWT_SECRET}`)
}

const getUser = async (req: Request, res: Response) => {
    const  {_id, firstname, lastname, email} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        firstname,
        lastname,
        email
    })
}

export {
    getUser,
    registerUser,
    userLogin
}