import { Router } from "express";
import Auth from "../middleware/auth";
import Middleware from "../middleware/middleware";
import paramsSchema from "../middleware/userParamSchema/userRequests";

// import controllers here
import AuthController from "../controllers/userController/auth";

const router = Router();

router.get("/", async function (req, res) {
  try {
    res.status(200).send("server is running");
  } catch (error) {
  }
});

// Authentication routes

router.post(
  "/login",
  Middleware.checkParams(paramsSchema.login, "body"),
  AuthController.loign
);

router.post("/logout",
  Auth.userProtectRoute,
  AuthController.logout
);

export default router;
