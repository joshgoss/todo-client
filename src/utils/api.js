import {
  addNotification,
  notificationType,
} from "../features/notifications/notificationsSlice";
import { store } from "../store";

export const JSON_CONTENT_TYPE = 'application/json;charset=utf-8';
export const FORM_CONTENT_TYPE = 'application/x-www-form-urlencoded;charset=utf-8';


const convertData = (contentType, data) => {
  if (!data) {
    return data;
  }

  let res;
  if (contentType === JSON_CONTENT_TYPE) {
    res = JSON.stringify(contentType);
  } else if (contentType === FORM_CONTENT_TYPE) {
    return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
  } else {
    throw new Error(`Unsupported content type: ${contentType}`)
  }

  return res;
}

export const apiFetch = async ({
  endpoint = "",
  method = "",
  isForm = false,
  data,
  params = undefined,
  headers = {
    "Content-Type": JSON_CONTENT_TYPE 
  },
}) => {
  const ep = endpoint.startsWith("/") ? endpoint.substring(1) : endpoint;
  const url = `${process.env.REACT_APP_API_URL}${ep}`;

  const body = convertData(headers['Content-Type'], data);

  const response = await fetch(url, {
    method,
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      ...headers,
    },
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body,
  })
    .then((r) => {
      if (!r.ok) {
        return Promise.reject(r);
      }

      return Promise.resolve(r);
    })
    .catch((e) => {
      let message = "Something went wrong while performing a request.";
      e.json()
        .then((json) => {
          store.dispatch(
            addNotification({
              message: json.detail,
              type: notificationType.FAILURE,
            })
          );

          return Promise.resolve(json);
        })
        .catch((r) => {
          store.dispatch(
            addNotification({
              message,
              type: notificationType.FAILURE,
            })
          );

          return Promise.reject(e);
        });
    });


  return response.json();
};

export const get = (endpoint = "", params = {}) => {
  return apiFetch({
    endpoint,
    method: "GET",
    params,
  });
};

export const post = (endpoint = "", data = {}, headers={}) => {
  return apiFetch({
    endpoint,
    method: "POST",
    data,
    headers,
  });
};

const api = {
  apiFetch,
  post,
  get,
};

export default api;
