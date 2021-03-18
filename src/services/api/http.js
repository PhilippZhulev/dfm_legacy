/*
 * desc: DFM HTTP Transport обеспечиваевает реализацию отправки запросов на сервер
 * type: class
 * ver: 2.0.0
 * Copyright(c) Heavy mouse team.
 */
import axios from 'axios';
import qs from 'qs';
import { bearerHeaders, SessionToken, AuthType } from 'helpers';
import { createBrowserHistory } from 'history';
import store from '../../redux/store';
import { fetchUserSuccess } from '../../redux/user/actions';
import { settings } from '../../serverSettings';

/**
 * ANCHOR: Создаем экземпляр компонента History
 * @type {History<LocationState>}
 */
const history = createBrowserHistory();

/**
 * ANCHOR: Создаем экземпляр компонента Axios с общими конфигурациями
 * @type {AxiosInstance}
 */
const axiosProvider = axios.create({
  baseURL: settings.url,
  ithCredentials: true,
  credentials: 'include',
  cache: 'no-cache',
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});

/**
 * ANCHOR: Перехватываем запрос перед отправкой
 */
axiosProvider.interceptors.request.use((config) => {
  // Если не запрос авторизации, добавляем в заголовок токен авторизации
  if (!config.url.includes('login')) {
    config.headers = { ...config.headers, ...bearerHeaders() };
  }

  return config;
});

/**
 * ANCHOR: Перехватываем ответ запроса перед обработкой
 */
axiosProvider.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    // Ответ 401 Unauthorized - перенаправляем на страницу авторизации
    if (error.response?.status === 401) {
      error.message =
        'Срок действия сессии истек. Перезагрузите страницу, чтобы авторизоваться заново.';

      SessionToken.removeItem();
      window.toLogin = false;

      store.dispatch(fetchUserSuccess({ state: false }));

      if (!AuthType.isSudir()) {
        history.push('/dfm_it/login');
      }
    }

    // Ошибка с сервера, перехват и вывод корректного варнинга
    if (Array.isArray(error.response?.data?.errors)) {
      error.message = error.response.data.errors
        .find((el, index) => index === 0) || '';
    }

    // Ошибка ответа
    return Promise.reject(error);
  }
);

/**
 * ANCHOR: Отправка запроса на сервер
 * @param {string} method
 * @param {string} url
 * @param {object|null} data
 * @param {object|null} headers
 * @returns {Promise<*>}
 * @constructor
 */
export const HttpTransport = async (
  method,
  url,
  data = null,
  headers = null,
  query = null
  // eslint-disable-next-line max-params
) => {
  // Общие парметры запроса
  const params = {
    method,
    url,
  };

  // Добавляем данные запроса
  if (data) {
    params.data = data;
  }

  // Добавляем заголовки запроса
  if (headers) {
    params.headers = headers;
  }

  // Добавляем query
  if (query) {
    params.params = query;
  }

  // Отправляем запрос
  const res = await axiosProvider(params);

  const response = {
    code: res.status,
    msg: res.statusText,
    data: res.data,
  };

  if (res.headers['x-total-count'] !== undefined) {
    return {
      ...response,
      totalCount: +res.headers['x-total-count'],
      totalPage: +res.headers['x-total-page'],
    };
  }
  return response;
};
