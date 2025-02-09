import { FirebaseAdmin } from "../config";

export const authMiddleware = async (req: any, res: any, next: any) => {
  let idToken = req.headers['x-token-id'];
  if (!idToken) {
    res.status(403).json({
      status: "error",
      message: "Forbidden",
    });
    return;
  }
  
  try {
    const decodedToken = await FirebaseAdmin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (err: any) {
    console.error('error', err?.message);
    res.status(401).json({ 
      status: "error",
      message: "Unauthorized",
    });
    return;
  }
}