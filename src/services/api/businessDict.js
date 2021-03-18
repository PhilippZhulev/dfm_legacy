import { cacheHttpGet } from './cacheHttpGet';
import { HttpTransport } from './http';

const path = 'business';

export default class BusinessDict {
  static get category() {
    return {
      get(id) {
        const url = `${path}/category/${id}`;
        return HttpTransport('GET', url);
      },
      getAll(params) {
        const url = `${path}/category`;
        return HttpTransport('GET', url, null, null, params?.query || null);
      },
      getAllCache() {
        const url = `${path}/category`;
        return cacheHttpGet(BusinessDict.category.getAll, url);
      },
      save(params) {
        const url = `${path}/category`;
        return HttpTransport('POST', url, params.data);
      },
      saveAll(params) {
        const url = `${path}/category/list`;
        return HttpTransport('POST', url, params.data);
      },
      edit(params) {
        const url = `${path}/category`;
        return HttpTransport('PUT', url, params.data);
      },
      editAll(params) {
        const url = `${path}/category/list`;
        return HttpTransport('PUT', url, params.data);
      },
      delete(id) {
        const url = `${path}/category/${id}`;
        return HttpTransport('DELETE', url);
      },
      deleteAll(params) {
        const url = `${path}/category/list`;
        return HttpTransport('DELETE', url, params.data);
      },
    };
  }

  static get subCategory() {
    return {
      get(id) {
        const url = `${path}/subcategory/${id}`;
        return HttpTransport('GET', url);
      },
      getAll(params) {
        const url = `${path}/subcategory`;
        return HttpTransport('GET', url, null, null, params?.query || null);
      },
      getAllCache() {
        const url = `${path}/subcategory`;
        return cacheHttpGet(BusinessDict.subCategory.getAll, url);
      },
      save(params) {
        const url = `${path}/subcategory`;
        return HttpTransport('POST', url, params.data);
      },
      saveAll(params) {
        const url = `${path}/subcategory/list`;
        return HttpTransport('POST', url, params.data);
      },
      edit(params) {
        const url = `${path}/subcategory`;
        return HttpTransport('PUT', url, params.data);
      },
      editAll(params) {
        const url = `${path}/subcategory/list`;
        return HttpTransport('PUT', url, params.data);
      },
      delete(id) {
        const url = `${path}/subcategory/${id}`;
        return HttpTransport('DELETE', url);
      },
      deleteAll(params) {
        const url = `${path}/subcategory/list`;
        return HttpTransport('DELETE', url, params.data);
      },
    };
  }

  static get metric() {
    return {
      get(id) {
        const url = `${path}/metric/${id}`;
        return HttpTransport('GET', url);
      },
      getAll(params) {
        const url = `${path}/metric`;
        return HttpTransport('GET', url, null, null, params?.query || null);
      },
      save(params) {
        const data = {
          ...params.data,
          cats: params.data.cats.map((cat) => cat.value),
        };

        const url = `${path}/metric`;
        return HttpTransport('POST', url, data);
      },
      saveAll(params) {
        const url = `${path}/metric/list`;
        return HttpTransport('POST', url, params.data);
      },
      edit(params) {
        const data = {
          ...params.data,
          cats: params.data.cats.map((cat) => cat.value),
        };

        const url = `${path}/metric`;
        return HttpTransport('PUT', url, data);
      },
      editAll(params) {
        const url = `${path}/metric/list`;
        return HttpTransport('PUT', url, params.data);
      },
      delete(id) {
        const url = `${path}/metric/${id}`;
        return HttpTransport('DELETE', url);
      },
      deleteAll(params) {
        const url = `${path}/metric/list`;
        return HttpTransport('DELETE', url, params.data);
      },
    };
  }

  static get period() {
    return {
      get(id) {
        const url = `${path}/period/${id}`;
        return HttpTransport('GET', url);
      },
      getAll(params) {
        const url = `${path}/period`;
        return HttpTransport('GET', url, null, null, params?.query || null);
      },
      getAllCache() {
        const url = `${path}/period`;
        return cacheHttpGet(BusinessDict.period.getAll, url);
      },
      save(params) {
        const url = `${path}/period`;
        return HttpTransport('POST', url, params.data);
      },
      saveAll(params) {
        const url = `${path}/period/list`;
        return HttpTransport('POST', url, params.data);
      },
      delete(id) {
        const url = `${path}/period/${id}`;
        return HttpTransport('DELETE', url);
      },
      deleteAll(params) {
        const url = `${path}/period/list`;
        return HttpTransport('DELETE', url, params.data);
      },
    };
  }

  static get parameters() {
    return {
      get(id) {
        const url = `${path}/parameters/${id}`;
        return HttpTransport('GET', url);
      },
      getAll(params) {
        const url = `${path}/parameters`;
        return HttpTransport('GET', url, null, null, params?.query || null);
      },
      save(params) {
        const url = `${path}/parameters`;
        return HttpTransport('POST', url, params.data);
      },
      saveAll(params) {
        const url = `${path}/parameters/list`;
        return HttpTransport('POST', url, params.data);
      },
      edit(params) {
        const url = `${path}/parameters`;
        return HttpTransport('PUT', url, params.data);
      },
      editAll(params) {
        const url = `${path}/parameters/list`;
        return HttpTransport('PUT', url, params.data);
      },
      delete(id) {
        const url = `${path}/parameters/${id}`;
        return HttpTransport('DELETE', url);
      },
      deleteAll(params) {
        const url = `${path}/parameters/list`;
        return HttpTransport('DELETE', url, params.data);
      },
    };
  }
}
