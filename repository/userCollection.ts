import { getRepository } from "fireorm";
import { User } from "../entities";

export const userRepository = getRepository(User);
