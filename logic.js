export let result = document.querySelector(".calc__result");
export let theme = document.querySelector(".themes__toggle");
export let secondNumber = null;
export let calculationResult = "";
export let operation = null;
export let currentNumber = "";
export let helper = false;
export let operations = ["/", "+", "-", "*", "c", "Backspace", "Enter"];
export let numbers = [
  ".",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "-",
];
export function add(firstNumber, secondNumber) {
  return parseFloat(firstNumber) + parseFloat(secondNumber);
}
export function subtract(firstNumber, secondNumber) {
  return parseFloat(secondNumber) - parseFloat(firstNumber);
}
export function mul(firstNumber, secondNumber) {
  return parseFloat(firstNumber) * parseFloat(secondNumber);
}
export function divide(firstNumber, secondNumber) {
  let remaining = parseFloat(secondNumber) % parseFloat(firstNumber);
  if (remaining === 0) {
    return parseFloat(secondNumber) / parseFloat(firstNumber);
  } else {
  }
  return parseFloat(secondNumber) / parseFloat(firstNumber).toFixed(3);
}

export function calculator(operationValue) {
  if (
    !Number.isNaN(parseFloat(secondNumber)) &&
    !Number.isNaN(parseFloat(currentNumber))
  ) {
    if (operationValue === "+") {
      secondNumber = add(currentNumber, secondNumber);
      currentNumber = "";
      result.textContent = secondNumber;
      operation = null;
    } else if (operationValue === "-") {
      secondNumber = subtract(currentNumber, secondNumber);
      currentNumber = "";
      result.textContent = secondNumber;
      operation = null;
    } else if (operationValue === "*") {
      secondNumber = mul(currentNumber, secondNumber);
      currentNumber = "";
      result.textContent = secondNumber;
      operation = null;
    } else if (operationValue === "/") {
      secondNumber = divide(currentNumber, secondNumber);
      currentNumber = "";
      result.textContent = secondNumber;
      operation = null;
    }
  }
}

export function isNumber(type) {
  return type === "number";
}

export function isReset(value) {
  return value === "c";
}

export function reset() {
  currentNumber = "";
  result.textContent = "0";
  secondNumber = null;
  operation = null;
}
export function isBackspace(value) {
  return value === "Backspace";
}
export function backspace() {
  let length = currentNumber.length - 1;
  currentNumber = currentNumber.substring(0, length);
  if (length > 0) {
    result.textContent = currentNumber;
  } else {
    result.textContent = "0";
  }
}

export function isEqual(value) {
  return value === "Enter";
}

export function equal(value) {
  // if (isNaN(secondNumber) || secondNumber === null) {
  //   secondNumber = "0";
  // }
  // if (currentNumber == "-") {
  //   currentNumber = "0";
  // }
  calculator(operation);
}
export function isSpecial(type) {
  return type === "special";
}
export function isOperation(value) {
  // let type = button.dataset.type;
  // let value = button.dataset.value;

  // if (type === "operation") {
  //   return true;
  // }
  if (operations.includes(value)) {
    return true;
  }
  return isSubtract(value);
}

export function isMinus(value) {
  if (currentNumber.charAt(0) === "-" && !isSubtract(value)) {
    return true;
  }
  return false;
}
export function updateCurrentNumber(value) {
  currentNumber += value;

  result.textContent = currentNumber;
}

export function resetUiResult(value) {
  result.textContent = "0";
}

export function enter(value) {
  if (value === "Enter") {
  }
}
export function updateStoredNumber(value) {
  operation = value;

  if (Number.isNaN(secondNumber) || secondNumber === null) {
    secondNumber = "0";
    if (operation === "/") {
      secondNumber = currentNumber ** 2;
    }
    if (operation === "-") {
      secondNumber = parseFloat(currentNumber) * 2;
    }
  }
  if (currentNumber == "-") {
    currentNumber = "0";
  }

  calculator(operation);
}

export function numbersHandler(value) {
  if (currentNumber === "0" && value === "0") {
    return;
  } else if (value === "0" && currentNumber.length === 0) {
    return;
  } else if (value === "." && currentNumber.includes(".")) {
    return;
  } else if (currentNumber.length > 17) {
    return;
  } else if (value === "-" && isSubtract(value)) {
    updateStoredNumber(value);
    return;
  } else if (value === "-" && currentNumber.includes("-")) {
    return;
  } else if (value == "-" && currentNumber.length > 0 && !isSubtract(value)) {
    return;
  } else {
    updateCurrentNumber(value);
  }
}
export function isSubtract(value) {
  if (value === "-" && currentNumber.length > 0) {
    return true;
  }
  return false;
}
export function operationHandler(value) {
  // let type = button.dataset.type;
  // let value = button.dataset.value;

  if (isSubtract(value) || isOperation(value)) {
    if ("*-+/".includes(value)) {
      if (currentNumber.length != 0) {
        updateStoredNumber(value);
      }
    } else if (isReset(value)) {
      reset();
    } else if (isBackspace(value)) {
      backspace();
    } else if (isEqual(value)) {
      equal(operation);
    }
    if ("-+*/".includes(value)) {
      operation = value;
    }
  }
}
