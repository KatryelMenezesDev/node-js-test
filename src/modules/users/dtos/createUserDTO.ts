export interface IInputCreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface IOutputCreateUserDTO {
  id: string;
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}
