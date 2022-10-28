import {eletricidade} from "./eletricidade.js"
import {eletrodinamica} from "./eletrodinamica.js"
import {energiaPotencial} from "./energiaPotencial.js"
var valores = document.querySelector(".valores")
var area = document.querySelector("#formula").value
var comecar, escolha, potenciaPrint, respostas, infinity

if (area == "eletricidade") {
    comecar = eletricidade
} else if (area == "eletrodinamica") {
    comecar = eletrodinamica
} else if (area == "energiaPotencial") {
    comecar = energiaPotencial
}

export function criarEquacoes(valores, quantidade) {
    if (quantidade == 2) {
        var formulas2 = document.querySelector("#formulas2")
        formulas2.innerHTML = ""
        var divFlex = document.createElement("div")
        divFlex.setAttribute("class", "flex")
        var encontrarValor = document.createElement("div")
        encontrarValor.innerHTML = valores[0]
        var fracao = document.createElement("div")
        fracao.setAttribute("class", "fracao")
        var parteSuperior = document.createElement("div")
        parteSuperior.innerHTML = valores[1]
        var parteInferior = document.createElement("div")
        parteInferior.setAttribute("class", "parteInferior")
        parteInferior.innerHTML = valores[2]

        fracao.appendChild(parteSuperior)
        fracao.appendChild(parteInferior)
        divFlex.appendChild(encontrarValor)
        divFlex.appendChild(fracao)
        formulas2.appendChild(divFlex)
        
    } else {
        var formulas = document.querySelector("#formulas")
        formulas.innerHTML = ""
        var divFlex = document.createElement("div")
        divFlex.setAttribute("class", "flex")
        var encontrarValor = document.createElement("div")
        encontrarValor.innerHTML = valores[0]
        var fracao = document.createElement("div")
        fracao.setAttribute("class", "fracao")
        var parteSuperior = document.createElement("div")
        parteSuperior.innerHTML = valores[1]
        var parteInferior = document.createElement("div")
        parteInferior.setAttribute("class", "parteInferior")
        parteInferior.innerHTML = valores[2]

        fracao.appendChild(parteSuperior)
        fracao.appendChild(parteInferior)
        divFlex.appendChild(encontrarValor)
        divFlex.appendChild(fracao)
        formulas.appendChild(divFlex)
    }
}

