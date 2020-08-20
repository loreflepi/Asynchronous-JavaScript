let Xmlhttprequest = require('xmlhttprequest').XMLHttpRequest;
const URLAPI = "https://rickandmortyapi.com/api/character/";

function fetchData (url){
    return new Promise((resolve, reject)=>{
    let xhttp = new Xmlhttprequest();
    xhttp.open('GET', url, true);
    xhttp.onreadystatechange = function (event){
        if (xhttp.readyState === 4){
            if (xhttp.status === 200){
                resolve (JSON.parse(xhttp.responseText));
            }
            else{
                const error = new Error('Error ' + url);
                reject (error);
            }
        }
    }
    xhttp.send();
    });  
}

const fetchCount = async() => {
    try{
        const data1 = await fetchData(URLAPI);
        const data2 = await fetchData(URLAPI+data1.results[0].id);
        const data3 = await fetchData(data2.location.url);
        console.log(data1.info.count);
        console.log(data2.name);
        console.log(data3.dimension);
    }
    catch(error){
        console.error(error);
    }
}

fetchCount();