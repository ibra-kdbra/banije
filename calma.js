'use strict';

let a= 5 
let p= 7
let l= []
for(let i =0 ; i < 5 ; i++)
{
   l[i]= (a+p)*2;
   l[i+1]= (a+p)*p;
   console.log(l[i+1]);
   
}
//test
console.log("this is a test for bug-1 branch");