import { FirebaseAdmin } from "../config";

export const authMiddleware = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    res.status(403).json({
      status: "error",
      message: "Access to the requested resource is forbidden",
    });
    return;
  }
  
  try {
    const decodedToken = await FirebaseAdmin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ 
      status: "error",
      message: "Unauthorized",
    });
    return;
  }
}