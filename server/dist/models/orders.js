"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class OrderInstance extends sequelize_1.Model {
}
exports.OrderInstance = OrderInstance;
OrderInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    foodId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "FoodId is required",
            },
            notEmpty: {
                msg: "FoodId cannot be empty",
            },
        },
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "userId is required",
            },
            notEmpty: {
                msg: "userId cannot be empty",
            },
        },
    },
    vendorId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "vendorId is required",
            },
            notEmpty: {
                msg: "vendorId cannot be empty",
            },
        },
    },
    comments: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    orderStatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    orderDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "orderDate is required",
            },
            notEmpty: {
                msg: "orderDate cannot be empty",
            },
        },
    },
}, {
    sequelize: database_config_1.default,
    tableName: "Orders",
});
