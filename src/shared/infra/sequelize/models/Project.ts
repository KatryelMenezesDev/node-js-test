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
  public id!: string;
  public name!: string;
  public description?: string;
  public start_date?: Date;
  public end_date?: Date;
  public status!: "pending" | "in_progress" | "completed" | "archived";
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
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
