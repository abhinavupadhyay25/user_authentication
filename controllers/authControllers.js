import connectDB from "../db/config.js";
import bcrypt from "bcrypt";

//register controller
export const registerController = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = await db.collection(process.env.COLLECTION_1);

    const { email, password } = req.body;

    //checking existing user
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "user already exist" });
    }
    //hashing password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //saving user
    await collection.insertOne({ email, password: hashedPassword });
    res
      .status(201)
      .json({ success: true, message: "user registration successfull" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

//login controller
export const loginController = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection(process.env.COLLECTION_1);

    const { email, password } = req.body;

    //checking credentials
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user does not exist, please register",
      });
    }
    //matching passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials,try again" });
    }
    res.status(200).json({ success: true, message: "Login successfull", user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};
