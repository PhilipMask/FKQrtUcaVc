class Validate {
  constructor(data, validateRules = {}) {
    this.data = this.isObject(data) ? data : {};
    this.rules = this.isEmptyObject(validateRules)
      ? this.defaultRules
      : validateRules;
    this.errors = {};
  }
  defaultRules = {
    email: {
      required: true,
      email: true,
    },
    name: {
      required: true,
      minLength: 2,
      maxLength: 40,
    },
    last_name: {
      required: true,
      minLength: 2,
      maxLength: 40,
    },
    phone: {
      required: true,
      phone: true,
    },
  };
  defaultMessages = {
    ru: {
      required: "ⓘ Поле обязательно для заполнения.",
      email: "ⓘ Пожалуйста, введите действительный адрес электронной почты.",
      maxLength: "ⓘ Поле должно содержать не более 40 символов",
      minLength: "ⓘ Поле должно содержать минимум 2 символов",
      checkbox: "ⓘ Пожалуйста, установите этот флажок, если хотите продолжить",
      phone: "ⓘ Пожалуйста, введите действительный номер телефона",
    },
    en: {
      required: "ⓘ The field is required",
      email: "ⓘ Please, type a valid email",
      maxLength: "ⓘ The field must contain a maximum of 40 characters",
      minLength: "ⓘ The field must contain a minimum of 2 characters",
      password: "ⓘ Name is not valid",
      remote: "ⓘ Email already exists",
      checkbox: "ⓘ Please check this box if you want to proceed",
      phone: "ⓘ Please enter valid phone number",
    },
  };

  isObject(obj) {
    return (
      typeof obj === "object" && obj !== null && obj.constructor === Object
    );
  }

  isEmptyObject(obj) {
    return this.isObject(obj) && Object.keys(obj).length === 0;
  }

  isEmpty(value) {
    if (value.trim) {
      value = value.trim();
    }
    return !value;
  }

  validateRequired(value) {
    return !this.isEmpty(value);
  }

  validateMinLength(value, min) {
    return value.length >= min;
  }

  validateMaxLength(value, max) {
    return value.length <= max;
  }

  validateEmail(value) {
    let re =
      /^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
    return re.test(value);
  }

  validateCheckbox(value) {
    return value;
  }

  validatePhone(value) {
    let countryCode = this.data?.phoneCountry;
    return window.intlTelInputUtils && countryCode
      ? intlTelInputUtils.isValidNumber(value, countryCode)
      : this.validatePhoneWithoutIntl(value);
  }

  validatePhoneWithoutIntl(value) {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(value);
  }

  validateFunc(str) {
    return "validate" + str.charAt(0).toUpperCase() + str.slice(1);
  }

  run() {
    if (this.isEmptyObject(this.data)) {
      console.log("Validate object data is empty.");
      return;
    }
    let lang = "en";

    for (const [key, rules] of Object.entries(this.rules)) {
      if (key in this.data) {
        for (const [rule, value] of Object.entries(rules)) {
          if (!this[this.validateFunc(rule)](this.data[key], value)) {
            this.errors[key] = String(this.defaultMessages[lang][rule]).replace(
              ":value",
              value
            );
            break;
          }
        }
      } else {
        this.errors[key] = this.defaultMessages[lang].required;
      }
    }

    return {
      isValid: this.isEmptyObject(this.errors),
      errors: this.errors,
    };
    //console.log(this.errors);
  }
}
