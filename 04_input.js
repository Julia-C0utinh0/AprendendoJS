// Aula 04: INPUT
let prompt = require("prompt-sync" )()
let nome = prompt("Olá, digite seu nome: ")
let sobrenome = prompt("Olá, digite seu sobrenome: ")
let idade = prompt("Olá, digite sua idade: ")
let nomecompleto= nome+" "+sobrenome+" "
console.log("Seja bem vindo(a):"+ nomecompleto+ "voce tem"+" "+ idade+ " anos XD")

let nom = prompt("digite o nome do produto: ")
let preco = prompt("digite o preço de " + nom)
let nom2 = prompt("digite o nome de outro produto: ")
let preco2 = prompt("digite o preço de " + nom2)
console.log("--------Relatório------")
console.log(nom+" - "+preco)
console.log(nom2+" - "+preco2)

