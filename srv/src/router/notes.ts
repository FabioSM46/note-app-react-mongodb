import express from "express";
import { getNotes, postNote } from "../controllers/notes";
import { isAuthenticated, isOwner } from "../middleware/index";

export default (router: express.Router) => {
  router.post("/api/newnote", /* isAuthenticated, */ postNote);
  router.get("/api/notes/:id", /*  isAuthenticated, isOwner, */ getNotes);
};
