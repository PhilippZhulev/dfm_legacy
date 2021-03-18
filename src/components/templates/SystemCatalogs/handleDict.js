/* eslint-disable sonarjs/no-identical-functions */
export default class handleDict {
  static get accessGroup() {
    return {
      header: ['Название группы', 'Название категории', 'В архиве'],
      newRow: {
        accessCategory: {},
        name: '',
        isArchive: false,
      },
      getId: (row) => String(row.id),
      getSelects: (secondaryData) => {
        const selects = {};
        selects.ACCESS_CATEGORY = secondaryData.ACCESS_CATEGORY.map((el) => ({
          value: String(el.code),
          label: String(el.description),
          option: el,
        }));
        return selects;
      },
    };
  }

  static get accessGroupUser() {
    return {
      header: [
        'ФИО',
        'Табельный номер',
        'Название группы',
        'Начиная с',
        'Заканчивая по',
      ],
      newRow: {
        accessGroup: {
          accessCategory: {},
          name: '',
        },
        dateEnd: '9999-12-31',
        dateStart: '1900-01-01',
        user: {
          fullName: '',
          tabNum: '',
        },
      },
      getId: (row) => String(row.user.id) + String(row.accessGroup.id),
      getSelects: (secondaryData) => {
        const selects = {};

        // Фильтруем группы с типом 'функционал'

        selects.DICT_ACCESS_GROUP = secondaryData.DICT_ACCESS_GROUP.filter(
          (el) => el.accessCategory.code === 'DATA'
        ).map((el) => ({
          value: String(el.id),
          label: String(el.name),
          option: el,
        }));
        selects.USER = secondaryData.USER.map((el) => ({
          value: String(el.id),
          label: String(el.fullName),
          option: el,
        }));
        return selects;
      },
    };
  }

  static get accessGroupsAuthorityObject() {
    return {
      header: ['Название объекта полномочий', 'Действия', 'Название группы'],
      newRow: {
        authorityObject: {
          accessCategory: {},
          description: '',
          name: '',
          type: {},
        },
        permissions: [],
        accessGroup: {
          accessCategory: {},
          name: '',
        },
      },
      getId: (row) => String(row.id),
      getSelects: (secondaryData) => {
        const selects = {};
        selects.AUTHORITY_OBJECT = secondaryData.AUTHORITY_OBJECT.map((el) => ({
          value: String(el.id),
          label: String(el.name),
          option: el,
        }));
        selects.USER_ACTION = secondaryData.USER_ACTION.map((el) => ({
          value: String(el.code),
          label: String(el.description),
          option: el,
        }));
        selects.DICT_ACCESS_GROUP = secondaryData.DICT_ACCESS_GROUP.map(
          (el) => ({
            value: String(el.id),
            label: String(el.name),
            option: el,
          })
        );
        return selects;
      },
    };
  }

  static get unknown() {
    return {
      header: [],
      newRow: {},
      getId: () => String(Math.random()).substr(2, 6),
      getSelects: () => ({}),
    };
  }
}
