"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorsInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const menu_1 = require("./menu");
const orders_1 = require("./orders");
class VendorsInstance extends sequelize_1.Model {
}
exports.VendorsInstance = VendorsInstance;
VendorsInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "vendor company name is required",
            },
            notEmpty: {
                msg: "Full Name cannot be empty",
            },
        },
    },
    ownedBy: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "owner name is required",
            },
            notEmpty: {
                msg: "owner name cannot be empty",
            },
        },
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "vendor address is required",
            },
            notEmpty: {
                msg: "vendor address cannot be empty",
            },
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "Email is required",
            },
            isEmail: {
                msg: "Email cannot be empty",
            },
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required",
            },
            notEmpty: {
                msg: "Password cannot be empty",
            },
        },
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "Phone Number is required",
            },
            notEmpty: {
                msg: "Phone Number cannot be empty",
            },
        },
    },
    verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                msg: "verification status is required",
            },
            notEmpty: {
                msg: "verification status cannot be empty",
            },
        },
    },
}, {
    sequelize: database_config_1.default,
    tableName: "Vendors",
});
VendorsInstance.hasMany(menu_1.MenuInstance, { foreignKey: "vendorId", as: "menu" });
menu_1.MenuInstance.belongsTo(VendorsInstance, {
    foreignKey: "vendorId",
    as: "vendor",
});
VendorsInstance.hasMany(orders_1.OrderInstance, {
    foreignKey: "vendorId",
    as: "orders",
});
orders_1.OrderInstance.belongsTo(VendorsInstance, {
    foreignKey: "vendorId",
    as: "vendor",
});
