export const validateSignInput = (type: string, value: string): boolean => {
  let isValid = false;
  let regex: RegExp;

  switch (type) {
    case 'password':
      regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      isValid = regex.test(value);
      break;
    case 'email':
      regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = regex.test(value);
      break;
    case 'phone':
      regex = /^010\d{8}$/;
      isValid = regex.test(value);
      break;
    default:
      break;
  }
  return isValid;
};
