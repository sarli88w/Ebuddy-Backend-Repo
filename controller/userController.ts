import { User } from "../entities";
import { userRepository } from "../repository";

export const updateUserData = async (req: any, res: any) => {
  try {
    // const user = new User();
    // user.name = req.body.name;
    // user.email = req.body.email;

    // await userRepository.create(user);

    res.status(200).json({
      status: 'success',
      message: "User data updated successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      error: error.message,
    });
  }
}

export const fetchUserData = async (req: any, res: any) => {
  try {
    const users = await userRepository.find();

    res.status(200).json({
      status: 'success',
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      error: error.message,
    });
  }
}
