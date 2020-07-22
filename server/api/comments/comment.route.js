import express from "express";
import { body } from "express-validator";
import { catchErrors, authorization } from "../../middlewares";
import controller from "./comment.controller";

const commentRouter = express.Router({ mergeParams: true });

commentRouter
  .route("/")
  .get(catchErrors(controller.getAll))
  .post(
    authorization,
    [body("content").trim().escape()],
    catchErrors(controller.create)
  );

commentRouter
  .route("/:comment_id")
  .delete(authorization, catchErrors(controller.delete))
  .put(authorization, catchErrors(controller.update));

export default commentRouter;
