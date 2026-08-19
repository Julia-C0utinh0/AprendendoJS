// Aula 05 : Exemplos condições
let prompt = require("prompt-sync" )()

let usuario= prompt("Digite o seu usuário: ")
if(usuario == "Lambari" ){

console.log("OIIII adoro lambaris")
} else {
    console.log("Não é um lambari :(")
}

console.log("O usuário digitado foi"+ usuario)

let idade= parseInt( prompt("Digite sua idade: "))
if(idade > 100 ){

console.log("Lambaris não conseguem ser tão velhos....")
} 

if(idade < 0){
    console.log("ok")
} else{ 
    console.log("insano")}

console.log("A idade digitada foi: "+ idade)
