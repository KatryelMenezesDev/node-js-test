import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../sequelizeClient";

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, "id" | "created_at" | "updated_at">;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  // Os campos são automaticamente fornecidos pelo Sequelize através dos getters/setters
  declare id: string;
  declare name: string;
  declare email: string;
  declare password: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  },
);

export { User };
