import React from 'react';
import AccessGroup from './accessGroup';
import AccessGroupUser from './accessGroupUser';
import AccessGroupsAuthorityObject from './accessGroupsAuthorityObject';

export default function SystemCatalogsTableRow(props) {
  const { dictType, ...other } = props;
  const row = (type) => {
    switch (type) {
      case 'DICT_ACCESS_GROUP':
        return <AccessGroup {...other} />;
      case 'ACCESS_GROUPS_AUTHORITY_OBJECT':
        return <AccessGroupsAuthorityObject {...other} />;
      case 'ACCESS_GROUP_USER':
        return <AccessGroupUser {...other} />;
      default:
        return null;
    }
  };
  return row(dictType);
}
