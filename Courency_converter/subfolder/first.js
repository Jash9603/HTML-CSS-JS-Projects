

const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".calculate");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const toText = document.querySelector(".totext");
const rateText = document.querySelector(".rate");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption)
  }
select.addEventListener("change" ,(evt) => {
  updateFlag(evt.target)
})
}




const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.parentElement.querySelector("img");
  img.src = newSrc;
};


btn.addEventListener("click",(evt) => {
  valueChange(evt);
});




const valueChange = async (evt) => {
  evt.preventDefault();
let amount = document.querySelector("input").value;

if(amount < 1 || amount === "")
{
  document.querySelector("input").value = 1;
  amount = "1";
}

const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
let respose = await fetch(URL);
let data = await respose.json();
let rate = await data[toCurr.value.toLowerCase()];


let finalValue = amount * rate;
console.log(finalValue);

toText.innerText = finalValue;

rateText.innerText = `1 ${fromCurr.value} is ${rate} ${toCurr.value} `

}