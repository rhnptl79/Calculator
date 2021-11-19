const isNumber = (data) => {
  return !isNaN(data);
};

const validateParams = (firstNumber, secondNumber, operation) => {
  const validOperations = ["add", "subtract", "multiply", "divide"];

  const msg = {
    firstNumber: firstNumber,
    firstNumberError: "",
    secondNumber: secondNumber,
    secondNumberError: "",
    operation: operation,
    operationError: "",
    result: "",
    resultError: "",
    error: false,
  };

  if (!firstNumber) {
    msg.error = true;
    msg.firstNumberError = `please provide first number`;
  }

  if (!secondNumber) {
    msg.error = true;
    msg.secondNumberError = `please provide second number`;
  }

  if (!isNumber(firstNumber)) {
    msg.error = true;
    msg.firstNumberError = `The first number is not a valid number - ${firstNumber}`;
  }
  if (!isNumber(secondNumber)) {
    msg.error = true;
    msg.secondNumberError = `The second number is not a valid number - ${secondNumber}`;
  }
  if (!validOperations.includes(operation)) {
    msg.error = true;
    msg.secondNumberError = `The opeartion is invalid - ${operation}`;
  }

  if (msg.error) {
    msg.result = "Invalid input!";
    msg.resultError = "Unable to calculate result because of invalid input";
    return msg;
  }
  return false;
};

const add = (num1, num2) => {
  return num1 + num2;
};

const subtract = (num1, num2) => {
  return num1 - num2;
};

const multiply = (num1, num2) => {
  return num1 * num2;
};

const divide = (num1, num2) => {
  return num1 / num2;
};

const calculate = (firstNumber, secondNumber, operation) => {
  const isParamValid = validateParams(firstNumber, secondNumber, operation);
  if (isParamValid !== false) {
    return isParamValid;
  }

  const firstNumberParsed = parseFloat(firstNumber);
  const secondNumberParsed = parseFloat(secondNumber);

  let result;
  switch (operation) {
    case "add":
      result = add(firstNumberParsed, secondNumberParsed);
      break;
    case "subtract":
      result = subtract(firstNumberParsed, secondNumberParsed);
      break;
    case "multiply":
      result = multiply(firstNumberParsed, secondNumberParsed);
      break;
    case "divide":
      result = divide(firstNumberParsed, secondNumberParsed);
      break;
    default:
      break;
  }
  return {
    firstNumber: firstNumber,
    secondNumber: secondNumber,
    result: result,
    error: false,
  };
};

module.exports = {
  calculate,
};
