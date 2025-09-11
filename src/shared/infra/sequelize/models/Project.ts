import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../sequelizeClient";

interface ProjectAttributes {
  id: string;
  name: string;
  description?: string;
  start_date?: Date;
  end_date?: Date;
  status: "pending" | "in_progress" | "completed" | "archived";
  created_at?: Date;
  updated_at?: Date;
}

type ProjectCreationAttributes = Optional<ProjectAttributes, "id" | "created_at" | "updated_at">;

class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  // Os campos são automaticamente fornecidos pelo Sequelize através dos getters/setters
  declare id: string;
  declare name: string;
  declare description?: string;
  declare start_date?: Date;
  declare end_date?: Date;
  declare status: "pending" | "in_progress" | "completed" | "archived";
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Project.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(["pending", "in_progress", "completed", "archived"])),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "Project",
    tableName: "projects",
    timestamps: true,
  },
);

export { Project };
