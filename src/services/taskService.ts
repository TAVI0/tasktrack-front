import api from './api';
import type { Task, TaskPayload } from '../types';

export const taskService = {
  async getAll(): Promise<Task[]> {
    const { data } = await api.get<Task[]>('/tasks');
    return data;
  },

  async getById(id: number): Promise<Task> {
    const { data } = await api.get<Task>(`/tasks/${id}`);
    return data;
  },

    async create(task: TaskPayload): Promise<Task> {
    const { data } = await api.post<Task>('/tasks', task);
    return data;
  },

  async update(id: number, task: TaskPayload): Promise<Task> {
    const { data } = await api.put<Task>(`/tasks/${id}`, task);
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  }
};
