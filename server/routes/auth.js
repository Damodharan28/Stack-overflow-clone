import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken"; // Import JWT to generate token
import { googleAuth,googleAuthError } from "../controllers/auth.js"; // Adjust the import path for your controllers

const router = express.Router();

router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] }) // Initiates the Google authentication process
);

// Callback route where Google redirects after authentication
// 

router.get("/google/callback", 
  passport.authenticate("google", { 
    session: false,
    failureRedirect: "/auth/google/error",
    scope: ["profile", "email"]
  }), (req, res)=> {
    console.log("callback route hit");
    googleAuth(req,res);
  }
);

// Handle Google authentication error
router.get("/google/error", googleAuthError);

export default router;
