"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserDetails = exports.getAllVendorDetails = exports.getOneVendorDetails = exports.removeVendor = exports.verifyVendor = exports.LoginAdmin = exports.RegisterAdmin = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const admin_1 = require("../models/admin");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const vendors_1 = require("../models/vendors");
const menu_1 = require("../models/menu");
const orders_1 = require("../models/orders");
const users_1 = require("../models/users");
async function RegisterAdmin(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.adminRegisterSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const duplicatEmail = await admin_1.AdminInstance.findOne({
            where: { email: req.body.email },
        });
        if (duplicatEmail) {
            return res.status(409).json({
                msg: "Email is used, please enter another email",
            });
        }
        const duplicatePhone = await admin_1.AdminInstance.findOne({
            where: { phoneNumber: req.body.phoneNumber },
        });
        if (duplicatePhone) {
            return res.status(409).json({
                msg: "Phone number is used",
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const record = await admin_1.AdminInstance.create({
            id: id,
            fullName: req.body.fullName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: passwordHash,
        });
        res.status(201).json({
            msg: "You have successfully registered",
            record: record,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "failed to register",
            route: "/register",
        });
    }
}
exports.RegisterAdmin = RegisterAdmin;
async function LoginAdmin(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.adminLoginSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const Admin = (await admin_1.AdminInstance.findOne({
            where: { email: req.body.email },
        }));
        const { id } = Admin;
        const token = (0, utils_1.generateToken)({ id });
        const validAdmin = await bcryptjs_1.default.compare(req.body.password, Admin.password);
        if (!validAdmin) {
            res.status(401).json({
                message: "Password do not match",
            });
        }
        if (validAdmin) {
            // res.cookie("authorization", token, {
            //   httpOnly: true,
            //   maxAge: 1000 * 60 * 60 * 24,
            // });
            // res.cookie("id", id, {
            //   httpOnly: true,
            //   maxAge: 1000 * 60 * 60 * 24,
            // });
            res.status(201).json({
                message: "Successfully logged in",
                token,
                Admin,
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "failed to login",
            route: "/login",
        });
    }
}
exports.LoginAdmin = LoginAdmin;
async function verifyVendor(req, res, next) {
    try {
        const { id } = req.params;
        const { verified } = req.body;
        const validationResult = utils_1.verifyVendorSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await vendors_1.VendorsInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                Error: "Cannot find existing vendor",
            });
        }
        const updatedrecord = await record.update({
            verified: verified,
        });
        res.status(201).json({
            message: "You have successfully verified Vendor",
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to update",
            route: "/verifyvendor/:id",
        });
    }
}
exports.verifyVendor = verifyVendor;
async function removeVendor(req, res, next) {
    try {
        const { id } = req.params;
        const record = await vendors_1.VendorsInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                msg: "Cannot find vendor",
            });
        }
        const deletedRecord = await record.destroy();
        res.status(201).json({
            message: "You have successfully removed this vendor",
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to delete",
            route: "/delete/:id",
        });
    }
}
exports.removeVendor = removeVendor;
async function getOneVendorDetails(req, res, next) {
    try {
        const vendorId = req.params.id;
        const record = (await vendors_1.VendorsInstance.findOne({
            where: { id: vendorId },
            include: [
                { model: menu_1.MenuInstance, as: "menu" },
                { model: orders_1.OrderInstance, as: "orders" },
            ],
        }));
        res.status(200).json({
            record: record,
        });
    }
    catch (err) {
        res.status(500).json({
            err: console.log(err),
            msg: "No record found",
            route: "/getOneVendor",
        });
    }
}
exports.getOneVendorDetails = getOneVendorDetails;
async function getAllVendorDetails(req, res, next) {
    try {
        const record = (await vendors_1.VendorsInstance.findAll({
            include: [
                { model: menu_1.MenuInstance, as: "menu" },
                { model: orders_1.OrderInstance, as: "orders" },
            ],
        }));
        res.status(200).json({
            record: record,
        });
    }
    catch (err) {
        res.status(500).json({
            err: console.log(err),
            msg: "No record found",
            route: "/getAllVendors",
        });
    }
}
exports.getAllVendorDetails = getAllVendorDetails;
async function getAllUserDetails(req, res, next) {
    try {
        const record = (await users_1.UserInstance.findAll({
            include: [{ model: orders_1.OrderInstance, as: "orders" }],
        }));
        res.status(200).json({
            record: record,
        });
    }
    catch (err) {
        res.status(500).json({
            err: console.log(err),
            msg: "Users record not found",
            route: "/getAllUsers",
        });
    }
}
exports.getAllUserDetails = getAllUserDetails;
