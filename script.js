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
        displayingResult     = document.querySelector('.covertedValue ');


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


// Create Functions
// 

async function GET_API_DATA(currencyName){
    // Get by currency name and Date
    const baseAPI = 'http://api.currencylayer.com/'
    const apiKEY  = atob('MWE4ZjZlYzllY2I5ZmE1MTgyMTBhZjI5MDkyM2RmYWU=');
    const date = new Date();
        

    let response = await fetch(`${baseAPI}live?access_key=${apiKEY}&currencies=${currencyName}&&date=${date}&format=1`);
    let Data = await response.json()
    console.log(Data);
}


async function GET_API_DATA_FULL_CURRENCY_NAME(){
    // Get by currency name
    const baseAPI = 'http://api.currencylayer.com/'
    const apiKEY  = atob('MWE4ZjZlYzllY2I5ZmE1MTgyMTBhZjI5MDkyM2RmYWU=');
    const promise = new Promise((resolve,reject=>{
        fetch(`${baseAPI}list?access_key=${apiKEY}&format=1`);
    }))
    promise.then{}
}

console.log(GET_API_DATA_FULL_CURRENCY_NAME());
async function GET_API_DATA(){
    // Get all currencies
    const baseAPI = 'http://api.currencylayer.com/'
    const apiKEY  = atob('MWE4ZjZlYzllY2I5ZmE1MTgyMTBhZjI5MDkyM2RmYWU=');

    let response = await fetch(`${baseAPI}live?access_key=${apiKEY}&format=1`);
    let Data = await response.json()

    INNER_LIVE_RATE(Data);
}
function DATE_FORMAT(date){
    let day,month,year;
        day = date.getDay();
        month = date.getMonth();
        year = date.getFullYear();

        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }
        return `${day}-${month}-${year}`
}


function INNER_LIVE_RATE(data){

    let retrivedDataLength = Object.entries(data.quotes).length ;
    let retrivedDataCurrencyRate = Object.values(data.quotes) ;

    for(var i = 0; i < retrivedDataLength  ; i++ ){

        let tableRow = document.createElement('tr');
        let tableDataCurrencyLogo = document.createElement('td');
        let tableDatacurrencyName = document.createElement('td');
        let tableDatacurrencyRate = document.createElement('td');
        let dataimage = document.createElement('img');
    
        tableRow.appendChild(tableDataCurrencyLogo) ;
        tableDataCurrencyLogo.appendChild(dataimage);
        tableRow.appendChild(tableDatacurrencyName) ;
        tableRow.appendChild(tableDatacurrencyRate) ;
        // tableDatacurrencyName.appendChild(document.createTextNode(fullCurrencyName[i]))
        tableDatacurrencyRate.appendChild(document.createTextNode(retrivedDataCurrencyRate[i]))


        tableDataCurrencyLogo.className = 'currencyLogo'
        tableDatacurrencyName.className = 'currencyName'
        tableDatacurrencyRate.className = 'currencyRate'
        dataimage.className = 'Logo';
        dataimage.src= 'assists/img/money.png'
        mainTable.appendChild(tableRow)
    }

}
// calling functions
// 
DATE_FORMAT(new Date())
GET_API_DATA()
// http://api.currencylayer.com/live?access_key=1a8f6ec9ecb9fa518210af290923dfae&currencies=EGP&format=1