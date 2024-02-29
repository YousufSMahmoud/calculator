import * as logic from "./logic.js";
let keysElement = document.querySelectorAll("[data-type]");

keysElement.forEach((button) => {
  let type = button.dataset.type;
  if (logic.isNumber(type) || logic.isSpecial(type)) {
    button.addEventListener("click", (event) => {
      let value = button.dataset.value;
      logic.numbersHandler(value);
    });
  }
});

keysElement.forEach((button) => {
  let type = button.dataset.type;
  let value = button.dataset.value;
  if (logic.isOperation(value)) {
    button.addEventListener("click", (event) => {
      let value = button.dataset.value;
      logic.operationHandler(value);
    });
  }
});

logic.theme.addEventListener("click", () => {
  logic.theme.classList.toggle("themes__toggle--isActive");
});

window.addEventListener("keydown", (event) => {
  let value = event.key;

  if (logic.numbers.includes(value)) {
    logic.numbersHandler(value);
  } else if (logic.operations.includes(value)) {
    logic.operationHandler(value);
  }
});
