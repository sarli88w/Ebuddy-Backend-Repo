import { userRepository } from "../repository";

export const updateUserData = async (req: any, res: any) => {
  const { userId } = req.params;
  const { name, email } = req.body;

  try {
    const user = await userRepository.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await userRepository.update(user);

    res.status(200).json({
      status: "success",
      data: user,
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
