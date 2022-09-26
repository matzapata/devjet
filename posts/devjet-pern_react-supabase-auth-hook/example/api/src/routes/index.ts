import * as express from "express";

const router: express.Router = express.Router();

router.use("*", (req: express.Request, res: express.Response) => {
  res.status(404).send("Bad request");
});

export default router;
