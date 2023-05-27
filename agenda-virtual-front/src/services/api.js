import axios from 'axios';

const baseURL = 'http://localhost/api'

const api = axios.create({baseURL})

export async function getScheduleList() {
  const result = await api.get(`schedules`);
  console.log(baseURL)
  return result.data;
}

export async function getDayHours(date) {
  const res = await api.get(`/date/hours/${date}`);
  return res.data;
}

export async function getServices() {
  const res = await api.get(`/services`);
  return res.data;
}

export async function getWaiting() {
  const res = await api.get(`/waiting`);
  return res.data;
}

export async function getHistory(name = null) {
  const res = await api.get(`/history?name=${name}`);
  return res.data;
}

export async function createSchedule(body) {
  const res = await api.post(`/schedule`, body);

  return res;
}

export async function createWaiting(body) {
  const res = await api.post(`/waiting`, body);

  return res;
}

export async function updateSchedule(body, id) {
  const res = await api.put(`/schedule/${id}`, body);

  return res;
}

export async function deleteSchedule(id) {
  const res = await api.delete(`/schedule/${id}`);

  return res;
}

export async function deleteWaiting(id) {
  const res = await api.delete(`/waiting/${id}`);

  return res;
}

export async function finishSchedule(id) {
  const res = await api.put(`/schedule/finish/${id}`);

  return res;
}
