import { Application } from "../models/application.model.js";

const getapplicationController = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("userId", "full_name email phone") // <--- Changed 'name' to 'full_name'
      .sort({ createdAt: -1 });

    const count_of_applications = await Application.countDocuments();
    const pending_applications = await Application.countDocuments({
      status: "Pending Review",
    });
    const approved_applications = await Application.countDocuments({
      status: "Approved",
    });
    const rejected_applications = await Application.countDocuments({
      status: "Rejected",
    });

    return res.status(200).json({
      message: "Applications fetched successfully",
      applications,
      count_of_applications,
      pending_applications,
      approved_applications,
      rejected_applications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res.status(500).json({
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
};

export default getapplicationController;
