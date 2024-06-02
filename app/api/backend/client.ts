import axios from "axios";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_API_HOST || "";
const backendApiUrl = (path: string) => `${backendHost}/api/${path}`;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
};

export const getBackend = async <T>(
  path: string,
  params?: Record<string, unknown>
) => {
  const { data } = await axios.get<T>(backendApiUrl(path), {
    params,
    headers,
    withCredentials: true,
  });
  return data;
};

export const postBackend = async <T>(
  path: string,
  body?: Record<string, unknown>
) => {
  const { data } = await axios.post<T>(backendApiUrl(path), body || {}, {
    headers,
    withCredentials: true,
  });
  return data;
};

export const patchBackend = async <T>(
  path: string,
  body?: Record<string, unknown>
) => {
  const { data } = await axios.patch<T>(backendApiUrl(path), body || {}, {
    headers,
    withCredentials: true,
  });
  return data;
};

export const deleteBackend = async <T>(
  path: string,
  body?: Record<string, unknown>
) => {
  const { data } = await axios.delete<T>(backendApiUrl(path), {
    headers,
    withCredentials: true,
    data: body,
  });
  return data;
};