export function gerar(iniciais) {
    valores.innerHTML = ""
    var cargaPositiva = ["daC", "hC", "kC", " 10<sup>4</sup>", " 10<sup>5</sup>", "MC", " 10<sup>7</sup>", " 10<sup>8</sup>", "GC", " 10<sup>10</sup>", " 10<sup>11</sup>", "TC"]
    var cargaNegativa = ["dC", "cC", "mC", " 10<sup>-4</sup>", " 10<sup>-5</sup>", "μC", " 10<sup>-7</sup>", " 10<sup>-8</sup>", "nC", " 10<sup>-10</sup>", " 10<sup>-11</sup>", "pC"]
    var distancia = ["km", "hm", "dam", "m", "dm", "cm", "mm"]
    var massa = ["kg", "hg", "dag", "g", "dg", "cg", "mg"]
    var constantek = [9, 1.1, 3.6]
    var potenciaK = [" 10<sup>9</sup>", " 10<sup>8</sup>", " 10<sup>8</sup>"]
    var dado1 = []
    var dado2 = []
    var dado3 = []
    var sigla, numero, potencia

    geradorDeValores(iniciais)
    function geradorDeValores(iniciais) {
        sigla = random(0, iniciais.length - 1, iniciais.length - 1, 1)
        numero = random (-100, 100, 4)
        potencia = random(-12, 12, 4)
        verificadorDeValores(iniciais, sigla)
    }

    function verificadorDeValores(iniciais, sigla) {
        if (iniciais.includes("K") && area == "eletricidade") {
            var posicao = iniciais.indexOf("K")
            if (!sigla.includes(posicao)) {
                geradorDeValores(iniciais)
            }
        }
    }

    for (let x = 0; x < iniciais.length - 1; x++) {
        potenciaPrint = ` 10<sup>${potencia[x]}</sup>`
        escolha = random(0, 11, 1)
        if ((iniciais[sigla[x]] == "Q" && area == "eletricidade") || (iniciais[sigla[x]] == "q" && area == "eletricidade")) {
            potenciaPrint = cargaNegativa[escolha]
        } else if (iniciais[sigla[x]] == "d") {
            escolha = random(0, 6, 1)
            numero[x] = random(0, 100, 1)
            potenciaPrint = distancia[escolha]
        } else if (iniciais[sigla[x]] == "k" && area == "eletricidade") {
            escolha = random(0, 2, 1)
            numero[x] = constantek[escolha]
            potenciaPrint = potenciaK[escolha]
        } else if (iniciais[sigla[x]] == "Q") {
            numero[x] = (random(0, 320, 1) * 1.6).toLocaleString("es-US")
            potenciaPrint = cargaPositiva[escolha]
        } else if (iniciais[sigla[x]] == "n") {
            numero[x] = random(0, 100, 1)
            potenciaPrint = ` 10<sup>${Number(escolha + 1)}</sup>`
        } else if (iniciais[sigla[x]] == "m") {
            escolha = random(0, 6, 1)
            numero[x] = random(0, 100, 1)
            potenciaPrint = massa[escolha]
        }
        var impressao = `${iniciais[sigla[x]]} = ${Number(numero[x]).toLocaleString("pt-br")}${potenciaPrint}`
        var div = document.createElement("div")
        div.setAttribute("id", `valor${x}`)
        div.innerHTML = impressao.trim()
        valores.appendChild(div)
        potenciaPrint = potenciaPrint.replace(" 10<sup>", "")
        potenciaPrint = potenciaPrint.replace("</sup>", "")
        dado1.push(iniciais[sigla[x]])
        dado2.push((numero[x]))
        dado3.push(potenciaPrint)
    }
    return [dado1, dado2.map((valor) => valor.toString()), converter(dado3)]
}

//Converte os dados do array "dado3" em valores númericos quando necessário
function converter(dado3) {
    return dado3.map((valor) => {
        if (valor == "km") {
            valor = 3
        } else if (valor == "hm") {
            valor = 2
        } else if (valor == "dam") {
            valor = 1
        } else if (valor == "m") {
            valor = 0
        } else if (valor == "dm") {
            valor = -1
        } else if (valor == "cm") {
            valor = -2
        } else if (valor == "mm") {
            valor = -3
        }

        if (valor == "TC") {
            valor = 12
        } else if (valor == "GC") {
            valor = 9
        } else if (valor == "MC") {
            valor = 6
        } else if (valor == "kC") {
            valor = 3
        } else if (valor == "hC") {
            valor = 2
        } else if (valor == "daC") {
            valor = 1
        }

        if (valor == "dC") {
            valor = -1
        } else if (valor == "cC") {
            valor = -2
        } else if (valor == "mC") {
            valor = -3
        } else if (valor == "μC") {
            valor = -6
        } else if (valor == "nC") {
            valor = -9
        } else if (valor == "pC") {
            valor = -12
        }

        if (valor == "kg") {
            valor = 0
        } else if (valor == "hg") {
            valor = -1
        } else if (valor == "dag") {
            valor = -2
        } else if (valor == "g") {
            valor = -3
        } else if (valor == "dg") {
            valor = -4
        } else if (valor == "cg") {
            valor = -5
        } else if (valor == "mg") {
            valor = -6
        }
        return Number(valor)
    })
}

