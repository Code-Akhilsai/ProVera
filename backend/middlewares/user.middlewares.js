import jwt from "jsonwebtoken";

const userMiddleware = async (req, res, next) => {
  try {
    const cookieHeader = req.headers.cookie || "";
    const token = cookieHeader
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("token="))
      ?.slice(6);

    if (!token) return res.status(401).json({ messsage: "User unauthorized" });

    const decode = jwt.verify(token, process.env.JWT_SECREATE_KEY);

    req.user = decode;
    next();
  } catch (error) {
    return res.status(403).json({ message: "user not verified" });
  }
};

export default userMiddleware;
