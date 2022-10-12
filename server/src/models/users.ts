import { DataType, DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import { OrderInstance } from "./orders";

interface UserAttributes {
  id: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export class UserInstance extends Model<UserAttributes> {}

UserInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
  },
  {
    sequelize: db,
    tableName: "Users",
  }
);

UserInstance.hasMany(OrderInstance, { foreignKey: "userId", as: "orders" });

OrderInstance.belongsTo(UserInstance, {
  foreignKey: "userId",
  as: "user",
});
