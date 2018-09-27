(() => {
  'use strict';

  const calcBtnsContainer = document.querySelector(".calc-container");
  const terminalResult = document.querySelector(".calc-terminal-result");
  const terminalEquation = document.querySelector(".calc-terminal-equation");
  let firstEntryNumber = 0;
  let secondEntryNumber = 0;
  let entryEquation = "";
  let isEquation = false;
  let completeEquation = false;

  const removeActiveClass = () => terminalEquation.classList.remove("active");

  const doMath = {
    add: (firstNumb, secondNumb) => firstNumb + secondNumb,
    subtract: (firstNumb, secondNumb) => firstNumb - secondNumb,
    divide: (firstNumb, secondNumb) => firstNumb / secondNumb,
    multiple: (firstNumb, secondNumb) => firstNumb * secondNumb
  };

  const getThe = {
    className: (theElement) => theElement.target.className,
    parentClassName: (theElement = "", theClass = "") => {
      if (theClass == "") {
        return theElement.target.parentNode.className;
      } else {
        let targetClassList = theElement.target.parentNode.classList.value;
        if (targetClassList.indexOf(theClass) == 0) {
          return theClass;
        } else {
          return false;
        }
      }
    },
    elementText: (theElement) => theElement.target.innerText,
  };

  const calcControl = {
    backspace: (theTarget) => theTarget.slice(0, -1),
    clear: (theTarget) => theTarget.replace(theTarget, ""),
    operation: (firstEntry, secondEntry) => {
      firstEntry = firstEntryNumber.slice(1);
      secondEntry = secondEntryNumber.slice(1);
      const firstNumb = parseInt(firstEntry);
      const secondNumb = parseInt(secondEntry);
      switch (entryEquation) {
        case "÷":
          removeActiveClass();
          terminalResult.innerText = doMath.divide(firstNumb, secondNumb);
          break;
        case "×":
          removeActiveClass();
          terminalResult.innerText = doMath.multiple(firstNumb, secondNumb);
          break;
        case "+":
          removeActiveClass();
          terminalResult.innerText = doMath.add(firstNumb, secondNumb);
          break;
        case "-":
          removeActiveClass();
          terminalResult.innerText = doMath.subtract(firstNumb, secondNumb);
          break;
        default:
          break;
      }
    }
  };

  calcBtnsContainer.addEventListener('click', (event) => {
    const targetClassName = getThe.className(event);
    const targetText = getThe.elementText(event);
    const targetEquations = getThe.parentClassName(event, "calc-equations");
    const targetCalcControl = getThe.parentClassName(event, "calc-numbers-control");

    if (targetClassName === "calc-number") {
      if (terminalResult.innerText === "" && isEquation === false) {
        firstEntryNumber += targetText;
        terminalEquation.innerText += targetText;
      } else {
        if (terminalResult.innerText >= 0 && isEquation === true) {
          terminalEquation.innerText += targetText;
          secondEntryNumber += targetText;
          completeEquation = true;
        }
      }
    } else if (terminalEquation.innerText != "" && targetEquations === "calc-equations" || targetCalcControl === "calc-numbers-control") {
      if (targetEquations === "calc-equations") {
        if (targetClassName === "calc-equation-equals" && completeEquation === true) {
          calcControl.operation(firstEntryNumber, secondEntryNumber);
        } else {
          entryEquation = targetText;
          terminalEquation.innerText += entryEquation;
          isEquation = true;
        }
      } else if (targetCalcControl === "calc-numbers-control") {
        if (targetClassName === "calc-terminal-clear") {
          terminalEquation.innerText = calcControl.clear(terminalEquation.innerText);
          terminalResult.innerText = calcControl.clear(terminalResult.innerText);
          terminalEquation.classList.add("active");
          isEquation = false;
          firstEntryNumber = 0;
          secondEntryNumber = 0;
          entryEquation = "";
        } else if (targetClassName === "calc-terminal-backspace") {
          terminalEquation.innerText = calcControl.backspace(terminalEquation.innerText);
          secondEntryNumber = calcControl.backspace(secondEntryNumber);
        }
      }
    }

    event.stopPropagation();
  });
})();

/**
 * Pseudo Code:
 * if (terminal is empty AND event is number){
 *  1- Bind the entry to terminal.
 * }
 * else if (terminal has only number AND the event is equation){
 *  1- Bind the equation behind the number.
 * }
 * else if(terminal has number with equation AND the event is number){
 *  1- Bind the number after the added number and equation.
 * }
 * else if (terminal has two sides numbers with equation in middle AND event is equal btn){
 *  1- Animate the current equation to the top right corner of the terminal.
 *  2- Display the result with fade-in with big size.
 * }
 */