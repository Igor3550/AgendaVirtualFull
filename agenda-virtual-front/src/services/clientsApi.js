import axios from "axios";

const baseURL = 'http://localhost/api';

function createHeaders(token) {
  const body = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
  return body;
}

export async function getScheduleList(token) {
  const header = createHeaders(token);
  const result = await axios.get(`${baseURL}/schedule/client`, header);
  return result.data;
}

export async function createSchedule(token, body) {
  const header = createHeaders(token);
  const res = await axios.post(`${baseURL}/schedule/client`, body, header);

  return res;
}

export async function updateSchedule(token, body, id) {
  const header = createHeaders(token);
  const res = await axios.put(`${baseURL}/schedule/client/${id}`, body, header);

  return res;
}

export async function deleteSchedule(token, id) {
  const header = createHeaders(token);
  const res = await axios.delete(`${baseURL}/schedule/client/${id}`, header);

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
