/* eslint-disable sonarjs/no-extra-arguments */
import { handleError, handleWarn, randomInteger } from 'helpers';
import { uid } from 'react-uid';
import { isResourceNotValid } from '../../../services/validation/resources';
import { required } from '../../../services/validation';

const addResource = async (event, close, request) => {
  const id = uid(randomInteger(0, 1000000000));
  request({
    params: {
      id: id,
      model: event.model,
      period: event.period,
      resource: event.resource,
      body: {
        value: id,
        label: event.name,
        category: event.category.value || '',
      },
    },
  });
};

const removeResource = async (event, close, request) => {
  request({
    params: {
      resource: event.resource,
      model: event.model,
    },
  });
};

const copyResource = async (event, close, request, category) => {
  const id = uid(randomInteger(0, 1000000000));
  request({
    params: {
      resource: event.thisResource.value,
      period: event.period,
      model: event.thisModel,
      sourceModel: event.model.value,
      id,
      body: {
        destLabel: event.name,
        srcModelId: event.model.value,
        srcResourceId: event.resource.value,
      },
      isNodeChanging: !category,
    },
  });
};

const linkResource = async (event, close, request) => {
  request({
    params: {
      select: event.select,
      period: event.period,
      resource: event.thisResource.value,
      model: event.thisModel,
      body: {
        resourceId: event.resource.value,
        modelId: event.model.value,
      },
    },
  });
};

const groupResource = async (event, close, request) => {
  const id = uid(randomInteger(0, 1000000000));
  request({
    params: {
      model: event.model,
      resource: event.thisResource.value,
      select: event.select || id,
      period: event.period,
      body: {
        resources: event.resources ? event.resources.map(({ value }) =>
          value) : [event.select],
        label: event.name,
      },
    },
  });
};

const handleAddResource = async (dispatch, request) => {
  try {
    dispatch({
      type: 'addResource',
      state: true,
      title: '?????????????? ?????????? ????????',
      buttonText: '??????????????',
      titleSize: 220,
      text: '',
      done: (e, close) =>
        addResource(e, close, request),
    });
  } catch (e) {
    handleError('@MainHeaderBottom/handleAddResource', e);
  }
};

const handleRemoveResource = async (dispatch, request, name) => {
  try {
    dispatch({
      type: 'removeResource',
      state: true,
      title: `???? ?????????????????????????? ???????????? ?????????????? ???????? ${name}?`,
      buttonText: '??????????????',
      titleSize: 220,
      text: '',
      done: (e, close) =>
        removeResource(e, close, request),
    });
  } catch (e) {
    handleError('@MainHeaderBottom/handleRemoveResource', e);
  }
};

const handleCopyResource = async (dispatch, request, cat = '') => {
  try {
    dispatch({
      type: 'copyResource',
      state: true,
      title: '???????????????????? ???????? ???? ????????????',
      buttonText: '????????????????????',
      titleSize: 220,
      text: '',
      cat,
      done: (e, close) => {
        const msg = isResourceNotValid(e);

        if (msg) {
          handleWarn({ message: msg });
          return;
        }

        copyResource(e, close, request, cat);
      },
    });
  } catch (e) {
    handleError('@MainHeaderBottom/handleCopyResource', e);
  }
};

const handleLinkResource = async (dispatch, request) => {
  try {
    dispatch({
      type: 'linkResource',
      state: true,
      title: '?????????????? ???????????? ???? ???????????????????????? ????????',
      buttonText: '?????????????? ????????????',
      titleSize: 420,
      text: '',
      done: (e, close) =>
        linkResource(e, close, request),
    });
  } catch (e) {
    handleError('@MainHeaderBottom/handleLinkResource', e);
  }
};

const handleGroupResource = async (dispatch, request) => {
  try {
    dispatch({
      type: 'groupResource',
      state: true,
      title: '???????????????????? ????????????????',
      buttonText: '????????????????',
      titleSize: 420,
      text: '',
      done: (e, close) => {
        if (required(e.name || e.select)) {
          handleWarn({ message: '?????????????? ????????????????' });
          return;
        }
        groupResource(e, close, request);
      },
    });
  } catch (e) {
    handleError('@MainHeaderBottom/handleLinkResource', e);
  }
};


export {
  handleAddResource,
  handleRemoveResource,
  handleCopyResource,
  handleLinkResource,
  handleGroupResource,
};
