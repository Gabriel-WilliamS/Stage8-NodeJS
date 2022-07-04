const { Router } = require("express");
const MoviesNotesController = require("../controllers/MoviesNotesController");

const moviesRouter = Router();
const moviesNotesController = new MoviesNotesController();

moviesRouter.post("/:id", moviesNotesController.create);
moviesRouter.delete("/:id", moviesNotesController.delete);
moviesRouter.put("/:note_id", moviesNotesController.update);
moviesRouter.get("/:id", moviesNotesController.showAll);

module.exports = moviesRouter;
