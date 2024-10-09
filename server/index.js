import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session"; // Add this
import passport from "passport"; // Add this
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import authRoutes from "./routes/auth.js"; // Import the authentication routes
import "./config/passport-setup.js"; // Import the passport setup
import connectDB from "./connectMongoDb.js";

dotenv.config();
connectDB();



const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials to be sent
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);


app.options('*', cors());

app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  console.log('Request Method:', req.method);
  next();
});


// Your other middleware and routes

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use the session secret from .env
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use("/auth", authRoutes); // Use the authentication routes
app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);

// Root route (optional)
app.get('/', (req, res) => {
  res.send("This is a stack overflow clone API");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
