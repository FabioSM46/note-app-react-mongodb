import express from "express";
import { deleteUser, updateUser } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middleware/index";

export default (router: express.Router) => {
  router.delete("/user/:id", isAuthenticated, isOwner, deleteUser);
  router.patch("/user/:id", isAuthenticated, isOwner, updateUser);
};
