import { createUser, getUserByEmail } from "../db/users";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { envServerSchema } from "../serverEnvSchema";

interface CustomRequest extends express.Request {
  payload: {
    _id: string;
    email: string;
    username: string;
    iat: number;
    exp: number;
  };
}

type LoginBody = {
  email: string;
  password: string;
};

const saltRounds = 10;

export const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body as LoginBody;

  if (!email || !password) {
    return res.sendStatus(400);
  }

  const foundUser = await getUserByEmail(email).select("+password");

  if (!foundUser) {
    // If the user is not found, send an error response
    res.status(401).json({ message: "User not found." });
    return;
  }

  // Compare the provided password with the one saved in the database
  const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

  if (passwordCorrect) {
    // Deconstruct the user object to omit the password
    const { _id, email, username } = foundUser;

    // Create an object that will be set as the token payload
    const payload = { _id, email, username };

    // Create a JSON Web Token and sign it
    const authToken = jwt.sign(payload, envServerSchema.SECRET, {
      algorithm: "HS256",
      expiresIn: "24h",
    });
    console.log("User logged in");
    // Send the token as the response
    res.status(200).json({ authToken: authToken });
  } else {
    res.status(401).json({ message: "Unable to authenticate the user" });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  const { email, password, username } = req.body;

  // Check if email or password or name are provided as empty strings
  if (email === "" || password === "" || username === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }

  // This regular expression check that the email is of a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  // This regular expression checks password for special characters and minimum length
  /*   const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  } */

  // Check the users collection if a user with the same email already exists
  try {
    const foundUser = await getUserByEmail(email);
    if (foundUser) {
      res.status(400).json({ message: "User already exists." });
      return;
    }

    // If email is unique, proceed to hash the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await createUser({
      email,
      username,
      password: hashedPassword,
    });
    console.log("User created");
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const verify = async (req: CustomRequest, res: express.Response) => {
  console.log("User verified ", req.payload);
  res.status(200).json(req.payload);
};
