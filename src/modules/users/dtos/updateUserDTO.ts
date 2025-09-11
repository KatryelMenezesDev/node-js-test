export interface IInputUpdateUserDTO {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

export interface IOutputUpdateUserDTO {
  id: string;
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}
