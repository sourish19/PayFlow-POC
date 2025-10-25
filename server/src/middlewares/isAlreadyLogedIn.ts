import jwt from 'jsonwebtoken';

import asyncHandler from "../utils/asyncHandler"
import handleZodError from "../utils/handleZodError"

const isAlreadyLogedIn = asyncHandler(async(req,_res,next)=>{
    const {token} = req.cookies

    if(!token) next()

    const isTokenValid = jwt.verify(token,String(process.env.JWT_SECRET))

    
})