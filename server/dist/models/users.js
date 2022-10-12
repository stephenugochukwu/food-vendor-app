"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const orders_1 = require("./orders");
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Full Name is required",
            },
            notEmpty: {
                msg: "Full Name cannot be empty",
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
}, {
    sequelize: database_config_1.default,
    tableName: "Users",
});
UserInstance.hasMany(orders_1.OrderInstance, { foreignKey: "userId", as: "orders" });
orders_1.OrderInstance.belongsTo(UserInstance, {
    foreignKey: "userId",
    as: "user",
});
