
const userInput = document.querySelector("#userInput")
const currencyListFrom = document.querySelector('.currencyListFrom')
const currencyListTo = document.querySelector('.currencyListTo')
const output = document.querySelector('.output')
const output2 = document.querySelector('.output2')
const badge = document.querySelector('.space')
var amount,from,to,convString,excValue,fromSymbol,toSymbol
var firstTime=true




  Number.prototype.toFixedNoRounding = function(n) {
    const reg = new RegExp("^-?\\d+(?:\\.\\d{0," + n + "})?", "g")
    const a = this.toString().match(reg)[0];
    const dot = a.indexOf(".");
    if (dot === -1) { // integer, insert decimal dot and pad up zeros
        return a + "." + "0".repeat(n);
    }
    const b = n - (a.length - dot) + 1;
    return b > 0 ? (a + "0".repeat(b)) : a;
 }


async function getResponse(currency){
    const url = `https://free.currconv.com/api/v7/convert?q=${currency}&compact=ultra&apiKey=3c9bc4bd0a0bf7e55b35`
    console.log(url)
    const response = await fetch(url)
    const data= await response.json()
    const data2 = await data[`${convString}`]
    return data2
}

getExchageRate =()=>{
    from = currencyListFrom.value.trim()
    fromSymbol=currencySymbol[`${from}`]
    console.log("from",from, fromSymbol)
    to = currencyListTo.value.trim()
    toSymbol=currencySymbol[`${to}`]
    console.log("to",to, toSymbol)
    convString=from+'_'+to
    console.log(convString)
    getResponse(convString).then(data => {
        excValue=data.toFixedNoRounding(2)
        updateUI()
    })
}


updateUI=()=>{
    const actualAmt= excValue*amount
    console.log("from",from, fromSymbol)
    console.log("to",to, toSymbol)
    console.log(`${fromSymbol}${amount} = ${toSymbol}${actualAmt}`)
    output.innerText=`${fromSymbol}${amount} = ${toSymbol}${actualAmt}`
    // output.innerText=`${toSymbol}${amount} = ${fromSymbol}${actualAmt}`
    output2.innerText=`${fromSymbol}1 = ${toSymbol}${excValue}`
    badge.classList.remove('d-none')
}

currencyListFrom.addEventListener('change',(e)=>{
    e.preventDefault()
    getExchageRate() 
})

currencyListTo.addEventListener('change',(e)=>{
    e.preventDefault()
    getExchageRate() 
})

userInput.addEventListener('keyup',(e)=>{
    e.preventDefault()
    amount = userInput.value.trim()
    if(firstTime)
    {
        console.log('firstTime')
        getExchageRate()
        firstTime=false
    }
    else
    {
        console.log('not-firstTime')
        updateUI()
    }
    
})

chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
  }, function(selection) {
    if(!isNaN(selection[0]))
    {
        amount=parseInt(Math.round(selection[0].trim()))
        userInput.value = amount
        getExchageRate()
    }
  });