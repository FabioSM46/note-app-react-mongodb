import express from "express";
import {
  deleteNote,
  getNotes,
  postNote,
  updateNote,
} from "../controllers/notes";
import { isAuthenticated, isOwner } from "../middleware/index";

export default (router: express.Router) => {
  router.post("/api/newnote", /* isAuthenticated, */ postNote);
  router.get("/api/notes/:id", /*  isAuthenticated, isOwner, */ getNotes);
  router.delete(
    "/api/notes/del/:id",
    /* isAuthenticated, isOwner, */ deleteNote
  );
  router.patch(
    "/api/notes/update/:id",
    /* isAuthenticated, isOwner, */ updateNote
  );
};
