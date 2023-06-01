import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import users from "../models/auth.js";

export const signup = async (req, res) => {
  const { email, password, userType, address } = req.body;

  // console.log(userType)
  // console.log(email)

  try {
    const exisitingUser = await users.findOne({ email });

    if (exisitingUser) {
      return res.status(404).json({ message: "User already Exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await users.create({
      email,
      password: hashedPassword,
      userType,
      address
    });
    
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const exisitingUser = await users.findOne({ email });

    if (!exisitingUser) {
      return res.status(404).json({ message: "User don't Exist." });
    }

    const isPasswordCrt = await bcrypt.compare(
      password,
      exisitingUser.password
    );

    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json(exisitingUser);
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};
