import { DataType, DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface MenuAttributes {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  premium: boolean;
  price: number;
  dayServed: string;
  vendorId: string;
}

export class MenuInstance extends Model<MenuAttributes> {}

MenuInstance.init(
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
          msg: "Food name is required",
        },
        notEmpty: {
          msg: "Food name cannot be empty",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.BOOLEAN,
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
      type: DataTypes.NUMBER,
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
    dayServed: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Day served is required",
        },
        notEmpty: {
          msg: "Day served cannot be empty",
        },
      },
    },
    vendorId: {
      type: DataTypes.STRING,
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
  },
  {
    sequelize: db,
    tableName: "Menu",
  }
);
