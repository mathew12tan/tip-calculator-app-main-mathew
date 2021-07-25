const form = document.querySelector("form");

const billInput = document.querySelector("#bill-amount");
const radios = document.querySelectorAll("input[type=radio]");
const tipCustomInput = document.querySelector("#tip-custom-input");
const peopleInput = document.querySelector("#people-amount");
const people = document.querySelector(".people");

const tipAmount = document.querySelector(".tip-amount");
const total = document.querySelector(".total");

const resetBtn = document.querySelector(".reset-btn");

let billAmount;
let tip;
let numPeople;

function calcTip(input) {
  billAmount = parseFloat(billInput.value);
  numPeople = parseInt(peopleInput.value);

  switch (input.name) {
    case "tip":
      tipCustomInput.value = "";
      tip = parseFloat(input.value);
      break;
    case "tip-custom-input":
      radios.forEach((radio) => {
        radio.checked = false;
      });
      tip = parseFloat(input.value) / 100;
      break;
  }

  let tipPerPerson = (billAmount * tip) / numPeople;
  let totalPerPerson = (billAmount * (tip + 1)) / numPeople;

  numPeople === 0
    ? people.classList.add("error-msg")
    : people.classList.remove("error-msg");

  isNaN(tipPerPerson) || isNaN(totalPerPerson) || numPeople === 0
    ? ((tipAmount.textContent = `$0.00`), (total.textContent = `$0.00`))
    : ((tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`),
      (total.textContent = `$${totalPerPerson.toFixed(2)}`));

  resetBtn.classList.add("reset");
  resetBtn.disabled = false;
}

function resetCalc() {
  resetBtn.classList.remove("reset");
  resetBtn.disabled = true;
  tipAmount.textContent = `$0.00`;
  total.textContent = `$0.00`;
}

form.addEventListener("input", function (e) {
  calcTip(e.target);
});

form.addEventListener("reset", function () {
  form.reset();
  resetCalc();
});
