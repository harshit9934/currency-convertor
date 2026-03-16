// ✅ Free API Base URL
const url ="https://open.er-api.com/v6/latest/";

const dropdowns= document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
const msg = document.querySelector(".msg")

// to print all country and their code..
for (code in  countryList){
    console.log(code, countryList[code]);
}

// to display all country in dropdown...
for(let select of dropdowns){
    for (currCode  in  countryList){
        let newOption = document.createElement("option");
        newOption.innerText= currCode;
        newOption.value= currCode;

        if (select.name ==="from" && currCode ==="USD"){
            newOption.selected = "selected"
        }else if (select.name ==="to" && currCode ==="INR"){
            newOption.selected="selected"
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

// change flag
const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img= element.parentElement.querySelector("img")
    img.src=newSrc
};

// function for exchange rate
const updateExchangeRate= async () =>{
    
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;

    if (amtval ===""|| amtval <1){
        amtval= 1;
        amount.value="1"
    }

    console.log(fromCurr.value,toCurr.value);

    //  API call with dynamic base currency
    const URL = `${url}${fromCurr.value}`;

    let response = await fetch(URL);
    let data = await response.json();

    // rates object se rate nikalna
    let rate = data.rates[toCurr.value];

    let finalAmount = amtval * rate;

    msg.innerText=`${amtval} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`
};

// button click
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault(); 
    updateExchangeRate();
});

// page load
window.addEventListener("load" ,()=>{
    updateExchangeRate();
});