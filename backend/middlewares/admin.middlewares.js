import jwt from "jsonwebtoken";

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "User unauthorized",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECREATE_KEY);

    console.log("Decoded:", decode);

    req.admin = decode;

    next();
  } catch (error) {
    console.log("JWT/Cookie error:", error);

    return res.status(403).json({
      message: "user not verified",
      error: error.message,
    });
  }
};

export default adminMiddleware;
