import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

import jwt from "jsonwebtoken";

export const signup = async (req, res,) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        // console.log({fullName, userName, password, confirmPassword, gender});

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ userName });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt. hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password:hashedPassword,
            gender,
            profilePic : gender=== "male" ? boyProfilePic : girlProfilePic
        })


        if (newUser) {
			
			
            generateTokenAndSetCookie(newUser._id, res);

			await newUser.save();
            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.userName,
                profilePic: newUser.profilePic,
            })
            
        }
    } catch (error) {
        console.log("Signup controller error: ",error.message);
        res.status(500).json({
            error:'Internal server error.....'
        });
    }
}

export const login = async(req,res)=>{
    
   
    try {
        const {userName, password} = req.body;
       
        const user = await User.findOne({ userName });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        
       

        if(!user || !isPasswordCorrect)
        {
            return res.status(400).json({ error: "Invalid username or password" });
        }


        generateTokenAndSetCookie(user._id, res);

    

        res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.userName,
			profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Signup controller error: ",error.message);
        res.status(500).json({
            error:'Internal server error'
        }) 
    }
}

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const protectRoute = async (req, res, next) => {

	try {
		const token = req.cookies.jwt;
        // console.log(token);
       
        

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};