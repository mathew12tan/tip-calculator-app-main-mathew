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

function calcTip() {
  billAmount = parseFloat(billInput.value);
  numPeople = parseInt(peopleInput.value);

  let tipPerPerson = (billAmount * tip) / numPeople;
  let totalPerPerson = (billAmount * (tip + 1)) / numPeople;

  numPeople === 0
    ? (people.classList.add("error-msg"),(tipPerPerson = 0),(totalPerPerson = 0))
    : ((numPeople = numPeople), people.classList.remove("error-msg"));

  isNaN(tipPerPerson) || isNaN(totalPerPerson)
    ? ((tipAmount.textContent = `$0.00`), (total.textContent = `$0.00`))
    : ((tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`),
      (total.textContent = `$${totalPerPerson.toFixed(2)}`));
}

function reset() {
  resetBtn.classList.add("reset");
  resetBtn.disabled = false;
  resetBtn.addEventListener("click", function () {
    resetBtn.classList.remove("reset");
    resetBtn.disabled = true;
    billInput.value = "";
    radios.forEach((radio) => {
      radio.checked = false;
    });
    tipCustomInput.value = "";
    peopleInput.value = "";
    tipAmount.textContent = `$0.00`;
    total.textContent = `$0.00`;
  });
}

billInput.addEventListener("input", function () {
  calcTip();
  reset();
});

radios.forEach((radio) => {
  radio.addEventListener("click", function () {
    tip = parseFloat(radio.value);
    tipCustomInput.value = "";
    calcTip();
    reset();
  });
});

tipCustomInput.addEventListener("input", function () {
  tip = parseFloat(tipCustomInput.value) / 100;
  radios.forEach((radio) => {
    radio.checked = false;
  });
  calcTip();
  reset();
});

peopleInput.addEventListener("input", function () {
  calcTip();
  reset();
});