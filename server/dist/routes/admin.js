"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const adminController_1 = require("../controller/adminController");
const auth_1 = require("../middleware/auth");
/* GET admin listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});
router.post("/register", adminController_1.RegisterAdmin);
router.post("/login", adminController_1.LoginAdmin);
router.patch("/verifyvendor/:id", auth_1.authAdmin, adminController_1.verifyVendor);
router.get("/getOneVendor/:id", adminController_1.getOneVendorDetails);
router.get("/getAllVendors", adminController_1.getAllVendorDetails);
router.get("/removeVendor", adminController_1.removeVendor);
router.get("/getAllUsers", adminController_1.getAllUserDetails);
exports.default = router;
