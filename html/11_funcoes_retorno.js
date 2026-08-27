//Aula 11: Função com retorno

somar(9,3)


// Funções com retorno E parâmetros

function somar(n1,n2){
    let some= n1+n2
    console.log(`A soma de ${n1} e ${n2} é ${some}`)
}


//Funções vazias (void)
//Interpolação (`{}`)
somarnum()
numeropositivo()
somar()

let prompt = require("prompt-sync" )()

function somarnum(){
    let n1= 5
    let n2= 7
    let some= n1+n2
    console.log(`A soma de ${n1} e ${n2} é ${some}`)
}



function numeropositivo(){
    let n1 = 4
    let resposta= "negativo"



    if(n1 >= 0){
        resposta="positivo"
    }


    
    if(n1 >= 0 ){
        console.log("O número "+n1+" é positivo ")
    }else{
        console.log("O número "+n1+" é negativo ")
    }
    console.log(`O número ${n1} é ${resposta}`)
     
}