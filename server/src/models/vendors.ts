import { DataType, DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import { MenuInstance } from "./menu";
import { OrderInstance } from "./orders";

interface VendorsAttributes {
  id: string;
  name: string;
  ownedBy: string;
  address: string;
  email: string;
  password: string;
  phoneNumber: string;
  verified: boolean;
}

export class VendorsInstance extends Model<VendorsAttributes> {}

VendorsInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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

    verified: {
      type: DataTypes.BOOLEAN,
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
  },
  {
    sequelize: db,
    tableName: "Vendors",
  }
);
VendorsInstance.hasMany(MenuInstance, { foreignKey: "vendorId", as: "menu" });

MenuInstance.belongsTo(VendorsInstance, {
  foreignKey: "vendorId",
  as: "vendor",
});

VendorsInstance.hasMany(OrderInstance, {
  foreignKey: "vendorId",
  as: "orders",
});

OrderInstance.belongsTo(VendorsInstance, {
  foreignKey: "vendorId",
  as: "vendor",
});
