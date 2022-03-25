const p = new Promise((resolve , reject)=>{
    //some async code
    setTimeout(()=>{
        // resolve(1);
        reject(new Error('the Custom error message'));
    },2000);
})

//consume the promise with then if resolved or with catch if rejected(there is an error)
p
.then(res =>{ console.log('Result = '+res)})
.catch(err=>{console.log('Error ' + err.message)});