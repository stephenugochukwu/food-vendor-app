"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authVendor = exports.authAdmin = exports.authUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const users_1 = require("../models/users");
const vendors_1 = require("../models/vendors");
const admin_1 = require("../models/admin");
async function authUser(req, res, next) {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            res.status(401).json({
                Error: "Kindly login from the user login page",
            });
        }
        const token = auth.slice(7, auth.length);
        let verified = jsonwebtoken_1.default.verify(token, secret);
        if (!verified) {
            return res.status(401).json({
                Error: "User verification failed, access denied",
            });
        }
        const { id } = verified;
        const user = await users_1.UserInstance.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({
                Error: "User verification failed",
            });
        }
        req.user = verified;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(403).json({
            error,
            Error: "You are not logged in",
        });
    }
}
exports.authUser = authUser;
async function authAdmin(req, res, next) {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            res.status(401).json({
                Error: "Kindly login from the Admin login page",
            });
        }
        const token = auth.slice(7, auth.length);
        let verified = jsonwebtoken_1.default.verify(token, secret);
        if (!verified) {
            return res.status(401).json({
                Error: "Admin verification failed, access denied",
            });
        }
        const { id } = verified;
        const admin = await admin_1.AdminInstance.findOne({ where: { id } });
        if (!admin) {
            return res.status(404).json({
                Error: "Admin verification failed",
            });
        }
        req.admin = verified;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(403).json({
            error,
            Error: "You are not logged in",
        });
    }
}
exports.authAdmin = authAdmin;
async function authVendor(req, res, next) {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            return res.status(401).json({
                Error: "Kindly login from the vendor login page",
            });
        }
        const token = auth.slice(7, auth.length);
        let verified = jsonwebtoken_1.default.verify(token, secret);
        if (!verified) {
            return res.status(401).json({
                Error: "Verification failed, access denied",
            });
        }
        const { id } = verified;
        const vendor = await vendors_1.VendorsInstance.findOne({ where: { id } });
        if (!vendor) {
            return res.status(404).json({
                Error: "Vendor verification failed",
            });
        }
        req.vendor = verified;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(403).json({
            error,
            Error: "You are not logged in",
        });
    }
}
exports.authVendor = authVendor;
