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

fetchData (URLAPI)
.then(data1 => {
    console.log(data1.info.count)
    return fetchData (URLAPI+data1.results[0].id)
})
.then (data2 => {
    console.log(data2.name)
    return fetchData (data2.location.url)
})
.then (data3 => {
    console.log(data3.dimension)
})
.catch(error => console.error(error));