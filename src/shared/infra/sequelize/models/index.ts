import { User } from "./User";
import { Project } from "./Project";
import { Task } from "./Task";
import { Repository } from "./Repository";

Project.hasMany(Task, {
  foreignKey: "project_id",
  as: "tasks",
  onDelete: "CASCADE",
});

Task.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project",
});

Project.hasMany(Repository, {
  foreignKey: "project_id",
  as: "repositories",
  onDelete: "CASCADE",
});

Repository.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project",
});

export { User, Project, Task, Repository };

export const models = {
  User,
  Project,
  Task,
  Repository,
};
