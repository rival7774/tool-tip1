import { defineStore } from 'pinia';

export const useValidation = defineStore('validation', () => {
  const validate = (form) => {
    const notValidated = [];
    const elementsForm = form.elements;
    let inputsToCheck;

    inputsToCheck = [...elementsForm].filter((input) => {
      return input.tagName.toLowerCase() === 'input' || input.tagName.toLowerCase() === 'textarea' && input.required;
    });

    inputsToCheck.forEach((input) => {
      const name = input.name;
      const type = input.type;
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const currencyRegex = /^(\$|€|£|руб|\u20BD)$/;

      switch (type) {
        case 'email':
          if (!pattern.test(input.value.trim())) {
            notValidated.push({
              elem: input,
              message: 'Введите коректный email пример "****@****.**"'
            });
          }
          break;

        case 'password':
          if (input.value.length < 6) {
            notValidated.push({
              elem: input,
              message: 'Пароль должен быть не меньше 6 символов'
            });
          }
          break;

        case 'text':
          if (!input.value.length) {
            notValidated.push({
              elem: input,
              message: `Внесите данные в поле ${input.dataset.labelValue}`
            });
          }
          break;

        default:
          break;
      }

      switch (name) {
        case 'currency':
          if (!currencyRegex.test(input.value.trim())) {
            notValidated.push({
              elem: input,
              message: 'В поле валюта допустимы символы ($, €, £, ₽, руб)'
            });
          }
          break;

        default:
          break;
      }
    });

    return notValidated;
  };

  return { validate };
});
