console.clear();

var baseUrl = 'http://numbersapi.com/';

 async function getNumbersFact(...numbers){
     // returns an object where each number is a key and its value a fact.     

     let singleNum = false; 
     if(numbers.length === 1){
             singleNum = true;
     }

     numbers = numbers.reduce((a,b)=>{
        return a + ',' + b;  
     });
     
     let data = await fetch(baseUrl + numbers + '?json', {'headers': {'Accept': 'application/json'}})
        .then(resp => {
            return resp.json(); 
        }); 

    if(singleNum){
        return {[data.number]: data.text};
    }
    else{
        return data;
    }
 }

async function main(){
    
    const part_1 = document.querySelector('#part-1');
    const part_2 = document.querySelector('#part-2');
    const part_3 = document.querySelector('#part-3');

    let trivia = await getNumbersFact(27);
    part_1.innerText = trivia[27];

    trivia = await getNumbersFact(32, 42, 52);
    part_2.innerHTML += trivia[32] + '<br />';
    part_2.innerHTML += trivia[42] + '<br />';
    part_2.innerHTML += trivia[52];


    trivia = await getNumbersFact(27);
    part_3.innerHTML = trivia[27] + '<br />';

    trivia = await getNumbersFact(27);
    part_3.innerHTML += trivia[27] + '<br />';

    trivia = await getNumbersFact(27);
    part_3.innerHTML += trivia[27] + '<br />';
    
    trivia = await getNumbersFact(27);
    part_3.innerHTML += trivia[27];

 }

 main(); 