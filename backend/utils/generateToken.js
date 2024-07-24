import Jwt from "jsonwebtoken";
import dotenv from "dotenv";



dotenv.config();
const generateTokenAndSetCookie = (userId,res)=>{

    const token = Jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:'15d'
    });


    res.cookie("jwt",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000, // Mili Sec
		httpOnly: true, // pr event XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== "development",
    })
}

export default generateTokenAndSetCookie; 

