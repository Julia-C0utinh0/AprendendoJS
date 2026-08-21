// ATIVIDADE 1: Negativo ou Positivo`


let prompt = require("prompt-sync" )()

//at 1 

let num1= parseInt(prompt("Digite o primeiro número: ")) 
if(num1 % 2 === 0){
    console.log("numero par")
}else{
    console.log("numero impar")
}
let num2= parseInt(prompt("Digite o segundo número: ")) 
if(num2 % 2 === 0){
    console.log("numero par")
}else{
    console.log("numero impar")
}

//at2
let num3= parseInt(prompt("Digite o primeiro número: ")) 


let num4= parseInt(prompt("Digite o segundo número: ")) 
if(num3 >num4 ){
    console.log("Primeiro numero maior")
}else{
    console.log("Segundo numero maior")
}

//at3
let num5= parseInt(prompt("Digite sua altura: ")) 
let num6= parseInt(prompt("Digite seu peso: ")) 
let num7= num5*num5
if( 29.0 > num6/num7){
 console.log("Sobrepeso")
} else {
    console.log("Tudo certo")
}

//at4
let muito= 50
let pesopeixe= parseInt(prompt("Digite o peso dos peixes em Kg: "))
if( pesopeixe < muito){
    console.log("Tudo certo")
} else {
    console.log("Ta muito")
}

let multa= peixin*4.25
let peixin= pesopeixe-muito
console.log(" Seu peixe está com: "+ peixin + " de quilos alem do limite")

console.log("Sua multa é de: "+ multa)




