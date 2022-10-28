"use strict"

const firstNumberInput = document.getElementById("first-number");
const secondNumberInput = document.getElementById("second-number");
const operationInput = document.getElementById("operation");
const calculatorButton = document.querySelector(".calcutator__button");

const firstNumberRequiredErrorText = "Первое число не указано";
const secondNumberRequiredErrorText = "Второе число не указано";
const wrongNumbersErrorText = "Некорректный ввод чисел";
const operationRequiredErrorText = "Не введён знак";
const wrongOperationErrorText = "Программа не поддерживает такую операцию";
const incorrectOperationErrorText = "Операция некорректна";

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
        alert(numberOrder === 1 ? firstNumberRequiredErrorText : secondNumberRequiredErrorText);
        return false;
    } else if (isNaN(rawValueTrimmed)) {
        alert(wrongNumbersErrorText);
        return false;
    } else {
        return true;
    }
}

function isValidOperation(rawOperation) {
    const rawOperationTrimmed = rawOperation.trim();

    if (rawOperationTrimmed === "") {
        alert(operationRequiredErrorText);
        return false;
    } else if (rawOperationTrimmed !== "+" && rawOperationTrimmed !== "-" &&
        rawOperationTrimmed !== "*" && rawOperationTrimmed !== "/") {
        alert(wrongOperationErrorText);
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
        alert(incorrectOperationErrorText);
    }
}

calculatorButton.addEventListener("click", calculate);