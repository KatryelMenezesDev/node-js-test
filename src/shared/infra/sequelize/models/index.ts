import { User } from "./User";
import { Project } from "./Project";
import { Task } from "./Task";

Project.hasMany(Task, {
  foreignKey: "project_id",
  as: "tasks",
  onDelete: "CASCADE",
});

Task.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project",
});

export { User, Project, Task };

export { ProjectStatus } from "./Project";
export { TaskStatus } from "./Task";

export const models = {
  User,
  Project,
  Task,
};
