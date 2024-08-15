export const validateSignInput = (type: string, value: string) => {
  let isValid = false;
  switch (type) {
    case 'password':
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      isValid = passwordRegex.test(value);
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
      break;
    case 'number':
      const numberRegex = /^010\d{8}$/;
      isValid = numberRegex.test(value);
      break;
    default:
      break;
  }
  return isValid;
};
