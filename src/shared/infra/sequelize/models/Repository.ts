import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../sequelizeClient";

interface RepositoryAttributes {
  id: string;
  project_id: string;
  github_id: number;
  name: string;
  full_name: string;
  description?: string;
  html_url: string;
  clone_url: string;
  language?: string;
  stargazers_count: number;
  forks_count: number;
  created_at?: Date;
  updated_at?: Date;
}

type RepositoryCreationAttributes = Optional<RepositoryAttributes, "id" | "created_at" | "updated_at">;

class Repository extends Model<RepositoryAttributes, RepositoryCreationAttributes> implements RepositoryAttributes {
  declare id: string;
  declare project_id: string;
  declare github_id: number;
  declare name: string;
  declare full_name: string;
  declare description?: string;
  declare html_url: string;
  declare clone_url: string;
  declare language?: string;
  declare stargazers_count: number;
  declare forks_count: number;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Repository.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    project_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "projects",
        key: "id",
      },
    },
    github_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    html_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    clone_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    stargazers_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    forks_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Repository",
    tableName: "repositories",
    timestamps: true,
  },
);

export { Repository };
