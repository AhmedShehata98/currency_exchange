// define variables
// 
const togglemenu = document.querySelector('.toggleBTN'),
        links    = document.querySelectorAll('.links li'),
        navbar    = document.querySelector('.links'),
        pageHeader    = document.querySelector('header'),
        scrollTotopBTN    = document.querySelector('.scrollToTopBTN'),
        mainTable    = document.querySelector('.currency-table'),
        currencyNameTable    = document.querySelector('.currencyName'),
        currencyRateTable    = document.querySelector('.currencyRate'),
        selectCurrencyNameFrom    = document.querySelector('#currencyListFrom'),
        selectCurrencyNameTo    = document.querySelector('#currencyListTo'),
        CurrencyAmountInput    = document.querySelector('#amountInput'),
        convertBTN     = document.querySelector('.convertBTN '),
        displayingResult     = document.querySelector('.covertedValue '),
        displayingSelectedCurrency = document.querySelector('.selectedCurrencyRate '),
        closeOverlay = document.querySelector('.closed ');

// Start Events
// 
togglemenu.addEventListener('click',function(){
    navbar.classList.toggle('active')
})
window.addEventListener('scroll',function(){
    if (window.scrollY >=55) {
        pageHeader.classList.add('active');
    }else{
        pageHeader.classList.remove('active');
    }
    if (window.scrollY >= 1000) {
        scrollTotopBTN.classList.add('active');
    }else{
        scrollTotopBTN.classList.remove('active');
        
    }
})
scrollTotopBTN.addEventListener('click',function(){
    window.scrollTo({
        top:0,
        behavior:'smooth'
    })
})

convertBTN.addEventListener('click',async function(){
    let selectedValue = selectCurrencyNameFrom.value;
    let amountInput   = CurrencyAmountInput.value;

    let finalResult   = await CALCULATE_AND_CONVERT(selectedValue,amountInput);
    let selectedCurrencyRate = await GET_API_DATA_BY_CURRENCY_NAME(selectedValue)
    console.log(finalResult);
    displayingResult.textContent = Number.parseFloat(finalResult).toFixed(2)
    displayingSelectedCurrency.textContent = 'Currency Rate : '+' '+Number.parseFloat(selectedCurrencyRate).toFixed(2)+'  '+selectedValue
})

closeOverlay.addEventListener('click',function(){
    closeOverlay.closest('div.overlayMSG').remove()
})
setTimeout(()=>{
    closeOverlay.closest('div.overlayMSG').remove()
},10000)
// Create Functions
// 

async function GET_API_DATA_BY_CURRENCY_NAME(currencyName){
    // Get by currency name and Date
    const baseAPI = 'http://api.currencylayer.com/'
    const apiKEY  = atob('MWE4ZjZlYzllY2I5ZmE1MTgyMTBhZjI5MDkyM2RmYWU=');
    // const date = DATE_FORMAT(new Data());
    //     console.log(date);

    let response = await fetch(`${baseAPI}live?access_key=${apiKEY}&currencies=${currencyName}&format=1`);
    let Data = await response.json()
    return Object.values(Data.quotes)
}


async function GET_API_DATA_FULL_CURRENCY_NAME(){
    // Get by currency name
    const baseAPI = 'http://api.currencylayer.com/'
    const apiKEY  = atob('MWE4ZjZlYzllY2I5ZmE1MTgyMTBhZjI5MDkyM2RmYWU=');
    
    let response = await fetch(`${baseAPI}list?access_key=${apiKEY}&format=1`);
    let data = await response.json()
    return Object.values(data.currencies)
}

async function GET_API_DATA_LIVE_RATE(){
    // Get all currencies Rate
    const baseAPI = 'http://api.currencylayer.com/'
    const apiKEY  = atob('MWE4ZjZlYzllY2I5ZmE1MTgyMTBhZjI5MDkyM2RmYWU=');

    let response = await fetch(`${baseAPI}live?access_key=${apiKEY}&format=1`);
    let Data = await response.json()
    // return Object.values(Data.quotes)
    return Object.values(Data.quotes)

}

async function INNER_LIVE_RATE(data){

    
    let retrivedDataCurrencyName = await GET_API_DATA_FULL_CURRENCY_NAME();
    let retrivedDataCurrencyRate = await GET_API_DATA_LIVE_RATE();

    for(var i = 0; i < retrivedDataCurrencyRate.length  ; i++ ){

        let tableRow = document.createElement('tr');
        let tableDataCurrencyLogo = document.createElement('td');
        let tableDatacurrencyName = document.createElement('td');
        let tableDatacurrencyRate = document.createElement('td');
        let dataimage = document.createElement('img');
    
        tableRow.appendChild(tableDataCurrencyLogo) ;
        tableDataCurrencyLogo.appendChild(dataimage);
        tableRow.appendChild(tableDatacurrencyName) ;
        tableRow.appendChild(tableDatacurrencyRate) ;
        tableDatacurrencyName.appendChild(document.createTextNode(retrivedDataCurrencyName[i]))
        tableDatacurrencyRate.appendChild(document.createTextNode(retrivedDataCurrencyRate[i]))


        tableDataCurrencyLogo.className = 'currencyLogo flex-row-axsis'
        tableDatacurrencyName.className = 'currencyName'
        tableDatacurrencyRate.className = 'currencyRate '
        dataimage.className = 'Logo';
        dataimage.src= 'assists/img/money.png'
        mainTable.appendChild(tableRow)
    }

}
async function CALCULATE_AND_CONVERT(currencyName,inputAmount){
    let currencyRateFrom_API = await GET_API_DATA_BY_CURRENCY_NAME(currencyName)
   return currencyRateFrom_API * inputAmount

}
// calling functions
// 
GET_API_DATA_LIVE_RATE()
INNER_LIVE_RATE()
// http://api.currencylayer.com/live?access_key=1a8f6ec9ecb9fa518210af290923dfae&currencies=EGP&format=1