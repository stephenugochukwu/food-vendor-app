import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import {
  RegisterAdmin,
  LoginAdmin,
  verifyVendor,
  getOneVendorDetails,
  getAllVendorDetails,
  removeVendor,
  getAllUserDetails,
} from "../controller/adminController";
import { authAdmin } from "../middleware/auth";

/* GET admin listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("respond with a resource");
});
router.post("/register", RegisterAdmin);
router.post("/login", LoginAdmin);
router.patch("/verifyvendor/:id", authAdmin, verifyVendor);
router.get("/getOneVendor/:id", getOneVendorDetails);
router.get("/getAllVendors", getAllVendorDetails);
router.get("/removeVendor", removeVendor);
router.get("/getAllUsers", getAllUserDetails);
export default router;
