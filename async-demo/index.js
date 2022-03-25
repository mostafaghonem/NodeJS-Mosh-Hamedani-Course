const { response } = require("express");
const { func } = require("joi");

console.log('before');

//original
// const user = getUser(1); 
// console.log(user);//here will get undefined as setTimeOut return Obj after the calling ended

//so there are 3 patterns for dealing with async code:
//1 - callback
//callback hell
// getUser(1 , (user)=>{
//     console.log(`User ${JSON.stringify(user)}`);
//     getRepos(user.username , (repos)=>{
//         console.log(repos);
//         getCommits(repos[0], (commit)=>{
//             console.log(commit);

//             //this called callback hell....
//         })
//     })
// })

//rescue callback hell with named fncs
// getUser(1 , getRepos);
// function getRepos(user){
//     getRepos(user.username , getCommits)
// }
// function getCommits(repos){
//     getCommits(repos, displayCommits)
// }
// function displayCommits(commits){
//     console.log(commits);
// }

//callback fncs
// function getUser(id , callback){
//     setTimeout(()=>{
//         console.log('Reading a user from database....');
//         callback({id:id , username:'Mostafa-ghonem'});
//     },2000); //this setTimeOut represent long operation or retrive data from database
//     // return 1;
// }

// function getRepos(username , callback){
//     setTimeout(()=>{
//         console.log('get Repos for '+ username)
//         callback(['repo1','repo2','repo3']);
//     },2000)
// }

// function getCommits(repo , callback){
//     setTimeout(()=>{
//         console.log('Commits....');
//         callback(['commit 1','commit 2','commit 3']);
//     },2000)
// }


// ======================================================================

//2 - promises
//is an object that holds an eventual result of an asynchronous operation

//consume Promises
// getUser(1) //this fnc resolve an object user
// .then(user=>getRepos(user.username)) //and getRepos resolve an array of repos
// .then(repos=>getCommits(repos[0]))//and getCommit resolve an array of commits
// .then(commits=>console.log(`Commits ${commits}`))
// .catch(err => console.log('Error' , err.message));

//Promises
function getUser(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('Reading a user from database....');
            resolve({id:id , username:'Mostafa-ghonem'});
        },2000); //this setTimeOut represent long operation or retrive data from database
    })
}

function getRepos(username){
    return new Promise((resolve , reject)=>{
        setTimeout(()=>{
            console.log('get Repos for '+ username)
            resolve(['repo1','repo2','repo3']);
        },2000)
    })
}

function getCommits(repo){
    return new Promise((resolve , reject)=>{
        setTimeout(()=>{
            console.log('Commits....');
            resolve(['commit 1','commit 2','commit 3']);
        },2000)
    })
}
// ======================================================================
//3 - async / await   :we use them with a fnc return a promise
//async /await helps you to write async code like sync code
//to use await in a fnc you must declare this fnc as async
async function displayCommits(){
    try{
        const user = await getUser(1);
        const repos = await getRepos(user.username);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch(err){
        console.log('Error' , err.message);
    }
}
displayCommits();


console.log('aftrer');

//original
// function getUser(id){
//     setTimeout(()=>{
//         console.log('Reading a user from database....');
//         return {id:id , username:'Mostafa-ghonem'};
//     },2000); //this setTimeOut represent long operation or retrive data from database
//     // return 1;
// }

