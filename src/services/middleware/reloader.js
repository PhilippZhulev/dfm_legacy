import { positionsNode } from 'helpers';
import { virualStore, setVirualStore } from '../../virtualStore';

export function reloader(action, res) {
  let modelDump;

  const { reload, resource } = action.payload.params;

  /** Метод перезагружает модель после создания ресурса */
  if (['createResource', 'copyResource'].includes(reload)) {
    const newResource = res.data.dump.resources.find(
      ({ value }) => resource === value
    );
    if (newResource) {
      if (reload === 'createResource') {
        newResource.position = positionsNode(
          res.data.dump.resources,
          newResource
        );
      }
      virualStore.model.resources.push(newResource);
    }

    modelDump = virualStore.model;

    /** Метод перезагружает модель после удаления ресурса */
  } else if (reload === 'removeResource') {
    virualStore.model.resources = res.data.dump.resources;

    modelDump = virualStore.model;

    /** Метод перезагружает модель после группировки ресурса */
  } else if (action.payload.reload === 'groupResource') {
    const findResource = res.data.dump.resources.find(
      ({ value }) => resource === value
    );
    const index = virualStore.model.resources.findIndex(
      ({ value }) => value === findResource.value
    );

    if (index !== -1) {
      virualStore.model.resources[index] = findResource;
    } else {
      virualStore.model.resources.push(findResource);
    }

    modelDump = virualStore.model;

    /** Метод перезагружает модель после линкования ресурса */
  } else if (reload === 'linkResource') {
    const findResource = res.data.dump.resources.find(
      ({ value }) => resource === value
    );
    const index = virualStore.model.resources.findIndex(
      ({ value }) => value === findResource.value
    );

    if (index !== -1) {
      virualStore.model.resources[index] = findResource;
    }

    modelDump = virualStore.model;

    /** Метод перезагружает модель после изменения состава метрик ресурса */
  } else if (reload === 'metricResource') {
    const findResource = res.data.dump.resources.find(
      ({ value }) => resource === value
    );
    const index = virualStore.model.resources.findIndex(
      ({ value }) => value === findResource.value
    );

    if (index !== -1) {
      const timeCycles = virualStore.model.resources[index].budcycles;
      const { period } = action.payload.params.reloadData;
      virualStore.model.resources[index] = {
        ...virualStore.model.resources[index],
        metrics: findResource.metrics,
        budcycles: timeCycles.map((budcycle) => {
          if (budcycle.id === period) {
            return budcycle;
          }
          const periodData = findResource.budcycles.find(
            ({ id }) => id === budcycle.id
          );
          return {
            ...budcycle,
            available: periodData.available,
            proportions: periodData.proportions,
            tariffs: periodData.tariffs,
            depreciated: periodData.depreciated,
            purchased: periodData.purchased,
            required: periodData.required,
            variable: periodData.variable,
          };
        }),
      };
    }

    modelDump = virualStore.model;
  } else {
    modelDump = res.data.dump;
  }

  setVirualStore('model', modelDump);
}
