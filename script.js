const Base_url ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr = document.querySelector(" .from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(const select of dropdown){
    for(const code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        if(select.name==="from" && code === "USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && code === "NPR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(event)=>{
        updateFlag(event.target);// Target- returns the element where the event occured.
    })
}
const updateFlag = (element)=>{
       let code = element.value;
       let countryCode = countryList[code];
       let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
       let img = element.parentElement.querySelector("img");
       img.src=newSrc;
}
btn.addEventListener("click", (evt)=>{
evt.preventDefault();
exchange();
});


const exchange = async()=>{
    let amount =document.querySelector(".amount input");
    let amtVal = amount.value;
    
    if(amtVal=="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    
    const url =`${Base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;//api le capital letter ma kaam nagarney bhayekole teslai lowercase ma convert gareko
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];// data ko toCurr.value ko lowercase ma rate bhako le teslai access gareko
    let finalAmount = rate* amount.value;
    
    msg.innerText= `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};
window.addEventListener("load",exchange);