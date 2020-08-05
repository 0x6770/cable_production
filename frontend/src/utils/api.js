import axios from "axios";
import qs from "qs";

import { api_base } from "../config";

const api = axios.create({
  baseURL: api_base,
});

// ANCHOR user

export const login = async (formData) => {
  return api.post(`/user/login`, qs.stringify(formData));
};

export const signup = async (formData) => {
  return api.post(`/user/signup`, qs.stringify(formData));
};

export const logout = async () => {
  return api.post(`/user/logout`);
};

export const getUsers = async () => {
  return api.get(`/user/get`);
};

export const getMe = async () => {
  return api.get(`/user/me`);
};

export const deleteUserById = async (id) => {
  return api.delete(`/user/delete/${id}`);
};

export const updateUserById = async (id, data) => {
  return api.put(`/user/update/${id}`, qs.stringify(data));
};

// ANCHOR production tasks

export const insertTask = (type, formData) => {
  return api.post(`/task/${type}/add`, qs.stringify(formData));
};

export const updateTask = (type, id, formData) => {
  return api.put(`/task/${type}/update/${id}`, qs.stringify(formData));
};

export const getTasks = async (type) => {
  return await api.get(`/task/${type}/get`);
};

export const getTaskById = async (type, id) => {
  return await api.get(`/task/${type}/get/${id}`);
};

export const getTaskByMachine = async (type, number) => {
  return await api.get(`/task/${type}/get/m/${number}`);
};

export const deleteTaskById = (type, id) => {
  return api.delete(`/task/${type}/delete/${id}`);
};

export const searchProductionNumber = async (type) => {
  return await api.get(`/task/${type}/search/production_number`);
};

export const searchTasks = async (type, keyword) => {
  return await api.get(`/task/${type}/search/${keyword}`);
};

// ANCHOR executing task for a machine

export const getExecutingTasks = async (type) => {
  return await api.get(`/executing/${type}/get`);
};

export const changeExecutingTasks = async (type, id, machine_number) => {
  const data = { id: id, machine_number: machine_number };
  return await api.post(`/executing/${type}/change`, qs.stringify(data));
};

export const updateFinishedAmount = async (type, id, amount) => {
  console.log("updateFinishedAmount -> amount", amount);
  const data = { id: id, data: amount };
  const sData = qs.stringify(data, { arrayFormat: "brackets" });

  return getTaskById(type, id).then((res) => {
    if (res.data.finished === false) {
      return api.post("/executing/" + type + "/update", sData);
    } else {
      return Promise.reject(
        "This task is already finished, please restore first if you want to change amount finished."
      );
    }
  });
};

export const updateFinishedState = async (type, id, finished) => {
  const data = { id: id, data: { finished: finished } };
  const sData = qs.stringify(data, { arrayFormat: "brackets" });
  return await api.post("/executing/" + type + "/update", sData);
};

// ANCHOR workers

export const insertWorker = (type, formData) => {
  return api.post(`/worker/${type}/add`, qs.stringify(formData));
};

export const updateWorker = (type, id, formData) => {
  return api.put(`/worker/${type}/update/${id}`, qs.stringify(formData));
};

export const getWorkers = async (type) => {
  return await api.get(`/worker/${type}/get`);
};

export const deleteWorkerById = (type, id) => {
  return api.delete(`/worker/${type}/delete/${id}`);
};

// ANCHOR productivity

export const insertProductivity = (type, formData) => {
  return api.post(`/productivity/${type}/add`, qs.stringify(formData));
};

export const updateProductivity = (type, id, formData) => {
  return api.put(`/productivity/${type}/update/${id}`, qs.stringify(formData));
};

export const getProductivity = async (type) => {
  return await api.get(`/productivity/${type}/get`);
};

export const deleteProductivityById = (type, id) => {
  return api.delete(`/productivity/${type}/delete/${id}`);
};

export const searchProductivity = async (type, keyword) => {
  return await api.get(`/productivity/${type}/search/${keyword}`);
};

const apis = {
  insertTask,
  getTasks,
  updateTask,
  deleteTaskById,
};

export default apis;
