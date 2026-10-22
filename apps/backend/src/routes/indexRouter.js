const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get('/characters/initial', indexController.getInitialCharacters)
indexRouter.get('/maps', indexController.getMaps)
indexRouter.get('/maps/:mapId/characters', indexController.getCharacters)

module.exports = indexRouter;
