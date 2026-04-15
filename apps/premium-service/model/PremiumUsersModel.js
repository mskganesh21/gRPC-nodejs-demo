import { Model, DataTypes } from "sequelize";
import { SequelizeConfig } from "../config/dbConnect.js";

class PremiumUser extends Model {}

PremiumUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize: SequelizeConfig,
    modelName: "preUser",
  },
);

export default PremiumUser;
