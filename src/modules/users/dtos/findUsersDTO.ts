export interface IInputFindUserByIdDTO {
  id: string;
}

export interface IOutputFindUserByIdDTO {
  id: string;
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}
