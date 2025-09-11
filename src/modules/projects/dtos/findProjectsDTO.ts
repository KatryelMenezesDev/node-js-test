export interface IOutputFindAllProjectsDTO {
  id: string;
  name: string;
  description?: string;
  start_date?: Date;
  end_date?: Date;
  status: "pending" | "in_progress" | "completed" | "archived";
  created_at?: Date;
  updated_at?: Date;
}

export interface IInputFindProjectByIdDTO {
  id: string;
}

export interface IOutputFindProjectByIdDTO {
  id: string;
  name: string;
  description?: string;
  start_date?: Date;
  end_date?: Date;
  status: "pending" | "in_progress" | "completed" | "archived";
  created_at?: Date;
  updated_at?: Date;
}