//Gera um valor aleatório dentre os valores escolhidos
export function randomSimple(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

//Gera e armazena um conjunto de valores determinados em um array
function random(min, max, quant, repetir) {
    var array = []
    for (let x = 0; x < quant; x++) {
        array.push(Math.floor(Math.random() * (max- min +1)) + min)
        if (repetir == 1) {
            array = [...new Set(array)]
        }
        if (array.length == quant) {
            break
        } else {
            x--
        }
    }
    return array
}

//Adiciona os label e input com as suas respectivas configurações
export function inserir(inPrincQuant, inputPrincipal, inputSecundario, resCenter, text, inSecunQuant, res) {
    var form = document.createElement("form")
    form.setAttribute("class", "form")

    for (let x = 0; x < inPrincQuant; x++) {
        var texto = `${text[x]}`
        var label = document.createElement("label")
        label.setAttribute("for", inputPrincipal[x])
        label.innerHTML = texto
        form.appendChild(label)

        var resAll = document.createElement("div")
        resAll.setAttribute("class", resCenter[x])
        resAll.classList.add("res")
        var principal = document.createElement("input")
        principal.setAttribute("id", inputPrincipal[x])
        principal.setAttribute("class", "inputPrincipal")
        principal.setAttribute("autocomplete", "off")
        principal.addEventListener("keyup", comecar)
        principal.setAttribute("placeholder", "Digite um valor")
        principal.setAttribute("maxlength", "20")
        if (inputPrincipal[x] == "K") {
            principal.setAttribute("placeholder", "9") 
        }
        resAll.appendChild(principal)

        //Adiciona os input onde serão colocados os números da potência de base 10
        if (x < inSecunQuant) {
            var secundario = document.createElement("input")
            secundario.setAttribute("id", inputSecundario[x])
            secundario.setAttribute("class", "inputSecundario")
            secundario.setAttribute("autocomplete", "off")
            secundario.addEventListener("keyup", comecar)
            secundario.setAttribute("maxlength", "10")
            if (inputSecundario[x] == "K-Potencia") {
               secundario.setAttribute("placeholder", "10^(9)")
            }
            resAll.appendChild(secundario)
        }
        form.appendChild(resAll)
    }
    res.appendChild(form)
}

//Cria as options referentes aos multiplos
export function SelectMultiplos(posicao, resCenter) {
    var selectMultiplos = document.createElement("select")
    selectMultiplos.setAttribute("id", "multiplos")
    selectMultiplos.addEventListener("change", comecar)
    var valores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    var multiplosSigla = ["none | 10^0", "da - deca | 10^1", "h - hecto | 10^2", "k - quilo | 10^3", "10^4", "10^5", "M - mega | 10^6", "10^7", "10^8", "G - giga | 10^9", "10^10", "10^11", "T - tera | 10^12"]

    for (let x = 0; x < 13; x++) {
        var option = document.createElement("option")
        option.setAttribute("value", valores[x])
        option.text = (multiplosSigla[x])
        selectMultiplos.appendChild(option)
    }
    var divPosicao = document.querySelector(`.${resCenter[posicao]}`)
    divPosicao.appendChild(selectMultiplos)
}

//Cria as options referentes aos submultiplos
export function SelectSubmultiplos(posicao, resCenter, nomeacao) {
    //Quarda as informações dos submultiplos em arrays
    var selectSubmultiplos = document.createElement("select")
    selectSubmultiplos.setAttribute("id", "submultiplo_q")
    selectSubmultiplos.addEventListener("change", comecar)
    var valores = [0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12]
    var submultiplosSigla = ["none | 10^(0)", "d - deci | 10^(-1)", "c - centi | 10^(-2)", "m - mili | 10^(-3)", "10^(-4)", "10^(-5)", "μ - micro | 10^(-6)", "10^(-7)", "10^(-8)", "n - nano | 10^(-9)", "10^(-10)", "10^(-11)", "p - pico | 10^(-12)"]

    for (let x = 0; x < 13; x++) {
        var option = document.createElement("option")
        option.setAttribute("value", valores[x])
        option.text = (submultiplosSigla[x])
        selectSubmultiplos.appendChild(option)
    }
    if (nomeacao == 1) {
        selectSubmultiplos.setAttribute("id", "submultiplo_Q")
    }
    var divPosicao = document.querySelector(`.${resCenter[posicao]}`)
    divPosicao.appendChild(selectSubmultiplos)
}

//Cria as options referentes aos multiplos e submultiplos
export function SelectMulti_Sub(posicao, resCenter) {
    var selectMulti_Sub = document.createElement("select")
    selectMulti_Sub.setAttribute("id", "multi_sub")
    selectMulti_Sub.addEventListener("change", comecar)
    var valores = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12]
    var multiplosSigla = ["T - tera | 10^12", "10^11", "10^10", "G - giga | 10^9", "10^8", "10^7", "M - mega | 10^6", "10^5", "10^4", "k - quilo | 10^3", "h - hecto | 10^2", "da - deca | 10^1", "none | 10^0", "d - deci | 10^(-1)", "c - centi | 10^(-2)", "m - mili | 10^(-3)", "10^(-4)", "10^(-5)", "μ - micro | 10^(-6)", "10^(-7)", "10^(-8)", "n - nano | 10^(-9)", "10^(-10)", "10^(-11)", "p - pico | 10^(-12)"]

    for (let x = 0; x < 25; x++) {
        var option = document.createElement("option")
        option.setAttribute("value", valores[x])
        option.text = (multiplosSigla[x])
        if (selectMulti_Sub[x] == "none | 10^(0)") {
            option.setAttribute("selected", "")
        }
        selectMulti_Sub.appendChild(option)
    }
    var divPosicao = document.querySelector(`.${resCenter[posicao]}`)
    divPosicao.appendChild(selectMulti_Sub)
}

