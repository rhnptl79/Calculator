const fbService = require("./fbService");
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
    userName: "",
    bmiStatus: "",
    bmiMessage: "",
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

const multiply = (num1, num2) => {
  return num2 / (num1 * num1);
};

const calculate = (firstNumber, secondNumber, operation, userName) => {
  const isParamValid = validateParams(firstNumber, secondNumber, operation);
  if (isParamValid !== false) {
    return isParamValid;
  }

  const firstNumberParsed = parseFloat(firstNumber);
  const secondNumberParsed = parseFloat(secondNumber);

  let bmiRsult;
  switch (operation) {
    case "multiply":
      bmiRsult = multiply(firstNumberParsed, secondNumberParsed);
      break;
    default:
      break;
  }

  var statusBMI = "",
    MsgBMI = "";
  if (bmiRsult < 18.5) {
    statusBMI = "UnderWeight";
    MsgBMI = "You should eat a little bit more";
  }
  if (bmiRsult >= 18.5 && bmiRsult < 25) {
    statusBMI = "Normal";
    MsgBMI = "Keep doing what you are doing";
  }
  if (bmiRsult >= 25 && bmiRsult < 29.9) {
    statusBMI = "OverWeight";
    MsgBMI = "You should cut down your food a little bit";
  }
  if (bmiRsult >= 30) {
    statusBMI = "Obese";
    MsgBMI = "You should really do someting about your apetite ASAP";
  }

  fbService.collection("UserTableBMI").add({
    name: userName,
    height: firstNumber,
    weight: secondNumber,
  });

  return {
    firstNumber: firstNumber,
    secondNumber: secondNumber,
    result: bmiRsult,
    userName: userName,
    bmiStatus: statusBMI,
    bmiMessage: MsgBMI,
    error: false,
  };
};

module.exports = {
  calculate,
};
