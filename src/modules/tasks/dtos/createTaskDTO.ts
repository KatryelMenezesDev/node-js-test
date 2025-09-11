export interface IInputCreateTaskDTO {
  project_id: string;
  title: string;
  description?: string;
}

export interface IOutputCreateTaskDTO {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  created_at?: Date;
  updated_at?: Date;
}
