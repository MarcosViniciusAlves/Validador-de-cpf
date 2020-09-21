const cpf = document.querySelector("#cpf");

const botaoDeValidar = document.querySelector("#validarCpf");

const resultado = document.querySelector("#resultado");

//escuta evento de clique do botão de validar o cpf.
botaoDeValidar.addEventListener("click",(e)=>{
    e.preventDefault();
    
    //referência a função que separa as letras do cpf e remove pontos e o traço.
    const letrasSeparadas = separadorDeLetrasCpf(cpf.value);

    //verifica se o tamanho do cpf é compativel.
    if(letrasSeparadas.length != 10){

        resultado.innerText = "Invalido";
    
    }

    //coloca string retornada pela função de separar letras em numeros.
    const stringEmNumero = colocarStringEmNumero(letrasSeparadas);
    
    //pega o primeiro digito verificador do cpf.
    const digitoVerificadorUm = pegaPrimeiroDigitoVerificador(stringEmNumero);
    
    //soma os números do primeiro digito verificador.
    const somaOsNumerosDosDigitos = somaNumerosDigitosVerificadores(digitoVerificadorUm,2);
    
    //faz a divisão e avalia o resultado segundo as regras para validar um cpf.
    const primeiroDigitoVerificador = dividePorOnze(somaOsNumerosDosDigitos);
    
    //pega o segundo digito verificador do cpf.
    const segundoDigitoVerificador = pegaSegundoDigitoVerificador(stringEmNumero,primeiroDigitoVerificador);
    
    //soma os números do segundo digito verificador.
    const somaDigitoVerificadorDois = somaNumerosDigitosVerificadores(segundoDigitoVerificador,0);
    
    //faz a divisão e avalia o resultado segundo as regras para validar um cpf.
    const resultadoDoSegundoDigitoVerificador = dividePorOnze(somaDigitoVerificadorDois);
    
    //faz a verificação dos digitos do cpf e valida o cpf.
    const verificarDigito = verificaDigitos(primeiroDigitoVerificador,resultadoDoSegundoDigitoVerificador,pegaOsUltimosDoisDigitos(cpf.value));

    if(verificarDigito === true){

        resultado.innerText = "Valido";
    
    }else{
    
        resultado.innerText = "Invalido";
    
    }

})

//pega os últimos 2 digitos do array do cpf,ou seja , os 2 digitos verificadores.
function pegaOsUltimosDoisDigitos (cpf) {

    const digito1 = cpf[cpf.length - 2]
    const digito2 = cpf[cpf.length - 1]

    return [Number(digito1) , Number(digito2)]
}

//função que separa as letras do cpf e remove . e - , recebe um string e retorna um array.
function separadorDeLetrasCpf (cpf) {
    arraiDeChars = cpf.split("");
    
    [digitoUm,digitoDois,digitoTres,,digitoQuatro,digitoCinco,digitoSeis,,digitoSete,digitoOito,digitoNove,,digitoVerificadorUm , digitoVerificadorDois] = arraiDeChars;
    
    const stringDeNumeros = [digitoUm,digitoDois,digitoTres,digitoQuatro,digitoCinco,digitoSeis,digitoSete,digitoOito,digitoNove,digitoVerificadorUm, digitoVerificadorDois];

    return stringDeNumeros;
}

//coloca uma string em numero , recebe um array de letras e retorna um array de numeros.
function colocarStringEmNumero (stringMandada) {
    numeros = stringMandada;
    
    for(let numero in numeros){numeros[numero] = Number(numeros[numero]);}
    return numeros;
}

//pega o primeiro digito verificador do cpf , recebe um array de numeros e retorna um array de numeros também.
function pegaPrimeiroDigitoVerificador(numeros) {
    const numerosParaAMultiplicacao = [10,9,8,7,6,5,4,3,2];
    
    const novoArrai = [];
    
    for(let i = 0;i < numeros.length ;i++){novoArrai.push(numeros[i]*numerosParaAMultiplicacao[i]);}
    
    return novoArrai;
}

//soma os digitos verificadores e retorna a soma deles , recebe um array de numeros e quantos digitos verificadores faltam , retorna um number.
function somaNumerosDigitosVerificadores(arraiDeNumeros,digitosVerificadores){
    let acumulador = 0;
    
    for (let i = 0; i < arraiDeNumeros.length - digitosVerificadores;i++) {
    
        acumulador += arraiDeNumeros[i];
    
    }

    return acumulador;
}

//faz uma divisão de um number por 11 e retorna o valor dessa divisão , se o resultado for 10 ele retorna 0,recebe um numero e retorna outro numero.
function dividePorOnze (numero) {
    const tamanhoDoCpf = 11;
    
    let resultado = numero % tamanhoDoCpf;
    resultado = tamanhoDoCpf - resultado;

    if (resultado < 0) resultado *= -1;

    if(resultado >= 10) return 0;

    else return resultado;
}

/**função que auxilia para pegar o segundo digito verificador , essa função remove 2 elementos de um array e adiciona outro no lugar , recebe um array
 * de numeros e um digito verificador , e retorna um novo array de numeros.
*/
function funcaoAuxiliadoraParaOSegundoDigito (numero,digitoVerificador) {
    const numerosDois = numero;
    
    numerosDois.pop();
    
    numerosDois.pop();
    
    numerosDois.push(digitoVerificador);
    
    return numerosDois;
}

//pega o segundo digito verificador do cpf , recebe um array de numeros e o primeiro digito verificador , retorna um novo array de numeros.
function pegaSegundoDigitoVerificador (numeros,digitoVerificador) {
    const numerosParaAMultiplicacao = [11,10,9,8,7,6,5,4,3,2];
    
    let numeroDois = funcaoAuxiliadoraParaOSegundoDigito(numeros,digitoVerificador);

    const novoArrai=[];
    
    for(let i = 0;i < numeroDois.length ; i++){
    
        novoArrai.push(numeroDois[i] * numerosParaAMultiplicacao[i]);
    }
    return novoArrai;
}

//avalia os digitos verificadores com base no array original de numeros , recebe 2 digitos verificadores e um array de numeros.
function verificaDigitos(primeiro,segundo,arraiOriginal){
    const digitoUmDoArrai = arraiOriginal[0];

    const digitoDoisDoArrai = arraiOriginal[1];

    if(primeiro === digitoUmDoArrai && digitoDoisDoArrai === segundo){
    
        return true;
    
    }else{
    
        return false;
    
    }
}