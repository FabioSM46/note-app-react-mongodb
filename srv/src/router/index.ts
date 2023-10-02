import express from "express";
import authentication from "./authentication";
import users from "./users";
import notes from "./notes";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  notes(router);
  return router;
};
