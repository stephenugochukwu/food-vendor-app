import { DataType, DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface OrderAttributes {
  id: string;
  userId: string;
  foodId: string;
  vendorId: string;
  comments: string;
  orderStatus: string;
  orderDate: Date;
}

export class OrderInstance extends Model<OrderAttributes> {}

OrderInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    foodId: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    orderStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    orderDate: {
      type: DataTypes.DATE,
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
  },
  {
    sequelize: db,
    tableName: "Orders",
  }
);
