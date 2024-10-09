import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/auth.js'; // Update the path based on your project structure
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Serialize user to save the user ID in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user to get the user object from the ID in the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Your Google Client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Your Google Client Secret
      callbackURL: 'http://localhost:5000/auth/google/callback',
      scope: ["profile", "email"], // URL to which Google will send the response
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists in the database
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          // User already exists
          done(null, existingUser);
        } else {
          // Create new user
          const newUser = await new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            // Add any other user info you want to store
          }).save();
          done(null, newUser);
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);
