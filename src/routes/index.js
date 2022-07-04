const { Router } = require("express");

const usersRouter = require("./users.routes");
const moviesNotesRouter = require("./movies.routes");
const noteTagsRouter = require("./noteTags.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/movies-notes", moviesNotesRouter);
routes.use("/note-tags", noteTagsRouter);
module.exports = routes;
