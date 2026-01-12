const fromSelect = document.getElementById("fromCurrency");
const toSelect = document.getElementById("toCurrency");

fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json")

  .then(response => response.json())
  .then(data => {
  for (let currencyCode in data) {
    const currencyName = data[currencyCode];

    const option1 = document.createElement("option");
    option1.value = currencyCode;
    option1.textContent = `${currencyName} (${currencyCode.toUpperCase()})`;

    const option2 = option1.cloneNode(true);

    fromSelect.appendChild(option1);
    toSelect.appendChild(option2);
  }
});
const swapbutton=document.querySelector("#swap");




swapbutton.addEventListener("click", () => {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
  swapbutton.classList.add("rotate");

  

  // swapbutton.addEventListener("animationend", () => {
  // swapbutton.classList.remove("rotate");
  // }, { once: true });

  setTimeout(() => {
  swapbutton.classList.remove("rotate");
}, 200);

});

const form = document.getElementById("convertform");

form.addEventListener("submit", (e)=>{
  e.preventDefault();
  const amount = Number(document.getElementById("amount").value);
  const fromCurrency = fromSelect.value;
  const toCurrency = toSelect.value;

  fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json").then(res =>{
    res.json().then(eurodata =>{
      const rates = eurodata.eur;
      const fromrate=rates[fromCurrency];
      const torate=rates[toCurrency];
      const convertedamount=(torate/fromrate)*amount;
      const resultdiv=document.getElementById("result");
      resultdiv.innerHTML=`${amount} ${fromCurrency.toUpperCase()} = ${convertedamount.toFixed(2)} ${toCurrency.toUpperCase()}`;
    })
  })
})


