import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../sequelizeClient";

export enum ProjectStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  ARCHIVED = "archived",
}

interface ProjectAttributes {
  id: string;
  name: string;
  description?: string;
  start_date?: Date;
  end_date?: Date;
  status: ProjectStatus;
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
  public status!: ProjectStatus;
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
      type: DataTypes.ENUM(...Object.values(ProjectStatus)),
      allowNull: false,
      defaultValue: ProjectStatus.PENDING,
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
