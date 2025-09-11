export enum ProjectStatus {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    ARCHIVED = "archived",
  }

export interface IInputCreateProjectsDTO {
    name: string;
    description?: string;
    start_date?: Date;
    end_date?: Date;
}

export interface IOutputCreateProjectsDTO {
    id: string;
    name: string;
    description?: string;
    start_date?: Date;
    end_date?: Date;
    status: ProjectStatus;
    created_at?: Date;
    updated_at?: Date;
}
