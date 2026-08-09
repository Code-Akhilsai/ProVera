import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { Application } from "../models/application.model.js";
import { User } from "../models/user.model.js";

const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "provera-documents",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result.secure_url);
      },
    );

    uploadStream.end(buffer);
  });

const applicationController = async (req, res) => {
  try {
    const { _id } = req.user ?? {};
    const { phone, service_info, location_info } = req.body ?? {};

    if (!_id) {
      return res.status(401).json({ message: "User unauthorized" });
    }

    const userId = new mongoose.Types.ObjectId(_id);
    const uploadedDocuments = {};
    const files = req.files ?? {};
    const hasFiles = Object.keys(files).length > 0;

    if (hasFiles) {
      const existingApplication = await Application.findOne({ userId });

      if (!existingApplication) {
        return res.status(404).json({
          message: "Save your profile first before uploading documents",
        });
      }

      for (const [fieldName, fileList] of Object.entries(files)) {
        const file = fileList?.[0];
        if (!file) continue;

        uploadedDocuments[fieldName] = await uploadToCloudinary(file.buffer);
      }

      const application = await Application.findOneAndUpdate(
        { userId },
        {
          $set: {
            documents: {
              ...(existingApplication?.documents?.toObject?.() ??
                existingApplication?.documents ??
                {}),
              ...uploadedDocuments,
            },
          },
        },
        { new: true },
      );

      return res
        .status(201)
        .json({ message: "Documents saved successfully", application });
    }

    await Application.collection.updateOne(
      { userId },
      {
        $set: {
          ...(phone ? { phone } : {}),
          ...(service_info ? { service_info } : {}),
          ...(location_info ? { location_info } : {}),
        },
        $setOnInsert: { userId },
      },
      { upsert: true },
    );

    const application = await Application.findOne({ userId });

    return res
      .status(201)
      .json({ message: "Profile saved successfully", application });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to save application",
      error: error.message,
    });
  }
};

export const getCurrentApplication = async (req, res) => {
  try {
    const { _id } = req.user ?? {};

    if (!_id) {
      return res.status(401).json({ message: "User unauthorized" });
    }

    const userId = new mongoose.Types.ObjectId(_id);
    const application = await Application.findOne({ userId });
    const username = await User.findOne({ _id });

    return res.status(200).json({ application, username });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to load application",
      error: error.message,
    });
  }
};

export const submitCurrentApplication = async (req, res) => {
  try {
    const { _id } = req.user ?? {};

    if (!_id) {
      return res.status(401).json({ message: "User unauthorized" });
    }

    const userId = new mongoose.Types.ObjectId(_id);

    const application = await Application.findOneAndUpdate(
      { userId },
      {
        $set: {
          status: "Pending Review",
          submittedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    );

    if (!application) {
      return res.status(404).json({
        message: "Create your profile before submitting the application",
      });
    }

    return res
      .status(200)
      .json({ message: "Application submitted successfully", application });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to submit application",
      error: error.message,
    });
  }
};

export default applicationController;
