import { Model, DataTypes } from "sequelize";
import { SequelizeConfig } from "../config/dbConnect.js";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize: SequelizeConfig,
    modelName: "User",
  },
);

export default User;
