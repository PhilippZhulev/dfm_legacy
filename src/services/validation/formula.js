export const isFormula = (value) => {
  const expr = new RegExp(/[a-zA-Z]/);

  if (expr.test(value)) return true;

  return false;
};
