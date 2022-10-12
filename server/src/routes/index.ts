import express, { Request, Response, NextFunction } from "express";
import { getAllMenu } from "../controller/userController";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({ message: "success" });
});
router.get("/getallfood", getAllMenu);
export default router;
