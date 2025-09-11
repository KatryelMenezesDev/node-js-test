export interface IInputUpdateTaskDTO {
  id: string;
  title?: string;
  description?: string;
  status?: "todo" | "in_progress" | "done";
}

export interface IOutputUpdateTaskDTO {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  created_at?: Date;
  updated_at?: Date;
}
