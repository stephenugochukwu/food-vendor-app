import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import {
  RegisterVendor,
  LoginVendor,
  AddFoodToMenu,
  getAllVendorDetails,
  getAllDetailsWithActiveStatus,
  getAllDetailsWithInactiveStatus,
  getAllDetailsWithPendingStatus,
  updateOrderStatus,
  updateVendorRecord,
  updateMenu,
  removeMenu,
} from "../controller/vendorController";
import { authVendor } from "../middleware/auth";

/* GET vendors listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("respond with a resource");
});
router.post("/register", RegisterVendor);
router.post("/login", LoginVendor);
router.post("/addFood", authVendor, AddFoodToMenu);
router.get("/getActiveMenu/:id", getAllDetailsWithActiveStatus);
router.get("/getInactiveMenu/:id", getAllDetailsWithInactiveStatus);
router.get("/getPendingMenu/:id", getAllDetailsWithPendingStatus);
router.get("/getAllVendorDetails/:id", getAllVendorDetails);
router.get("/updateOrderStatus/:id", updateOrderStatus);
router.post("/updatevendor/:id", updateVendorRecord);
router.post("/updatemenu/:id", updateMenu);
router.delete("/deletefood/:id", removeMenu);

export default router;
