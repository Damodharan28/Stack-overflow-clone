import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  googleId: { type: String, required: false, unique: true }, // Added field for Google ID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Ensure email is unique
  password: { type: String, required: false }, // Make password optional for Google users
  about: { type: String },
  tags: { type: [String] },
  joinedOn: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
