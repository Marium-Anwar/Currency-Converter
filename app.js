const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-10-25/v1";
//accessing html elements 
const dropdowns = document.querySelectorAll(".dropdown select"); 
const btn = document.querySelector("form button"); 
const fromCurr = document.querySelector(".from select"); 
const toCurr = document.querySelector(".to select"); 
const msg = document.querySelector(".msg");


//adding options in <select>
for (let select of dropdowns) { 
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        //To select USD and PKR in from-to options
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "PKR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    //when select is changed
    select.addEventListener("change", (evt) => { 
        updateFlag(evt.target); 
    })
};

const updateExchangeRate = async () => {
    //to access amount entered by user
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    //creating URL to send request
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL); 
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    
    let finalAmount = amtVal * rate; //amtVal is the amount entered by user
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`; //1USD = 277PKR
};


//function to update flag when a country is selected
const updateFlag = (element) => { 
    let currCode = element.value;
    let countryCode = countryList[currCode]; //PK, US, EU
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; //new source link
    let img = element.parentElement.querySelector("img"); //to select img in parentElement of <select> 
    img.src = newSrc; //img src is changed into newSrc
};

// Get Exchange Rate - Button 
btn.addEventListener("click", (evt) => {
    evt.preventDefault(); //to prevent default behaviour like page refresh
    updateExchangeRate();
});
window.addEventListener("load", () => { //when page is load for the first time
    updateExchangeRate();
});

