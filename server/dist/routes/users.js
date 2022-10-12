"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controller/userController");
/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});
router.post("/register", userController_1.RegisterUser);
router.post("/login", userController_1.LoginUser);
router.get("/getOrders/:id", userController_1.getOrders); // To get all the users records including his orders to populate his dashboard
router.post("/createOrders", userController_1.MakeOrders); // Request for order
router.get("/getOneMeal/:id", userController_1.getOneMealDetail); // To get one meal record. This record contains the vendor's id
router.post("/giveFeedback/:id", userController_1.giveFeedback);
router.post("/getAnOrder/:id", userController_1.getOneOrderDetail);
exports.default = router;
