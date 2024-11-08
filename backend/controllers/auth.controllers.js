import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

    if (newUser) {
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      const { password, ...rest } = newUser._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({ success: true, rest });
    }
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
    console.log(error);
    return res.status(500).json({ success: false, message: "Sunucu hatası." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Tüm alanlar doldurulmalıdır." });
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res
        .status(404)
        .json({ success: false, message: "Kullanıcı bulunamadı." });
    }

    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Geçersiz şifre." });
    }

    if (validUser) {
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

      const { password, ...rest } = validUser._doc;

      validUser.lastLogin = new Date();
      await validUser.save();

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({ success: true, rest });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Sunucu hatası." });
  }
};
