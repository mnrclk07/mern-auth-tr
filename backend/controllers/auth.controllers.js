import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Tüm alanlar zorunludur" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const userAlreadyExits = await User.findOne({ email });
    if (userAlreadyExits) {
      return res.status(400).json("Kullanıcı zaten mevcut");
    }

    await newUser.save();

    res.json("Register successful");
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0]; // Hangi alanın çakıştığını öğren (username veya email)
      if (duplicateField === "username") {
        return res.status(400).json("Bu kullanıcı adı zaten kullanılıyor.");
      }
      if (duplicateField === "email") {
        return res.status(400).json("Bu email  zaten kullanılıyor.");
      }
    }
  }
};
