"use strict";

const display = document.querySelector("#results");
const buttons = document.querySelector(".calculator-keys");

const calculator = {
  displayValue: "0", // this will take care of the  value being display
  firstOperand: null, // first value entered by the user
  waitingForSecondOperand: false, // check whether waiting for 2nd value
  operator: null, // operator being perform
  results: false, // was results done
};

const performCalculation = {
  "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
  "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
  "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
  "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
};

/*
 Functions
*/
//Resets the calculator to its original values
function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  calculator.results = false;
}

//Updates the Value being display on the results screen
function updateDisplay() {
  display.value = calculator.displayValue;
}

//Display the digit that was clicked
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}

//Handles operators
function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  // if new operator is clicked and still waiting for a second value
  // then change the old operator to the new one clicked
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  //if firstOperand value is empty,
  //then place the value entered by the user to the firstOperand value
  if (firstOperand == null) {
    calculator.firstOperand = inputValue;
  }
  // if operator is true,
  //then perform calculation and update calculator
  else if (operator) {
    const currentValue = firstOperand || 0;
    const result = performCalculation[operator](currentValue, inputValue);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

//Handles decimal input
function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand) {
    calculator.displayValue = "0" + dot;
    calculator.waitingForSecondOperand = false;
  }

  // if the displayValue does not contain a decimal place
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

const init = function () {
  resetCalculator();
  updateDisplay();

  buttons.addEventListener("click", (event) => {
    // The event being clicked set to target
    const { target } = event;

    // resets calculator after result was returned by "="
    // and a number is clicked
    if (
      calculator.operator === "=" &&
      calculator.waitingForSecondOperand &&
      (target.classList.contains("number") ||
        target.classList.contains("decimal"))
    ) {
      // inputDigit(target.value);
      resetCalculator();
      if (target.classList.contains("decimal")) {
        inputDecimal(target.value);
        updateDisplay();
        return;
      }
      calculator.displayValue = target.value;
      updateDisplay();
      return;
    }

    // If operation is cliked, executes then returns
    if (target.classList.contains("operation")) {
      // if an operation is clicked, then returns
      handleOperator(target.value);
      updateDisplay();
      return;
    }

    //if decimal is clicked, exectues then returns
    if (target.classList.contains("decimal")) {
      inputDecimal(target.value);
      updateDisplay();
      return;
    }

    // If clear is clicked, then resets and updates then returns
    if (target.classList.contains("clear")) {
      // if clear is clicked, executes then returns
      resetCalculator();
      updateDisplay();
      return;
    }

    // Will only execute if value is a number
    if (target.value) {
      inputDigit(target.value);
      updateDisplay();
    }
  });
};

// Starts the Program by calling the main function, init()
init();
