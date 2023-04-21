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

export async function getScheduleList(token) {
  const header = createHeaders(token);
  const result = await axios.get(`${baseURL}/schedule`, header);
  return result.data;
}

export async function createSchedule(token, body) {
  const header = createHeaders(token);
  const res = await axios.post(`${baseURL}/schedule`, body, header);

  return res;
}

export async function updateSchedule(token, body, id) {
  const header = createHeaders(token);
  const res = await axios.put(`${baseURL}/schedule/${id}`, body, header);

  return res;
}

export async function deleteSchedule(token, id) {
  const header = createHeaders(token);
  const res = await axios.delete(`${baseURL}/schedule/${id}`, header);

  return res;
}

export async function finishSchedule(token, id) {
  const header = createHeaders(token);
  const res = await axios.put(`${baseURL}/schedule/finish/${id}`, {}, header);

  return res;
}

export async function getDayHours(date) {
  const res = await axios.get(`${baseURL}/date/hours/${date}`);
  return res.data;
}

export async function getServices() {
  const res = await axios.get(`${baseURL}/services`);
  return res.data;
}

export async function getWaiting(token) {
  const header = createHeaders(token);
  const res = await axios.get(`${baseURL}/waiting`, header);
  return res.data;
}

export async function getHistory(name = null, token) {
  const header = createHeaders(token)
  const res = await axios.get(`${baseURL}/history?name=${name}`, header);
  return res.data;
}

export async function createWaiting(token, body) {
  const header = createHeaders(token);
  const res = await axios.post(`${baseURL}/waiting`, body, header);

  return res;
}

export async function deleteWaiting(token, id) {
  const header = createHeaders(token);
  const res = await axios.delete(`${baseURL}/waiting/${id}`, header);

  return res;
}

export async function updateUserInfo(token, body) {
  const header = createHeaders(token);
  const res = await axios.put(`${baseURL}/user`, body, header);

  return res;
}

export async function createService(token, body) {
  const header = createHeaders(token);
  const res = await axios.post(`${baseURL}/services`, body, header);

  return res;
}

export async function updateService(token, body, id) {
  const header = createHeaders(token);
  const res = await axios.put(`${baseURL}/services/${id}`, body, header);

  return res;
}

export async function deleteService(token, id) {
  const header = createHeaders(token);
  const res = await axios.delete(`${baseURL}/services/${id}`, header);

  return res;
}
