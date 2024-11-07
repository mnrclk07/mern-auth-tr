import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Tüm alanlar zorunludur" });
  }

  try {
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Kullanıcı zaten mevcut" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ success: true, message: "Register successful" });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      if (duplicateField === "username") {
        return res.status(400).json({
          success: false,
          message: "Bu kullanıcı adı zaten kullanılıyor.",
        });
      }
      if (duplicateField === "email") {
        return res
          .status(400)
          .json({ success: false, message: "Bu email  zaten kullanılıyor." });
      }
    }
  }
};
