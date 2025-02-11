import moment from "moment";
import { FirebaseAdmin } from "../config";
import { userRepository } from "../repository";
import { getTokenType } from "./schema/authSchema";
import { verifyPassword } from "../utils";

export const token = async (req: any, res: any) => {
  const { username, password }: getTokenType = req.body

  try {
    const user = await userRepository
      .whereEqualTo('username', username)
      .findOne();

    if (!verifyPassword(password, user?.password as string)) {
      res.status(401).send({
        status: 'error',
        message: 'Unauthorized',
      });
      return;
    }
    
    if (user) {
      user.recentlyActive = moment().valueOf();
      await userRepository.update(user);
    }
    
    const token = await FirebaseAdmin.auth().createCustomToken(user?.id as string);
    
    res.status(200).send({
      status: 'success',
      token_type: 'Bearer',
      token_access: token,
    });
  } catch (err: any) {
    res.status(500).send({
      status: 'error',
      message: 'Internal server error',
    });
  }
}