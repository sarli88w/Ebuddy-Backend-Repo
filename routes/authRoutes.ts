import { token } from "../controller/api";
import { getTokenSchema } from "../controller/schema";
import { validateRequest } from "../middleware";

export default (router: any) => {
  router.post('/token', validateRequest(getTokenSchema), token);

  return router;
}