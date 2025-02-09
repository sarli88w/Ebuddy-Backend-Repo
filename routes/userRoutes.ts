import { fetchUserData, updateUserData } from "../controller/api";
import { authMiddleware } from "../middleware";

export default (router: any) => {
  router.get('/fetch-user-data', authMiddleware, fetchUserData);
  router.post('/update-user-data', authMiddleware, updateUserData);

  return router;
}