"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMenu = exports.updateMenu = exports.updateVendorRecord = exports.getAllVendorDetails = exports.getAllDetailsWithPendingStatus = exports.updateOrderStatus = exports.LoginVendor = exports.RegisterVendor = exports.getAllDetailsWithInactiveStatus = exports.getAllDetailsWithActiveStatus = exports.AddFoodToMenu = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const vendors_1 = require("../models/vendors");
const menu_1 = require("../models/menu");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const orders_1 = require("../models/orders");
async function AddFoodToMenu(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.createMenuSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await menu_1.MenuInstance.create({
            id: id,
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category,
            premium: req.body.premium,
            price: req.body.price,
            dayServed: req.body.dayServed,
            vendorId: req.body.vendorId,
        });
        return res.status(201).json({
            msg: "You have successfully added a food to the menu",
            record: record,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "failed to create",
            route: "/addfoodtomenu",
        });
    }
}
exports.AddFoodToMenu = AddFoodToMenu;
async function getAllDetailsWithActiveStatus(req, res, next) {
    try {
        //const vendorId = req.cookies.id;
        const vendorId = req.params.id;
        const record = (await vendors_1.VendorsInstance.findOne({
            where: { id: vendorId },
            include: [
                {
                    model: menu_1.MenuInstance,
                    as: "menu",
                    where: {
                        orderStatus: "active",
                    },
                },
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
            msg: "failed to get record",
            route: "/login",
        });
    }
}
exports.getAllDetailsWithActiveStatus = getAllDetailsWithActiveStatus;
async function getAllDetailsWithInactiveStatus(req, res, next) {
    try {
        //const vendorId = req.cookies.id;
        const vendorId = req.params.id;
        const record = (await vendors_1.VendorsInstance.findOne({
            where: { id: vendorId },
            include: [
                {
                    model: menu_1.MenuInstance,
                    as: "menu",
                    where: {
                        orderStatus: "inactive",
                    },
                },
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
            msg: "failed to get record",
            route: "/login",
        });
    }
}
exports.getAllDetailsWithInactiveStatus = getAllDetailsWithInactiveStatus;
async function RegisterVendor(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.vendorsRegisterSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const duplicatEmail = await vendors_1.VendorsInstance.findOne({
            where: { email: req.body.email },
        });
        if (duplicatEmail) {
            return res.status(409).json({
                msg: "Email is used, please enter another email",
            });
        }
        const duplicatePhone = await vendors_1.VendorsInstance.findOne({
            where: { phoneNumber: req.body.phoneNumber },
        });
        if (duplicatePhone) {
            return res.status(409).json({
                msg: "Phone number is used",
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const record = await vendors_1.VendorsInstance.create({
            id: id,
            name: req.body.name,
            ownedBy: req.body.ownedBy,
            address: req.body.address,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: passwordHash,
            verified: false,
        });
        return res.status(201).json({
            msg: "You have successfully registered",
            record: record,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "failed to register",
            route: "/register",
        });
    }
}
exports.RegisterVendor = RegisterVendor;
async function LoginVendor(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.vendorLoginSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const Vendor = (await vendors_1.VendorsInstance.findOne({
            where: { email: req.body.email },
        }));
        const { id } = Vendor;
        const token = (0, utils_1.generateToken)({ id });
        const validVendor = await bcryptjs_1.default.compare(req.body.password, Vendor.password);
        if (!validVendor) {
            res.status(401).json({
                message: "Password does not match",
            });
        }
        if (validVendor) {
            res.cookie("authorization", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
            });
            res.cookie("id", id, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
            });
            res.status(201).json({
                message: "Successfully logged in",
                token,
                Vendor,
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
exports.LoginVendor = LoginVendor;
async function updateOrderStatus(req, res, next) {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;
        const validationResult = utils_1.updateOrderStatusSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await orders_1.OrderInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                Error: "This order is no longer available",
            });
        }
        const updatedrecord = await record.update({
            orderStatus: orderStatus,
        });
        res.status(201).json({
            message: "Order status has been updated successfully",
            feedback: updatedrecord,
        });
    }
    catch {
        res.status(500).json({
            err: Error,
            msg: "An error has occured",
            route: "/updateOrderStatus",
        });
    }
}
exports.updateOrderStatus = updateOrderStatus;
async function getAllDetailsWithPendingStatus(req, res, next) {
    try {
        //const vendorId = req.cookies.id;
        const vendorId = req.params.id;
        const record = (await vendors_1.VendorsInstance.findOne({
            where: { id: vendorId },
            include: [
                {
                    model: menu_1.MenuInstance,
                    as: "menu",
                    where: {
                        orderStatus: "pending",
                    },
                },
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
            msg: "failed to get record",
            route: "/login",
        });
    }
}
exports.getAllDetailsWithPendingStatus = getAllDetailsWithPendingStatus;
async function getAllVendorDetails(req, res, next) {
    try {
        //const vendorId = req.cookies.id;
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
            msg: "failed to get record",
            route: "/login",
        });
    }
}
exports.getAllVendorDetails = getAllVendorDetails;
async function updateVendorRecord(req, res, next) {
    try {
        const { id } = req.params;
        const validationResult = utils_1.updateVendorSchema.validate(req.body, utils_1.options);
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
            name: req.body.name,
            ownedBy: req.body.ownedBy,
            address: req.body.address,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
        });
        res.status(201).json({
            message: "Your record has been updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to update",
            route: "/updatevendor/:id",
        });
    }
}
exports.updateVendorRecord = updateVendorRecord;
async function updateMenu(req, res, next) {
    try {
        const { id } = req.params;
        const validationResult = utils_1.updateMenuSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await menu_1.MenuInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                Error: "Cannot find specified menu at this time",
            });
        }
        const updatedrecord = await record.update({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category,
            premium: req.body.premium,
            dayServed: req.body.dayServed,
            price: req.body.price,
        });
        res.status(201).json({
            message: "Your menu has been updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to update",
            route: "/updatemenu/:id",
        });
    }
}
exports.updateMenu = updateMenu;
async function removeMenu(req, res, next) {
    try {
        const { id } = req.params;
        const record = await menu_1.MenuInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                msg: "Cannot find the specified menu",
            });
        }
        const deletedRecord = await record.destroy();
        res.status(201).json({
            message: "You have successfully removed this menu",
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to delete",
            route: "/deletefood/:id",
        });
    }
}
exports.removeMenu = removeMenu;
