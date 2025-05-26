export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  dueDate: string | null;
}

export type TaskPayload = Omit<Task, 'id'|'createdAt'>;

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  userId: number;
  role: string;
}