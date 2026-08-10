import { Application } from "../models/application.model.js";

export const approveApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findByIdAndUpdate(
      id,
      {
        $set: {
          status: "Approved",
          approvedAt: new Date(),
          remarks: "",
        },
      },
      { returnDocument: "after" },
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    return res.status(200).json({
      message: "Application approved successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to approve application",
      error: error.message,
    });
  }
};

export const rejectApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { remarks } = req.body;

    if (!remarks || !remarks.trim()) {
      return res
        .status(400)
        .json({ message: "Rejection remarks are required" });
    }

    const application = await Application.findByIdAndUpdate(
      id,
      {
        $set: {
          status: "Rejected",
          rejectedAt: new Date(),
          remarks: remarks.trim(),
        },
      },
      { returnDocument: "after" },
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    return res.status(200).json({
      message: "Application rejected successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to reject application",
      error: error.message,
    });
  }
};
