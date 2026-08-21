// Aula 04: Converter variáveis 

let prompt = require("prompt-sync" )()

/*let data = "1995-10-14"
let data_formatada = data_formatada.split("-").reverse().join("/").
*/ 

let numero1 = prompt("Digite um número: ")
numero1= parseFloat (numero1)

let numero2 = parseInt (prompt ("Digite outro número: "))

let soma= numero1+numero2
console.log("O resultado é: "+ soma)

// --------------------------------------------------------------

