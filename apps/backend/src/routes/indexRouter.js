const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/initial", indexController.getInitialProps);
indexRouter.get("/maps", indexController.getMaps);
indexRouter.get("/maps/:mapId/characters", indexController.getCharacters);
indexRouter.get("/maps/:mapId/score", indexController.getScore);
indexRouter.post("/maps/:mapId/score", indexController.postScore);
indexRouter.get("/maps/:mapId/scores", indexController.getMapScores);
indexRouter.post("/maps/:mapId/getCheckedCharacters", indexController.getCheckedCharacters);

module.exports = indexRouter;
