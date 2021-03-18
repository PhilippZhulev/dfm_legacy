import { HttpTransport } from './http';

const path = 'models';

export default class nodeParameters {
  static getAll(params) {
    const url = `${path}/${params.modelId}/nodeParameters`;
    return HttpTransport('GET', url);
  }

  static updateInAllNodes(params) {
    const url = `${path}/${params.modelId}/nodeParameters/${params.parameter}`;
    return HttpTransport('PUT', url, params.data);
  }

  static deleteParameter(params) {
    const url = `${path}/${params.modelId}/nodeParameters/${params.parameter}`;
    return HttpTransport('DELETE', url);
  }

  static createParameterInNode(params) {
    const url = `${path}/${params.modelId}/resources/${params.nodeId}/nodeParameters`;
    return HttpTransport('POST', url, params.data);
  }

  static updateVolume(params) {
    const url = `${path}/${params.modelId}/resources/${params.nodeId}/nodeParameters`;
    return HttpTransport('PUT', url, params.data);
  }

  static deleteParameterFromNode(params) {
    const url = `${path}/${params.modelId}/resources/${params.nodeId}/nodeParameters/${params.parameter}`;
    return HttpTransport('DELETE', url);
  }
}
