// Aula 06: EX condições

let prompt = require("prompt-sync" )()

let presp= 125.0
let preara= 68.9
let total= 0
let seg= 42.5
let valordesconto = 0

console.log("Escolha seu destino: ")
console.log("1- São Paulo por: "+ presp)
console.log("2- Araraquara por: "+ preara)

let resp=prompt("Digite uma opção: ")
if(resp== 1){
    total=presp
 }


if(resp==2 ){
    total=preara
}

console.log("O destino selecionado foi: "+ resp)
console.log("O total a pagar é: "+total)

let seguro= prompt("Deseja adicionar um seguro por mais "+seg+ " ?")
if(seguro== "SIM"){
    total= total+seg
}

// Let desconto= total * 0.05
//total= total - desconto
//ctrl ponto e virgula consegue comentar em uma sessão


let cupom= prompt("Digie seu cupom de desconto: "
)
if(cupom=="DESC20"){
    console.log("Cupom DE 20% adicionado!")
    let desc1= 20
    let desc2= desc1/100
    let total1= total * desc2
    valordesconto = total -  total1
} else{
    console.log("Não existe esse cupom")
}





console.log("O total da viagem sem desconto é de: "+ total)
console.log("O total da viagem com desconto é de: "+ valordesconto)

desc3= 0.05

let pix= valordesconto-desc3
let cred= valordesconto+desc3

console.log("Formas de pagamento: ")
console.log("1- Cartão de crédito (acréscimo de 5%)")
console.log("2- Pix (desconto de 5%)")
resp= prompt("Escolha uma opção: ")

if (resp==1){
    console.log("Voce deve pagar: " + cred)
} else{ 
    console.log("Voce deve pagar: "+pix)
}


let promo= prompt("Gostaria receber de e-mails promocionais?: "
)
if(promo=="SIM")
    { console.log("Yeeey, SPAM")
    }else{
    console.log("Ok, sem e-mails promocionais")

}
console.log("Obrigado(a), volte sempre!")