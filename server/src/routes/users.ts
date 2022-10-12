import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import {
  RegisterUser,
  LoginUser,
  MakeOrders,
  getOrders,
  getOneMealDetail,
  giveFeedback,
  getOneOrderDetail,
} from "../controller/userController";

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("respond with a resource");
});
router.post("/register", RegisterUser);

router.post("/login", LoginUser);
router.get("/getOrders/:id", getOrders); // To get all the users records including his orders to populate his dashboard
router.post("/createOrders", MakeOrders); // Request for order
router.get("/getOneMeal/:id", getOneMealDetail); // To get one meal record. This record contains the vendor's id
router.post("/giveFeedback/:id", giveFeedback);
router.post("/getAnOrder/:id", getOneOrderDetail);

export default router;
