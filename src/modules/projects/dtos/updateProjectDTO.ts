export interface IInputUpdateProjectDTO {
  id: string;
  name?: string;
  description?: string;
  start_date?: Date;
  end_date?: Date;
  status?: "pending" | "in_progress" | "completed" | "archived";
}

export interface IOutputUpdateProjectDTO {
  id: string;
  name: string;
  description?: string;
  start_date?: Date;
  end_date?: Date;
  status: "pending" | "in_progress" | "completed" | "archived";
  created_at?: Date;
  updated_at?: Date;
}
