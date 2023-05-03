import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User, { IUserModel } from "../models/User";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, name } = req.body;

  const searchUser = await User.findOne({ username: username });

  if (searchUser !== null) {
    return res.status(409).json({ message: "Username already in use" });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      passwordHash,
      name,
    });

    var cleanUserDetails: any = user;

    if (cleanUserDetails.passwordHash) {
      delete cleanUserDetails.passwordHash;
    }

    return user
      .save()
      .then((user) => {
        var cleanUserDetails: any = user;

        if (cleanUserDetails.passwordHash) {
          cleanUserDetails.passwordHash = undefined;
        }

        res.status(201).json({ user: cleanUserDetails });
      })
      .catch((error) => res.status(500).json({ error }));
  } catch (error) {
    return res.status(500).json({ message: "Unable to hash password", error });
  }
};
const readUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .select("-passwordHash")
    .then((user) =>
      user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
  return User.find()
    .select("-passwordHash")
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(500).json({ error }));
};
const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .select("-passwordHash")
    .then((user) => {
      if (user) {
        /* Avoid changing password passwordHash from userObject */
        // var cleanUserDetails = req.body;

        // if (cleanUserDetails.passwordHash) {
        //   delete cleanUserDetails.passwordHash;
        // }

        user.set(req.body);

        return user
          .save()
          .then((user) => res.status(201).json({ user }))
          .catch((error) => res.status(500).json({ error }));
      }
    });
};
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findByIdAndDelete(userId)
    .then((user) =>
      user
        ? res.status(201).json({ message: "User deleted." })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default { createUser, readUser, readAll, updateUser, deleteUser };
