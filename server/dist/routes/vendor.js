"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const vendorController_1 = require("../controller/vendorController");
const auth_1 = require("../middleware/auth");
/* GET vendors listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});
router.post("/register", vendorController_1.RegisterVendor);
router.post("/login", vendorController_1.LoginVendor);
router.post("/addFood", auth_1.authVendor, vendorController_1.AddFoodToMenu);
router.get("/getActiveMenu/:id", vendorController_1.getAllDetailsWithActiveStatus);
router.get("/getInactiveMenu/:id", vendorController_1.getAllDetailsWithInactiveStatus);
router.get("/getPendingMenu/:id", vendorController_1.getAllDetailsWithPendingStatus);
router.get("/getAllVendorDetails/:id", vendorController_1.getAllVendorDetails);
router.get("/updateOrderStatus/:id", vendorController_1.updateOrderStatus);
router.post("/updatevendor/:id", vendorController_1.updateVendorRecord);
router.post("/updatemenu/:id", vendorController_1.updateMenu);
router.delete("/deletefood/:id", vendorController_1.removeMenu);
exports.default = router;
