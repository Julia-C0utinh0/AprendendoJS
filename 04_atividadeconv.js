let prompt = require("prompt-sync" )()

// let data = "1995-10-14"
//let data_formatada = data_formatada.split("-").reverse().join("/")


let numero1 = parseInt (prompt ("Digite o ano que voce nasceu: "))
let numero2= 2026
let soma= numero2-numero1

console.log("Voce tem "+ soma)

// atividade 2

let numero3 = parseInt (prompt ("Digite a primeira nota: "))
let numero4 = parseInt (prompt ("Digite a segunta nota: "))
let numero5 = parseInt (prompt ("Digite a terceira nota: "))

let soma1= numero3+numero4+numero5
let media= soma1/3

console.log("A media das notas é "+ media)

// atividade 3

let nom = prompt("digite o nome do produto: ")
let preco = prompt("digite o preço de " + nom)
let quant = prompt("digite a quantidade de estoque do produto: ")
let resul= preco*quant

console.log("--------Relatório------")

console.log(nom+" - Faturamento: "+resul)

