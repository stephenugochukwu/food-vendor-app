"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class FoodInstance extends sequelize_1.Model {
}
exports.FoodInstance = FoodInstance;
FoodInstance.init({
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
                msg: "Food name is required",
            },
            notEmpty: {
                msg: "Food name cannot be empty",
            },
        },
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Food description is required",
            },
            notEmpty: {
                msg: "Food description cannot be empty",
            },
        },
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Food image is required",
            },
            notEmpty: {
                msg: "Food image cannot be empty",
            },
        },
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Food image is required",
            },
            notEmpty: {
                msg: "Food image cannot be empty",
            },
        },
    },
    premium: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Food premium truth value is required",
            },
            notEmpty: {
                msg: "Food premium truth value cannot be empty",
            },
        },
    },
    price: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Food price is required",
            },
            notEmpty: {
                msg: "Food price cannot be empty",
            },
        },
    },
    vendorId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Vendor is required",
            },
            notEmpty: {
                msg: "Vendor cannot be empty",
            },
        },
    },
}, {
    sequelize: database_config_1.default,
    tableName: "Foods",
});
