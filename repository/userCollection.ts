import { getRepository } from "fireorm";
import { User, UserPublicFields } from "../entities";

export const userRepository = getRepository(User);

export const userSelectKeys = (dataArray: any[], keys: string[] = UserPublicFields) => {
  return dataArray.map(item => Object.fromEntries(keys.map(key => [key, item[key]])));
}
