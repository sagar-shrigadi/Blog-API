import { getUserById } from "../models/user.js";

export const getMe = async (req, res) => {
  const userId = Number(req.params.userId);

  try {
    if (req.user.id === userId) {
      const user = await getUserById(userId);
      if (user) {
        return res.json({ user });
      } else {
        return res.status(404).json({ msg: "user not found!" });
      }
    } else {
      return res.status(403).end();
    }
  } catch (error) {
    console.error("Get User By Id Error");
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
