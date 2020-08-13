let Xmlhttprequest = require('xmlhttprequest').XMLHttpRequest;
const URLAPI = "https://rickandmortyapi.com/api/character/";

function fetchData (url, callback){
    let xhttp = new Xmlhttprequest();
    xhttp.open('GET', url, true);
    xhttp.onreadystatechange = function (event){
        if (xhttp.readyState === 4){
            if (xhttp.status === 200){
                callback(null, JSON.parse(xhttp.responseText));
            }
            else{
                const error = new Error('Error ' + url);
                callback(error, null);
            }
        }
    }
    xhttp.send();
}

fetchData (URLAPI, function(error1, data1){
    if (error1) return error1;
    console.log(data1.info.count);
    fetchData (URLAPI + data1.results[0].id, (error2, data2) => {
        if (error2) return error2;
        console.log(data2.name);
        fetchData (data2.location.url, (error3, data3) => {
            if (error3) return error3;
            console.log(data3.dimension);
            fetchData (data3.residents[1], (error4, data4) => {
                if (error4) return error4;
                console.log(data4.name);
            });
        });
    });
});
