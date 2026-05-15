import express from "express";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

router.post("/update", async (req, res, next) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "No image provided" });
    }

    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: "profile-images",
    });

    res.status(200).json({
      url: uploadResult.secure_url,
    });
  } catch (error) {
    console.log("UPLOAD ERROR:", error); // 👈 IMPORTANT
    next(error);
  }
});

export default router;
