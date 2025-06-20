import axios from 'axios';
import { Task } from '@/types';

const BASE_URL = 'http://localhost:3001';

 export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(`${BASE_URL}/tasks`);
  console.log("Raw API data:", JSON.stringify(res.data, null, 2));
  return res.data;
};

export const addTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const res = await axios.post(`${BASE_URL}/tasks`, task);
  return res.data;
};


export const updateTask = async (id: number, updates: Partial<Task>): Promise<Task> =>  {
  const res = await axios.patch(`${BASE_URL}/tasks/${id}`, updates);
  return res.data;
};

 export const deleteTask = async (id: number): Promise<void> =>  {
  // if (!id || typeof id !== 'string') {
  //   console.error("deleteTask called with invalid ID:", id);
  //   throw new Error("Invalid task ID");
  // }
  await axios.delete(`${BASE_URL}/tasks/${id}`);
};

 export const loginUser = async (username: string, password: string): Promise<boolean> => {
  const res = await axios.get(`${BASE_URL}/users`);
  const user = res.data.find((u: any) => u.username === username && u.password === password);
  return !!user;
};
