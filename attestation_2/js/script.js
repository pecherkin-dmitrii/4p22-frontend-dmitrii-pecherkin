"use strict"

const REQUIRED_FIELD_ERROR_TEXT = "Поле обязательно для заполнения";
const INCORRECT_EMAIL_ERROR_TEXT = "Email введён некорректно";
const PASSWORD_LENGTH_ERROR_TEXT = "Пароль должен содержать не менее 8 символов";
const PASSWORD_NOT_CONFIRMED_ERROR_TEXT = "Пароли не совпадают";
const ERROR_COLOR = "#EE2424";
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ERROR_ELEMENT_CLASS = "validation-error";

const submitButton = document.querySelector(".login-form__submit-button");
const form = document.querySelector(".login-form");
const emailInput = document.getElementById("email");
const emailLabel = document.querySelector(".login-form__label-text-field[for=email]");
const passwordInput = document.getElementById("password");
const passwordLabel = document.querySelector(".login-form__label-text-field[for=password]");
const passwordConfirmInput = document.getElementById("password-repeat");
const passwordConfirmLabel = document.querySelector(".login-form__label-text-field[for=password-repeat]");

function displayValidationError(inputElement, inputLabel, errorText) {
    const errorElement = document.createElement("span");
    errorElement.className = ERROR_ELEMENT_CLASS;
    errorElement.style.color = ERROR_COLOR;
    errorElement.textContent = errorText;

    removeErrorElements(inputLabel);

    inputLabel.append(errorElement);
    inputElement.style.borderColor = ERROR_COLOR;
}

function tearDownErrorStyle(isValid, inputElement, inputLabel) {
    if (isValid) {
        inputElement.removeAttribute("style");
        removeErrorElements(inputLabel);
    }
}

function removeErrorElements(inputLabel) {
    const inputLabelClass = inputLabel.className;
    const inputLabelForAttribute = inputLabel.getAttribute("for");
    document.querySelectorAll(`.${inputLabelClass}[for=${inputLabelForAttribute}] .${ERROR_ELEMENT_CLASS}`).forEach(el => el.remove());
}

function validateEmail(emailInput, emailLabel) {
    const emailString = emailInput.value.trim();
    let isValid = true;

    if (emailString.length === 0) {
        displayValidationError(emailInput, emailLabel, REQUIRED_FIELD_ERROR_TEXT);
        isValid = false;
    } else if (!EMAIL_REGEX.test(emailString)) {
        displayValidationError(emailInput, emailLabel, INCORRECT_EMAIL_ERROR_TEXT);
        isValid = false;
    }

    tearDownErrorStyle(isValid, emailInput, emailLabel);
    return isValid;
}

function validatePassword(passwordInput, passwordLabel, passwordConfirmInput, passwordConfirmLabel) {
    const passwordString = passwordInput.value.trim();
    const passwordConfirmString = passwordConfirmInput.value.trim();
    let isValid = true;

    if (passwordString.length === 0) {
        displayValidationError(passwordInput, passwordLabel, REQUIRED_FIELD_ERROR_TEXT);
        isValid = false;
    } else if (passwordString.length < 8) {
        displayValidationError(passwordInput, passwordLabel, PASSWORD_LENGTH_ERROR_TEXT);
        isValid = false;
    }

    tearDownErrorStyle(isValid, passwordInput, passwordLabel);

    if (passwordConfirmString.length === 0 || passwordString !== passwordConfirmString) {
        displayValidationError(passwordConfirmInput, passwordConfirmLabel, PASSWORD_NOT_CONFIRMED_ERROR_TEXT);
        isValid = false;
    }

    tearDownErrorStyle(isValid, passwordConfirmInput, passwordConfirmLabel);
    return isValid;
}


submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const isEmailValid = validateEmail(emailInput, emailLabel);
    const isPasswordValid = validatePassword(passwordInput, passwordLabel, passwordConfirmInput, passwordConfirmLabel);

    if (isEmailValid && isPasswordValid) {
        const submitObject = {};
        const formData = new FormData(form);
        for(let [name, value] of formData) {
            submitObject[name] = value;
        }
        console.log(submitObject);
    }
})