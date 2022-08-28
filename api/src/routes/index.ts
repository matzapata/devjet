import * as express from "express";
import userRouter from "./users";

const router: express.Router = express.Router();

router.use("/users", userRouter);

router.use("*", (req: express.Request, res: express.Response) => {
  res.status(404).send("Bad request");
});

export default router;
