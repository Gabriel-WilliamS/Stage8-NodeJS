const { Router } = require("express");
const NoteTagsController = require("../controllers/NoteTagsController");

const noteTagsRouter = Router();
const noteTagsController = new NoteTagsController();

noteTagsRouter.put("/:id", noteTagsController.update);

module.exports = noteTagsRouter;
