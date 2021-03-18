export default function (userData) {
  const checked = new Array(2);
  for (let i = 0; i < userData.permissions.length; i++) {
    const item = userData.permissions[i];
    if (item.target === 'model' && item.code === 'all') {
      checked[1] = item.create;
      break;
    }
  }
  for (let i = 0; i < userData.roles.length; i++) {
    const item = userData.roles[i];
    if (item.value === 'DFM_BUSINESS_ADMIN') {
      checked[0] = true;
      break;
    }
  }

  return checked[0] && checked[1];
}
