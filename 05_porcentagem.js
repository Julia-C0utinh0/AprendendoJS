// Aula 05: Porcentagem 

let prompt = require("prompt-sync" )()

let valor= parseFloat ( prompt ("Digite o valor: "))
let desconto= parseFloat ( prompt ("Qual a porcentagem do desconto: "))
desconto= desconto/100
let total= valor * desconto
let valordesconto= valor -  total
// se quiser ser um acrescimo tipo juros pode substituir vai ser valor + total

console.log("O desconto de "+ valor+" é "+ total+ " logo o valor com desconto é "+ valordesconto)