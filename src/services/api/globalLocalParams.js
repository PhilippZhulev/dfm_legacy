import { HttpTransport } from './http';

export class LocalParamsApi {
  static _url = '';

  static get url() {
    return this._url;
  }

  static set url(modelId) {
    this._url = `/models/${modelId}/parameters`;
  }

  static Add({ modelId, data }) {
    this.url = modelId;
    return HttpTransport('POST', this.url, data);
  }

  static Edit({ modelId, data }) {
    this.url = modelId;
    return HttpTransport('PUT', this.url, data);
  }

  static Delete({ modelId, data }) {
    this.url = modelId;
    return HttpTransport('DELETE', this.url, data);
  }
}
