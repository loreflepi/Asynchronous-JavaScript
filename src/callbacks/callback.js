function date(){
    console.log(new Date);
}

function printDate (callback){
    console.log(new Date);
    setTimeout(()=> callback(), 3000);
} 

printDate(date);

