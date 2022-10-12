"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.updateMenuSchema = exports.updateVendorSchema = exports.updateOrderStatusSchema = exports.feedbackSchema = exports.verifyVendorSchema = exports.makeOrderSchema = exports.createOrdersSchema = exports.createMenuSchema = exports.vendorsRegisterSchema = exports.adminRegisterSchema = exports.generateToken = exports.vendorLoginSchema = exports.adminLoginSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.registerSchema = joi_1.default.object()
    .keys({
    fullName: joi_1.default.string().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    phoneNumber: joi_1.default.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    confirm_password: joi_1.default.ref("password"),
})
    .with("password", "confirm_password");
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
});
exports.adminLoginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
});
exports.vendorLoginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
});
//Generate Token
const generateToken = (user) => {
    const pass = `${process.env.JWT_SECRET}`;
    return jsonwebtoken_1.default.sign(user, pass, { expiresIn: "7d" });
};
exports.generateToken = generateToken;
exports.adminRegisterSchema = joi_1.default.object()
    .keys({
    fullName: joi_1.default.string().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    phoneNumber: joi_1.default.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    confirm_password: joi_1.default.ref("password"),
})
    .with("password", "confirm_password");
exports.vendorsRegisterSchema = joi_1.default.object()
    .keys({
    name: joi_1.default.string().required(),
    ownedBy: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    phoneNumber: joi_1.default.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    confirm_password: joi_1.default.ref("password"),
})
    .with("password", "confirm_password");
exports.createMenuSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    premium: joi_1.default.boolean().required(),
    dayServed: joi_1.default.string().lowercase().required(),
    price: joi_1.default.number().required(),
    vendorId: joi_1.default.string().required(),
});
exports.createOrdersSchema = joi_1.default.object().keys({
    userId: joi_1.default.string().required(),
    foodId: joi_1.default.string().required(),
    vendorId: joi_1.default.string().required(),
    comments: joi_1.default.string().required(),
    orderDate: joi_1.default.date().required(),
});
exports.makeOrderSchema = joi_1.default.object().keys({
    userId: joi_1.default.string().required(),
    foodId: joi_1.default.string().required(),
    vendorId: joi_1.default.string().required(),
});
exports.verifyVendorSchema = joi_1.default.object().keys({
    verified: joi_1.default.boolean(),
});
exports.feedbackSchema = joi_1.default.object().keys({
    comments: joi_1.default.string().required(),
});
exports.updateOrderStatusSchema = joi_1.default.object().keys({
    orderStatus: joi_1.default.string().lowercase().required(),
});
exports.updateVendorSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    ownedBy: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    phoneNumber: joi_1.default.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
});
exports.updateMenuSchema = joi_1.default.object().keys({
    name: joi_1.default.string(),
    description: joi_1.default.string(),
    image: joi_1.default.string(),
    category: joi_1.default.string(),
    premium: joi_1.default.boolean(),
    dayServed: joi_1.default.string().lowercase(),
    price: joi_1.default.number(),
    vendorId: joi_1.default.string(),
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
