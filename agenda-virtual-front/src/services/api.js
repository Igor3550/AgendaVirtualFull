import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

function createHeaders(token) {
  const body = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
  return body;
}

export async function getScheduleList() {
  const result = await axios.get(`${baseURL}/schedule`);
  return result.data;
}

export async function getDayHours(date) {
  const res = await axios.get(`${baseURL}/date/hours/${date}`);
  return res.data;
}

export async function getServices() {
  const res = await axios.get(`${baseURL}/services`);
  return res.data;
}

export async function getWaiting() {
  const res = await axios.get(`${baseURL}/waiting`);
  return res.data;
}

export async function getHistory(name = null) {
  const res = await axios.get(`${baseURL}/history?name=${name}`);
  return res.data;
}

export async function createSchedule(body) {
  const res = await axios.post(`${baseURL}/schedule`, body);

  return res;
}

export async function createWaiting(body) {
  const res = await axios.post(`${baseURL}/waiting`, body);

  return res;
}

export async function signIn(body) {
  const res = await axios.post(`${baseURL}/auth`, body);

  return res;
}

export async function signUp(body) {
  const res = await axios.post(`${baseURL}/user`, body);

  return res;
}

export async function verify(token) {
  const header = createHeaders(token);
  const res = await axios.get(`${baseURL}/verify`, header);

  return res;
}

export async function updateSchedule(body, id) {
  const res = await axios.put(`${baseURL}/schedule/${id}`, body);

  return res;
}

export async function deleteSchedule(id) {
  const res = await axios.delete(`${baseURL}/schedule/${id}`);

  return res;
}

export async function deleteWaiting(id) {
  const res = await axios.delete(`${baseURL}/waiting/${id}`);

  return res;
}

export async function finishSchedule(id) {
  const res = await axios.put(`${baseURL}/schedule/finish/${id}`);

  return res;
}