//Cria os options do select de distancia
export function SelectDistancia(posicao, resCenter) {
    //Quarda as informações das distâncias
    var selectDistancias = document.createElement("select")
    selectDistancias.setAttribute("id", "distancia")
    selectDistancias.addEventListener("change", comecar)
    var valores = [3, 2, 1, 0, -1, -2, -3]
    var distanciasSigla = ["km | 10^(3)", "hm | 10^(2)", "dam | 10^(1)", "m | 10^(0)", "dm | 10^(-1)", "cm | 10^(-2)", "mm | 10^(-3)"]

    for (let x = 0; x < 7; x++) {
        var option = document.createElement("option")
        option.setAttribute("value", valores[x])
        option.text = (distanciasSigla[x])
        if (distanciasSigla[x] == "m | 10^(0)") {
            option.setAttribute("selected", "")
        }
        selectDistancias.appendChild(option)
    }
    var divPosicao = document.querySelector(`.${resCenter[posicao]}`)
    divPosicao.appendChild(selectDistancias)
}

//Cria os options do select de distancia quadrada
export function SelectDistanciaQuadrada(posicao, resCenter) {
    //Quarda as informações das distâncias
    var selectDistancias = document.createElement("select")
    selectDistancias.setAttribute("id", "distancia")
    selectDistancias.addEventListener("change", comecar)
    var valores = [6, 4, 2, 0, -2, -4, -6]
    var distanciasSigla = ["km^2 | 10^(6)", "hm^2 | 10^(4)", "dam^2 | 10^(2)", "m^2 | 10^(0)", "dm^2 | 10^(-2)", "cm^2 | 10^(-4)", "mm^2 | 10^(-6)"]

    for (let x = 0; x < 7; x++) {
        var option = document.createElement("option")
        option.setAttribute("value", valores[x])
        option.text = (distanciasSigla[x])
        if (distanciasSigla[x] == "m^2 | 10^(0)") {
            option.setAttribute("selected", "")
        }
        selectDistancias.appendChild(option)
    }
    var divPosicao = document.querySelector(`.${resCenter[posicao]}`)
    divPosicao.appendChild(selectDistancias)
}

//Cria os options do select de massa
export function SelectMassa(posicao, resCenter) {
    //Quarda as informações das massas
    var selectMassas = document.createElement("select")
    selectMassas.setAttribute("id", "massa")
    selectMassas.addEventListener("change", comecar)
    var valores = [0, -1, -2, -3, -4, -5, -6]
    var massasSigla = ["kg", "hg", "dag", "g", "dg", "cg", "mg"]

    for (let x = 0; x < 7; x++) {
        var option = document.createElement("option")
        option.setAttribute("value", valores[x])
        option.text = (massasSigla[x])
        selectMassas.appendChild(option)
    }
    var divPosicao = document.querySelector(`.${resCenter[posicao]}`)
    divPosicao.appendChild(selectMassas)
}

