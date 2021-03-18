/*
 * desc: REDUX ACTIONS
 * Хранилище action handlers
 * ver: 1.0.0
 * Copyright(c) Heavy mouse team.
 */

// Зависимости
import { createAction } from 'redux-actions';

// Основное событие
export const resourcesInit = createAction('RESOURCES_INIT');

export const changeFixedTariff = createAction('CHANGE_FIXED_TARIFF');

export const changeResources = createAction('CHANGE_RESOURCES');
export const resourcesCreate = createAction('RESOURCE_CREATE');
export const resourcesRemove = createAction('RESOURCE_REMOVE');
export const resourceCopy = createAction('RESOURCE_COPY');
export const resourceList = createAction('RESOURCE_LIST');
export const resourceLink = createAction('RESOURCE_LINK');
export const resourceGroup = createAction('RESOURCE_GROUP');
export const resourceGroupCategory = createAction('RESOURCE_GROUP_CATEGORY');

export const resourcesSuccesed = createAction('RESOURCES_SUCCEEDED');
export const resourcesCreateSuccesed = createAction('RESOURCE_CREATE_SUCCEEDED');
export const resourcesRemoveSuccesed = createAction('RESOURCE_REMOVE_SUCCEEDED');
export const resourcesListSuccesed = createAction('RESOURCE_LIST_SUCCEEDED');
export const resourceCopySuccesed = createAction('RESOURCE_COPY_SUCCEEDED');
export const resourceLinkSuccesed = createAction('RESOURCE_LINK_SUCCEEDED');
export const resourceGroupSuccesed = createAction('RESOURCE_GROUP_SUCCEEDED');
export const resourceGroupCategorySuccesed = createAction('RESOURCE_GROUP_CATEGORY_SUCCESED');

export const addMetric = createAction('ADD_METRIC');
export const deleteMetric = createAction('DELETE_METRIC');
export const actionMetricSucceeded = createAction('ACTION_METRIC_SUCCEEDED');

/** Экшены для получения родительского узла */

export const fetchParentInfoNode = createAction('FETCH_PARENT_INFO_NODE');
export const fetchParentInfoSuccesed = createAction('FETCH_PARENT_INFO_SUCCESED');
