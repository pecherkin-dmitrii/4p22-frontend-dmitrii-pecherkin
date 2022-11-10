"use strict"

const FIRST_NUMBER_REQUIRED_ERROR_TEXT = "Первое число не указано";
const SECOND_NUMBER_REQUIRED_ERROR_TEXT = "Второе число не указано";
const WRONG_NUMBERS_ERROR_TEXT = "Некорректный ввод чисел";
const OPERATION_REQUIRED_ERROR_TEXT = "Не введён знак";
const WRONG_OPERATION_ERROR_TEXT = "Программа не поддерживает такую операцию";
const INCORRECT_OPERATION_ERROR_TEXT = "Операция некорректна";

const firstNumberInput = document.getElementById("first-number");
const secondNumberInput = document.getElementById("second-number");
const operationInput = document.getElementById("operation");
const calculatorButton = document.querySelector(".calcutator__button");

function calculate(event) {
    event.preventDefault();

    const firstNumberRawValue = firstNumberInput.value;
    const secondNumberRawValue = secondNumberInput.value;
    const operationValue = operationInput.value;

    if (!isValidNumber(firstNumberRawValue, 1)) return;
    if (!isValidNumber(secondNumberRawValue, 2)) return;
    if (!isValidOperation(operationValue)) return;


    const firstNumberValue = +firstNumberRawValue;
    const secondNumberValue = +secondNumberRawValue;

    switch (operationValue) {
        case "+":
            displayResult(firstNumberValue + secondNumberValue);
            break;
        case "-":
            displayResult(firstNumberValue - secondNumberValue);
            break;
        case "*":
            displayResult(firstNumberValue * secondNumberValue);
            break;
        case "/":
            displayResult(firstNumberValue / secondNumberValue);
            break;
    }
}

function isValidNumber(rawNumberValue, numberOrder) {
    const rawValueTrimmed = rawNumberValue.trim();

    if (rawValueTrimmed === "") {
        alert(numberOrder === 1 ? FIRST_NUMBER_REQUIRED_ERROR_TEXT : SECOND_NUMBER_REQUIRED_ERROR_TEXT);
        return false;
    } else if (isNaN(rawValueTrimmed)) {
        alert(WRONG_NUMBERS_ERROR_TEXT);
        return false;
    } else {
        return true;
    }
}

function isValidOperation(rawOperation) {
    const rawOperationTrimmed = rawOperation.trim();

    if (rawOperationTrimmed === "") {
        alert(OPERATION_REQUIRED_ERROR_TEXT);
        return false;
    } else if (rawOperationTrimmed !== "+" && rawOperationTrimmed !== "-" &&
        rawOperationTrimmed !== "*" && rawOperationTrimmed !== "/") {
        alert(WRONG_OPERATION_ERROR_TEXT);
        return false;
    } else {
        return true;
    }
}

function displayResult(result) {
    if (result !== Infinity && result !== -Infinity) {
        console.log(result);
        alert("Результат: " + result);
    } else {
        alert(INCORRECT_OPERATION_ERROR_TEXT);
    }
}

calculatorButton.addEventListener("click", calculate);