//Cria os options do select de tempo
export function SelectTempo(posicao, resCenter) {
    //Quarda as informações dos tempos
    var selectTempos = document.createElement("select")
    selectTempos.setAttribute("id", "tempo")
    selectTempos.addEventListener("change", comecar)
    var valores  = [3600, 60, 0, -3, -6, -9, -12]
    var temposSigla = ["hora", "minuto", "segundo", "milisegundo", "microsegundo", "nanosegundo", "picosegundo"]
    for (var loop = 0; loop < 7; loop++) {
        var option = document.createElement("option")
        option.setAttribute("value", valores[loop])
        option.text = temposSigla[loop]
        if (temposSigla[loop] == "segundo") {
            option.setAttribute("selected", "")
        }
        selectTempos.appendChild(option)
    }
    var divPosicao = document.querySelector(`.${resCenter[posicao]}`)
    divPosicao.appendChild(selectTempos)
}

//Adiciona o botão de Limpar
export function limpar(posicao) {
    var form = document.querySelector(".form")
    var buttonLimpar = document.createElement("input")
    buttonLimpar.setAttribute("type", "reset")
    buttonLimpar.setAttribute("id", "limpar")
    buttonLimpar.setAttribute("value", "Limpar")
    buttonLimpar.addEventListener("click", reset)
    var resAll = document.createElement("div")
    resAll.setAttribute("class", posicao)
    resAll.appendChild(buttonLimpar)
    form.appendChild(resAll)
}

function reset() {
    document.querySelector(".respostas").innerHTML = ""
}

//Faz os retoques finais no valor encontrado, extraindo o resultado da potência e verificando demais assuntos
export function finalizarResultado (valor) {
    var indice = valor.indexOf("e") + 1
    var potencia = valor.toString().slice(indice, indice + 10)
    var potenciaResultado = ` ⋅ 10<sup>${potencia}</sup>`
    if (valor == Infinity) {
        infinity = Infinity
        potenciaResultado = ""
    } else {
        infinity = 1
    }
    if (potencia.includes("+")) {
        potenciaResultado = ` ⋅ 10<sup>${potencia.slice(1)}</sup>`
    }
    if (potencia == 0) {
        potenciaResultado = ""
    }
    valor = Number(valor.slice(0, indice - 1))
    return [valor, potenciaResultado, infinity]
}

//Responsável pelos últimos processos que as informações irão passar antes de serem exibidas
export function final(equacaoResultado, valor, posicao, infinity, explicacao) {
    if (isNaN(valor)) {
        equacaoResultado = ""
    }
    if (infinity === Infinity) {
        equacaoResultado = "Esses valores tem como resultado um número infinito."
    }
    var styleResultado = document.createElement("div")
    styleResultado.setAttribute("class", "styleResultado")
    if (posicao == 0) {
        respostas = document.querySelector(".respostas")
    } else {
        respostas = document.querySelector(".resultadoVer")
    }
    respostas.innerHTML = ""
    var resultado = document.createElement("div")
    resultado.setAttribute("class", "resultado")
    var explicacaoPronta = document.createElement("div")
    explicacaoPronta.setAttribute("class", "explicacao")
    explicacaoPronta.innerHTML = explicacao
    if (equacaoResultado == "") {
        equacaoResultado =  "<p>Digite todos os dados (números) que são necessários para ser possível encontrar o valor que procura, caso contrário nenhum resultado aparecerá além desta mensagem.<p>"
    } else if (explicacao == undefined) {
        explicacao = ""
    } else {
        resultado.appendChild(explicacaoPronta)
    }
    styleResultado.innerHTML = equacaoResultado
    resultado.appendChild(styleResultado)
    respostas.appendChild(resultado)
}