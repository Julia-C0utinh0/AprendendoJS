//Aula 05- Condições

let prompt = require("prompt-sync" )()

console.log("Bem vindo ao DETRAN!")
let idade= prompt("Digite a sua idade: ")
if (idade >= 18){
    console.log("Voce ja tem idade pra tirar CNH")
} else {
    console.log("Voce NÃO tem idade prar tirar CNH. SAIA DAQUI AGORAAAAA!!!!!!!!")
}

console.log("De uma risadinha")
let aprov= prompt("Digite 1 pra sim ou 2 pra não: ")
if (aprov == "sim"){
    console.log(":D")
} else {
    console.log(":(")
}
 


//--------------Comparadores
//>Maior

//< Menor

//== Igual 

//>= Maior ou igual 

//<= Menor ou igual 

// ! Diferente

