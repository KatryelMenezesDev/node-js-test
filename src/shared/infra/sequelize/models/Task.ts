import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../sequelizeClient";

interface TaskAttributes {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  created_at?: Date;
  updated_at?: Date;
}

type TaskCreationAttributes = Optional<TaskAttributes, "id" | "description" | "status" | "created_at" | "updated_at">;

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  // Os campos são automaticamente fornecidos pelo Sequelize através dos getters/setters
  declare id: string;
  declare project_id: string;
  declare title: string;
  declare description?: string;
  declare status: "todo" | "in_progress" | "done";
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Task.init(
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
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(["todo", "in_progress", "done"])),
      allowNull: false,
      defaultValue: "todo",
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: true,
  },
);

export { Task };
