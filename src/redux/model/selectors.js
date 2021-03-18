export const getCurrentResource = (state) => state.handleResourcesSuccess.data;
export const getUserPermissions = (state) =>
  state.handleFetchUserSuccess.permissions;
