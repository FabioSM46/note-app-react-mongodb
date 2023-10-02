import express from "express";
import { login, register, verify } from "../controllers/authentication";
import { isAuthenticated } from "../middleware/index";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get("/auth/verify", isAuthenticated, verify);
};
