//Running parallel promises:
//as Nodejs is single thread but we can run parallel promises
//Difference from index.js file there we have to wait 2 sec after call each fnc but here 
//the result of both fncs come together
const p1 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log('Async Operation 1.....');
        resolve(1);
    },2000);
})

const p2 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log('Async Operation 2.....');
        resolve(1);
    },2000);
})

Promise.all([p1,p2])
.then(result => console.log(result));
