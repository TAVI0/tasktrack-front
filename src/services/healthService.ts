import api from './api';

export const healthService = {
  async check(): Promise<boolean> {
    try {
      const { data } = await api.get<{ status: string }>('/health');
      return data?.status === 'UP';
    } catch {
      return false;
    }
  }
};
