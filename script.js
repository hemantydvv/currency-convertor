const countryList = {
  "AFN": "AF",
  "EUR": "AX",
  "ALL": "AL",
  "DZD": "DZ",
  "USD": "US",
  "AOA": "AO",
  "XCD": "AI",
  "ARS": "AR",
  "AMD": "AM",
  "AWG": "AW",
  "AUD": "AU",
  "AZN": "AZ",
  "BSD": "BS",
  "BHD": "BH",
  "BDT": "BD",
  "BBD": "BB",
  "BYN": "BY",
  "BZD": "BZ",
  "XOF": "BJ",
  "BMD": "BM",
  "BTN": "BT",
  "INR": "IN",
  "BOB": "BO",
  "BOV": "BO",
  "BAM": "BA",
  "BWP": "BW",
  "NOK": "BV",
  "BRL": "BR",
  "BND": "BN",
  "BGN": "BG",
  "BIF": "BI",
  "CVE": "CV",
  "KHR": "KH",
  "XAF": "CM",
  "CAD": "CA",
  "KYD": "KY",
  "CLF": "CL",
  "CLP": "CL",
  "CNY": "CN",
  "COP": "CO",
  "COU": "CO",
  "KMF": "KM",
  "CDF": "CD",
  "NZD": "CK",
  "CRC": "CR",
  "CUC": "CU",
  "CUP": "CU",
  "XCG": "CW",
  "CZK": "CZ",
  "DKK": "DK",
  "DJF": "DJ",
  "DOP": "DO",
  "EGP": "EG",
  "SVC": "SV",
  "ERN": "ER",
  "ETB": "ET",
  "FKP": "FK",
  "FJD": "FJ",
  "GMD": "GM",
  "GEL": "GE",
  "GHS": "GH",
  "GIP": "GI",
  "GTQ": "GT",
  "GBP": "GG",
  "GNF": "GN",
  "GYD": "GY",
  "HTG": "HT",
  "HNL": "HN",
  "HKD": "HK",
  "HUF": "HU",
  "ISK": "IS",
  "IDR": "ID",
  "XDR": "IM",
  "IRR": "IR",
  "IQD": "IQ",
  "ILS": "IL",
  "JMD": "JM",
  "JPY": "JP",
  "JOD": "JO",
  "KZT": "KZ",
  "KES": "KE",
  "KPW": "KP",
  "KRW": "KR",
  "KWD": "KW",
  "KGS": "KG",
  "LAK": "LA",
  "LBP": "LB",
  "LSL": "LS",
  "ZAR": "LS",
  "LRD": "LR",
  "LYD": "LY",
  "CHF": "LI",
  "MKD": "MK",
  "MGA": "MG",
  "MWK": "MW",
  "MYR": "MY",
  "MVR": "MV",
  "MUR": "MU",
  "MRU": "MR",
  "MXN": "MX",
  "MXV": "MX",
  "MDL": "MD",
  "MNT": "MN",
  "MAD": "MA",
  "MZN": "MZ",
  "MMK": "MM",
  "NAD": "NA",
  "NPR": "NP",
  "NIO": "NI",
  "NGN": "NG",
  "OMR": "OM",
  "PKR": "PK",
  "PAB": "PA",
  "PGK": "PG",
  "PYG": "PY",
  "PEN": "PE",
  "PHP": "PH",
  "PLN": "PL",
  "QAR": "QA",
  "RON": "RO",
  "RUB": "RU",
  "RWF": "RW",
  "SHP": "SH",
  "SCR": "SC",
  "SLE": "SL",
  "SGD": "SG",
  "XSU": "XS",
  "SBD": "SB",
  "SOS": "SO",
  "SSP": "SS",
  "LKR": "LK",
  "SDG": "SD",
  "SRD": "SR",
  "SZL": "SZ",
  "SEK": "SE",
  "CHE": "CH",
  "CHW": "CH",
  "SYP": "SY",
  "TWD": "TW",
  "TJS": "TJ",
  "TZS": "TZ",
  "THB": "TH",
  "TND": "TN",
  "TRY": "TR",
  "TMT": "TM",
  "UGX": "UG",
  "UAH": "UA",
  "AED": "AE",
  "UYI": "UY",
  "UYU": "UY",
  "UZS": "UZ",
  "VUV": "VU",
  "VEF": "VE",
  "VED": "VE",
  "VND": "VN",
  "YER": "YE",
  "ZMW": "ZM",
  "ZWL": "ZW"
};

  const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown=document.querySelectorAll(".select-container select");
const btn =document.querySelector("#button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
 for (let select of dropdown){
    for(currCode in countryList){
        let newOption =document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        
    }
    if (select.name === "from") select.value = "USD";
      if (select.name === "to") select.value = "INR";
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
    getExchangeRate(); // Update rate on change
 });

    }

const updateFlag=(Element)=>{
    let currCode=Element.value;
    console.log(currCode);
    let countryCode =countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=Element.parentElement.querySelector("img");
    img.src=newSrc;
};

async function getExchangeRate() {
  const URL= `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  try {
    let responce=await fetch(URL);
    let data=await responce.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    if (typeof rate !== 'number' || isNaN(rate)) {
      throw new Error('Invalid exchange rate');
    }
    let amountInput = document.querySelector(".amount input");
    let amtVal = parseFloat(amountInput.value) || 1;
    let finalamount=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${parseFloat(finalamount).toFixed(2)} ${toCurr.value}`;
  } catch(e) {
    console.error(e);
    msg.innerText = "Error loading exchange rate";
  }
}

getExchangeRate(); // Load initial rate

btn.addEventListener("click",async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = parseFloat(amount.value) || 1;
  if (amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  console.log(fromCurr.value,toCurr.value);
  const URL= `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  try {
    let responce=await fetch(URL);
    let data=await responce.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    if (typeof rate !== 'number' || isNaN(rate)) {
      throw new Error('Invalid exchange rate');
    }
    let finalamount=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${parseFloat(finalamount).toFixed(2)} ${toCurr.value}`;
  } catch(e) {
    console.error(e);
    msg.innerText = "Error loading exchange rate";
  }
});