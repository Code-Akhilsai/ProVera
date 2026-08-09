import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    },

    service_info: {
      service: {
        type: String,
        required: true,
      },
      experience: {
        type: String,
        required: true,
      },
      skills: {
        type: [String],
        required: true,
      },
    },

    location_info: {
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      Address: {
        type: String,
        required: true,
      },

      pincode: {
        type: String,
        required: true,
      },
    },

    documents: {
      aadhaar: String,
      pan: String,
      experienceCertificate: String,
      addressProof: String,
      profilePhoto: String,
    },

    status: {
      type: String,
      default: "Draft",
    },

    submittedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

export const Application = mongoose.model("Application", applicationSchema);
