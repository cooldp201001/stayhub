const usersCollection = require("../../models/userSchema");
const bcrypt = require("bcrypt");

// show all users
const getAllusers = async (req, res) => {
  const users = await usersCollection.find();
  res.render("adminPages/userManagePage", { users });
};

// Add new user
const addUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new usersCollection({
      fullName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    // Check if the error is a duplicate key error (code 11000) for the email field
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      // Duplicate email ID found, send response indicating the email ID is already registered
      res.status(400).json({ message: "Email ID is already registered" });
    } else {
      // Other errors, log the error and send a generic error response
      console.log(error);
      res.status(500).json({ message: "Error in adding the user", error });
    }
  }
};
// Delete User
const deleteUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await usersCollection.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllusers,
  addUser,
  deleteUser,
};
