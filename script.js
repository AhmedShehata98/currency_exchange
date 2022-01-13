

async function GET_API_DATA(currencyName){
    // Get by currency name and Date
    const baseAPI = 'http://api.currencylayer.com/'
    const apiKEY  = atob('MWE4ZjZlYzllY2I5ZmE1MTgyMTBhZjI5MDkyM2RmYWU=');
    const date = new Date();
        

    let response = await fetch(`${baseAPI}live?access_key=${apiKEY}&currencies=${currencyName}&&date=${date}&format=1`);
    let Data = await response.json()
    console.log(Data);
}
async function GET_API_DATA(currencyName){
    // Get by currency name
    const baseAPI = 'http://api.currencylayer.com/'
    const apiKEY  = atob('MWE4ZjZlYzllY2I5ZmE1MTgyMTBhZjI5MDkyM2RmYWU=');

    let response = await fetch(`${baseAPI}live?access_key=${apiKEY}&currencies=${currencyName}&format=1`);
    let Data = await response.json()
    console.log(Data);
}
async function GET_API_DATA(){
    // Get all currencies
    const baseAPI = 'http://api.currencylayer.com/'
    const apiKEY  = atob('MWE4ZjZlYzllY2I5ZmE1MTgyMTBhZjI5MDkyM2RmYWU=');

    let response = await fetch(`${baseAPI}live?access_key=${apiKEY}&currencies=${currencyName}&format=1`);
    let Data = await response.json()
    console.log(Data);
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
DATE_FORMAT(new Date())
// http://api.currencylayer.com/live?access_key=1a8f6ec9ecb9fa518210af290923dfae&currencies=EGP&format=1