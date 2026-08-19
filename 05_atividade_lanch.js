// Resultado da atividade da aula 05- Exercicio Lanchonete 
let prompt = require("prompt-sync" )()

let nom1 =parseFloat( prompt("Digite o nome do pão: "))
let nom2 = parseFloat(prompt("Digite o nome do salsicha: "))
let nom3 = parseFloat(prompt("Digite o nome do batata: "))
let nom4 = parseFloat(prompt("Digite o nome do queijo: "))
let nom5 = parseFloat(prompt("Digite o nome do bacon: "))


let porclucro = parseFloat(prompt("Digite a sua porcentagem de lucro: "))
porclucro= porclucro/ 100


let prev1= nom1 * porclucro
let prev2= nom2 * porclucro
let prev3= nom3 * porclucro
let prev4= nom4 * porclucro
let prev5= nom5 * porclucro

let acre1= nom1+ prev1
let acre2= nom2+ prev2
let acre3= nom3+ prev3
let acre4= nom4+ prev4
let acre5= nom5+ prev5

let ccqp=nom1+nom2+nom3+nom5
let ccqc=nom1+nom2+nom2+nom4
let ccqe=nom1+nom2+nom3+nom4+nom5
let ccqcc= ccqp+ccqc+ccqe

let vcqp=acre1+acre2+acre3+acre5
let vcqc=acre1+acre2+acre2+acre4
let vcqe=acre1+acre2+acre3+acre4+acre5
let vcqcc= vcqp+vcqc+vcqe

// 1. Cachorro-quente com purê

//- Pão
//- 1 purê de batata
//- 1 bacon
//- 1 salsicha

console.log("---------------------------------------")
console.log("CADASTRO DE PREÇOS - LANCHONETE COISA")
console.log("---------------------------------------")
console.log("Preço do pão: "+ nom1)
console.log("Preço da salsicha: "+ nom2)
console.log("Preço da batata: "+ nom3)
console.log("Preço do queijo: "+ nom4)
console.log("Preço do bacon: "+ nom5)





console.log("---------------------------------------")
console.log("CARDAPIO COMPLETO DA LANCHONETE COISA")
console.log("---------------------------------------")

console.log(" CACHORRO QUENTE COM PURE")

console.log("Ingredientes: 1 Pão + 1 Pure + 1 Bacon + 1 Salsicha")
console.log(" Preço de custo: "+ ccqp )
console.log(" Preço de venda: "+ vcqp)
console.log("---------------------------------------")

console.log(" CACHORRO QUENTE CREMOSO")

console.log("Ingredientes: 1 Pão + 1 Queijo + 2 Salsicha")
console.log(" Preço de custo: "+ ccqc )
console.log(" Preço de venda: "+ vcqc)
console.log("---------------------------------------")

console.log(" CACHORRO QUENTE ESPECIAL")

console.log("Ingredientes: 1 Pão + 1 Queijo + 1 Salsicha + 1 Bacon")
console.log(" Preço de custo: "+ ccqe )
console.log(" Preço de venda: "+ vcqe)

console.log("---------------------------------------")

console.log(" COMBO ")
console.log("Inclui os lanches: CACHORRO QUENTE COM PURE+ CACHORRO QUENTE CREMOSO+ CACHORRO QUENTE ESPECIAL")
console.log(" Preço de custo: "+ ccqcc )
console.log(" Preço de venda: "+ vcqcc)


