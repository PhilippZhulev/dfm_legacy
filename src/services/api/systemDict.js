import { HttpTransport } from './http';

const path = 'systems';
/**
 * Запросы Системные справочники
 * @class
 * @public
 */
export default class SystemDict {
  /**
   * Получить несколько системных справочников по списку
   * @param {object} params
   * @public
   */
  static get accessGroup() {
    return {
      async getAll(params) {
        const url = `${path}/accessGroup`;
        return HttpTransport('GET', url, null, null, params.query || null);
      },
      async get(id) {
        const url = `${path}/accessGroup/${id}`;
        return HttpTransport('GET', url);
      },
      async saveAll(params) {
        const url = `${path}/accessGroup`;
        return HttpTransport('POST', url, params.data);
      },
      async save(params) {
        const url = `${path}/accessGroup`;
        return HttpTransport('PUT', url, params.data);
      },
      async deleteAll(params) {
        const url = `${path}/accessGroup`;
        return HttpTransport('DELETE', url, params.data);
      },
      async delete(id) {
        const url = `${path}/accessGroup/${id}`;
        return HttpTransport('DELETE', url);
      },
    };
  }

  static get accessGroupUser() {
    return {
      async getAll(params) {
        const url = `${path}/accessGroupUser`;
        return HttpTransport('GET', url, null, null, params.query || null);
      },
      async get(userId, accessGroupId) {
        const url = `${path}/accessGroupUser/${userId}/${accessGroupId}`;
        return HttpTransport('GET', url);
      },
      async saveAll(params) {
        const url = `${path}/accessGroupUser`;
        return HttpTransport('POST', url, params.data);
      },
      async save(params) {
        const url = `${path}/accessGroupUser`;
        return HttpTransport('PUT', url, params.data);
      },
      async deleteAll(params) {
        const url = `${path}/accessGroupUser`;
        return HttpTransport('DELETE', url, params.data);
      },
      async delete(userId, accessGroupId) {
        const url = `${path}/accessGroupUser/${userId}/${accessGroupId}`;
        return HttpTransport('DELETE', url);
      },
    };
  }

  static get accessGroupsAuthorityObject() {
    return {
      async getAll(params) {
        const url = `${path}/accessGroupsAuthorityObject`;
        return HttpTransport('GET', url, null, null, params.query || null);
      },
      async get(id) {
        const url = `${path}/accessGroupsAuthorityObject/${id}`;
        return HttpTransport('GET', url);
      },
      async saveAll(params) {
        const url = `${path}/accessGroupsAuthorityObject`;
        return HttpTransport('POST', url, params.data);
      },
      async save(params) {
        const url = `${path}/accessGroupsAuthorityObject`;
        return HttpTransport('PUT', url, params.data);
      },
      async deleteAll(params) {
        const url = `${path}/accessGroupsAuthorityObject`;
        return HttpTransport('DELETE', url, params.data);
      },
      async delete(id) {
        const url = `${path}/accessGroupsAuthorityObject/${id}`;
        return HttpTransport('DELETE', url);
      },
    };
  }

  static get authorityObject() {
    return {
      async getAll(params) {
        const url = `${path}/authorityObject`;
        return HttpTransport('GET', url, null, null, params.query || null);
      },
      async get(id) {
        const url = `${path}/authorityObject/${id}`;
        return HttpTransport('GET', url);
      },
      async saveAll(params) {
        const url = `${path}/authorityObject`;
        return HttpTransport('POST', url, params.data);
      },
      async save(params) {
        const url = `${path}/authorityObject`;
        return HttpTransport('PUT', url, params.data);
      },
      async deleteAll(params) {
        const url = `${path}/authorityObject`;
        return HttpTransport('DELETE', url, params.data);
      },
      async delete(id) {
        const url = `${path}/authorityObject/${id}`;
        return HttpTransport('DELETE', url);
      },
    };
  }

  static get role() {
    return {
      async getAll(params) {
        const url = `${path}/role`;
        return HttpTransport('GET', url, null, null, params.query || null);
      },
      async get(id) {
        const url = `${path}/role/${id}`;
        return HttpTransport('GET', url);
      },
      async saveAll(params) {
        const url = `${path}/role`;
        return HttpTransport('POST', url, params.data);
      },
      async save(params) {
        const url = `${path}/role`;
        return HttpTransport('PUT', url, params.data);
      },
      async deleteAll(params) {
        const url = `${path}/role`;
        return HttpTransport('DELETE', url, params.data);
      },
      async delete(id) {
        const url = `${path}/role/${id}`;
        return HttpTransport('DELETE', url);
      },
    };
  }

  static get userAction() {
    return {
      async getAll(params) {
        const url = `${path}/userAction`;
        return HttpTransport('GET', url, null, null, params.query || null);
      },
    };
  }

  static get accessCategory() {
    return {
      async getAll(params) {
        const url = `${path}/accessCategory`;
        return HttpTransport('GET', url, null, null, params.query || null);
      },
    };
  }

  static get user() {
    return {
      async getAll(params) {
        const url = `${path}/user`;
        return HttpTransport('GET', url, null, null, params.query || null);
      },
    };
  }

  static get authorityObjectType() {
    return {
      async getAll(params) {
        const url = `${path}/authorityObjectType`;
        return HttpTransport('GET', url, null, null, params.query || null);
      },
    };
  }
}
