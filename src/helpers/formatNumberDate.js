export const formatNumberDate = (value) => {
  let strValue = String(value);

  return strValue.length === 1 ? `0${strValue}` : strValue;
};
