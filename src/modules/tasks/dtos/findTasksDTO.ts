export interface IInputFindTasksByProjectDTO {
  project_id: string;
}

export interface IOutputFindAllTasksDTO {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  created_at?: Date;
  updated_at?: Date;
}

export interface IOutputFindTasksByProjectDTO {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  created_at?: Date;
  updated_at?: Date;
}
