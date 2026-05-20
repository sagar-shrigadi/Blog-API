import "dotenv/config";
import jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import { getUserAuth, insertUser } from "../models/user.js";

export const postLogin = async (req, res) => {
  try {
    // add validation for user login same as sign in
    const { username, password } = req.body;

    // db lookup to verify user exists
    const user = await getUserAuth(username);

    if (user == null) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    // compare user entered plain text password
    // with the hash stored in db
    // if user doesnt exist from above db lookup
    // use fallback hash to still perform a hash comparison
    // to prevent timing attacks
    const match = await argon2.verify(
      user?.password ?? process.env.FALLBACK_HASH,
      req.body.password,
    );

    // if user exists and password matches
    // create a JWT token with payload being only the user's Id stored in db
    // and send it as response
    if (user && match) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.json({ token, msg: "Login Succesful" });
    } else {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Login error: ", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const authenticateToken = async (req, res, next) => {
  try {
    // get authorizaion header from req
    const authHeader = req.headers["authorization"];
    // extract bearer token
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ msg: "Token Missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
    req.user = decoded;
    next();
  } catch (error) {
    // jwt.verify throws an error if the token is invalid or expired
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      console.error("Token Authenticate Error: ", error);
      return res.status(403).json({ msg: "Invalid or Expired Token" });
    }

    console.error("Token Authenticate Error: ", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const postSignup = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: "Input fields must not be empty!" });
    }

    const hashedPassword = await argon2.hash(password);
    const newUser = await insertUser(username, hashedPassword);

    return res.json({ newUser });
  } catch (error) {
    console.error("Sign Up Error: ", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
