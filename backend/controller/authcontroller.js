const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/usermodel");
const transporter = require('../config/nodemailer')



//User Register Function
 const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: "Missing Details" });
    }
    try {

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({success:false, message:"Email already exists!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            email, 
            password: hashedPassword
        })

        await newUser.save();

        const token = jwt.sign({ id: newUser._id, }, process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

    

      const otp = String(Math.floor(100000 + Math.random() * 900000));

    newUser.verifyOtp = otp;
    newUser.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await newUser.save();
        
        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: newUser.email,
          subject: "Account Verification OTP",
          text: `Your OTP is ${otp}. Verify your account using the OTP.`,
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Registration Successfull!. Verification OTP Sent on Email.",user:newUser, token });

        
    } catch (error) {
      res.json({success:false, message:error.message})
    }
}


//Login Function
 const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: "Missing Details" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            res.json({success:false, message:"User Not found!"})
        }
        const isPassMatch = await bcrypt.compare(password, user.password);

        if (!isPassMatch) {
            return res.json({ success: false, message: "Invalid Credentials"});
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

      
        
        return res.json({ success: true, message: "Login Successfully!",token, user });

        
    } catch (error) {
        res.json({success:false, message:error.message})
        
    }
}

//Logout Function
 const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })

        res.json({success:true, message:"Logout Successfully!"})
        
    } catch (error) {
        res.json({success:false, message:error.message})
    }
    
} 

const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);
        if (user.isAccountVerified) {
            return res.json({
                success: false,
                message:"Account Already Verified"
            })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();
        
        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: user.email,
          subject: "Account Verification OTP",
          text: `Your OTP is ${otp}. Verify your account using the OTP.`,
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Verification OTP Sent on Email." });

        
    } catch (error) {
        res.json({success:false, message:error.message})
        
    }
}

const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: "Missing Details" });
    }
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User Not Found!" });

        }
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });

        }
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" });

        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        return  res.json({ success: true, message: "Email Verified succesfully" });


        
    } catch (error) {
        return res.json({ success: false, message: error.message});

    }
}

const isAuthenticated = async (req, res) => {
    try {
        
        return res.json({sucess:true})

    } catch (error) {
        res.json({sucess:false, message:error.message})
    }
}

//Send Password Reset OTP
const sendPassResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json({success:false, message:"Email is required"})
    }
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User Not Found!" });

        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetPassOtp = otp;
        user.resetPassOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: user.email,
          subject: "Password Reset OTP",
          text:` Your OTP for resetting you password is  ${otp}. Use this OTP to proceed with resseting your password.`,
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Reset OTP Sent to your Email." });

        
    } catch (error) {
        return res.json({ success: false, message: error.message});

    }

   
}

 // Reset User Password
 const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: "Email, OTP and New password required" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
              success: false,
              message: "User not found!",
            });

        }

        if (user.resetPassOtp === '' || user.resetPassOtp !== otp) {
            return res.json({
              success: false,
              message: "Invalid OTP",
            });

        }

        if (user.resetPassOtpExpireAt < Date.now()) {
            return res.json({
              success: false,
              message: "OTP Expired",
            });

        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPassOtp = '';
        user.resetPassOtpExpireAt = 0;

        await user.save();
        return res.json({ success: true, message: "Password has been reset succesfully." });


    } catch (error) {
        return res.json({ success: false, message: error.message});

    }
}


module.exports = {
  register,
    login,
    logout,
    sendVerifyOtp,
    verifyEmail,
    isAuthenticated,
    sendPassResetOtp,
    resetPassword
};


// module.exports = {
//   register,
//     login,
//     logout,
//     sendVerifyOtp,
//   verifyEmail
// };