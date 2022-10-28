var equacaoResultado, valor, dados
const resCenter = ["res00", "res01", "res02", "res03", "res04", "res05"]
import {criarEquacoes, gerar, inserir, SelectMultiplos, SelectDistanciaQuadrada, SelectTempo, limpar, final, finalizarResultado, SelectSubmultiplos, SelectDistancia} from "./codigosFonte.js"

window.addEventListener("load", () => {
    var main = document.querySelector("main").classList.toString()
    if (main.includes("eletrodinamica")) {
        document.querySelector("#formula").addEventListener("change", formulas)
        document.querySelector("#gerar").addEventListener("click", gerarValores)
        document.querySelector("#verResultado").addEventListener("click", verResultado)
    }
})

function verResultado() {
    eletrodinamica(dados)
}

//Irá colocar as imagens com as fórmulas mostrando como elas são
function formulas() {
    var formula = document.querySelector("#formula").value
    var formulas = document.querySelector("#formulas")
    formulas.innerHTML = ""
    document.querySelector("#gerar").disabled = false
    
    if (formula == "0") {
        formulas.innerHTML = "|Q| = n ⋅ &nbsp;e"
    } else if (formula == 1) {
        criarEquacoes(["i =", "Q", "Δt"])
    } else if (formula == 2) {
        criarEquacoes(["R =", "U", "i"])
    } else if (formula == 3) {
        criarEquacoes(["R =", "&#961; ⋅ &nbsp;ℓ", "A"])
    } else if (formula == 4) {
        formulas.innerHTML = "P = U ⋅ &nbsp;i"
    } else if (formula == 5) {
        formulas.innerHTML = "P = R ⋅ &nbsp;i<sup>2</sup>"
    } else if (formula == 6) {
        criarEquacoes(["P =", "U<sup>2</sup>", "R"])
    } else {
        formulas.innerHTML = "E = P ⋅ &nbsp;Δt"
    }
    reset()
    load(formula)
}

function gerarValores() {
    var formula = document.querySelector("#formula").value
    var iniciais = []
    if (formula == 0) {
        iniciais = ["n", "Q"]
    }
    document.querySelector("#verResultado").disabled = false
    dados = gerar(iniciais)
}

//Irá adicionar tudo que é necessário para coletar as informações na ordem desejada
function load(formula) {
    res.innerHTML = ""
    if (formula == 0) {
        //Quardam as informações em arrays que serão usadas nos for
        const inputPrincipal = ["n", "Q"]
        const inputSecundario = ["n-Potencia"]
        const text = ["Número de Elétrons <strong>(n)</strong>", "Quantidade de Carga <strong>(Q)</strong>"]
        inserir(2, inputPrincipal, inputSecundario, resCenter, text, 1, res)
        SelectMultiplos(1, resCenter)
        limpar(resCenter[2])

    } else if (formula == 1) {
        //Quardam as informações em arrays que serão usadas nos for
        const inputPrincipal = ["i", "Δt", "Q"]
        const inputSecundario = ["i-Potencia"]
        const text = ["Corrente Elétrica", "Variação de Tempo", "Quantidade de Carga"]
        inserir(3, inputPrincipal, inputSecundario, resCenter, text, 1, res)
        SelectTempo(1, resCenter)
        SelectSubmultiplos(2, resCenter)

    } else if (formula == 2) {
        //Quardam as informações em arrays que serão usadas nos for
        const inputPrincipal = ["R", "U", "i"]
        const inputSecundario = ["R-Potencia", "U-Potencia", "i-Potencia"]
        const text = ["Resistência Elétrica", "Diferença de Potencial Elétrico", "Corrente Elétrica"]
        inserir(3, inputPrincipal, inputSecundario, resCenter, text, 3, res)

    } else if (formula == 3) {
        //Quardam as informações em arrays que serão usadas nos for
        const inputPrincipal = ["R", "ρ", "ℓ", "A"]
        const inputSecundario = ["R-Ptencia", "p-Potencia"]
        const text = ["Resistência Elétrica", "Resistividade", "Comprimento", "Área"]
        inserir(4, inputPrincipal, inputSecundario, resCenter, text, 2, res)
        SelectDistancia(2, resCenter)
        SelectDistanciaQuadrada(3, resCenter)

    } else if (formula == 4) {
        //Quardam as informações em arrays que serão usadas nos for
        const inputPrincipal = ["P", "U", "i"]
        const inputSecundario = ["P-Potencia", "U-Potencia", "i-Potencia"]
        const text = ["Potência Elétrica", "Diferença de Potencial Elétrico", "Corrente Elétrica"]
        inserir(3, inputPrincipal, inputSecundario, resCenter, text, 3, res)

    } else if (formula == 5) {
        //Quardam as informações em arrays que serão usadas nos for
        const inputPrincipal = ["P", "R", "i"]
        const inputSecundario = ["P-Potencia", "R-Potencia", "i-Potencia"]
        const text = ["Potência Elétrica", "Resistência Elétrica", "Corrente Elétrica"]
        inserir(3, inputPrincipal, inputSecundario, resCenter, text, 3, res)

    } else if (formula == 6) {
        //Quardam as informações em arrays que serão usadas nos for
        const inputPrincipal = ["P", "U", "R"]
        const inputSecundario = ["P-Potencia", "U-Potencia", "R-Potencia"]
        const text = ["Potência Elétrica", "Diferença de Potencial Elétrico", "Resistência Elétrica"]
        inserir(3, inputPrincipal, inputSecundario, resCenter, text, 3, res)


    } else {
        //Quardam as informações em arrays que serão usadas nos for
        const inputPrincipal = ["E", "P", "Δt"]
        const inputSecundario = ["E-Potencia", "P-Potencia"]
        const text = ["Energia Elétriica", "Potência Elétrica", "Variação de Tempo"]
        inserir(3, inputPrincipal, inputSecundario, resCenter, text, 2, res)
        SelectTempo(2, resCenter)


    }
}

//Redireciona os eventos (keyup e change) dos input e select para a função com a equação que será usada
export function eletrodinamica(dados) {
    var select = document.querySelector("#formula").value
    var dados1 = ""
    var dados2 = ""
    var dados3 = ""
    if (Array.isArray(dados)) {
        dados1 = dados[0]
        dados2 = dados[1]
        dados3 = dados[2]
    }

    if (select == 0) {
        equacao1(dados1, dados2, dados3)
    }
}

function equacao1(dados1, dados2, dados3) {
    var potenciaResultado
    var posicao = 0
    var n = document.querySelector("#n").value.replace(",", ".")
    var Q = document.querySelector("#Q").value.replace(",", ".")
    var e = 1.6
    var Q1 = Q

    var potencian = Number(document.querySelector("#n-Potencia").value)
    var potenciaQ = Number(document.querySelector("#multiplos").value)
    var potenciae = -19

    if (dados1.length != 0 && dados2.length != 0 && dados3.length != 0) {
        posicao = 1
        n = ""
        Q = ""
        for (var loop = 0; loop < 4; loop++) {
            if (dados1[loop] == "n") {
                n = dados2[loop]
                potencian = dados3[loop]
            } else if (dados1[loop] == "Q") {
                Q = dados2[loop].replace(",", ".")
                potenciaQ = dados3[loop]
            }
        }
    }

    //Caso a quantidade de carga seja negativa, deixa o valor digitado positivo
    if (Number(Q) < 0) {
        Q = - Number(Q)
    }

    if (n.length == 0 && Q.length != 0) {
        valor = (Q * 10** potenciaQ/ (e * 10** potenciae)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        potenciaResultado = finalizado[1]
        var infinity = finalizado[2]
        equacaoResultado = `n = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>C</em>`

        var parte1 = `<p>De início vamos ver qual valor nos foi dado, isso porque é importante sabermos antes o que temos para depois fazermos algo com esses dados. E esse valor se trata da quantidade de carga (Q), que equivale à ${Number(Q).toLocaleString("pt-br")}.</p>`
        
        if (Number(Q1) < 0) {
            var parte2 = `<p>Mas antes, o valor de Q (${Number(Q1).toLocaleString("pt-br")}) é negativo, porém precisamos dele positivo, contudo, para conseguir isso devemos considerar apenas o seu modúlo, que é ${Number(Q).toLocaleString("pt-br")}. Agora que sabemos dessa informação vamos montar a equação:</p>`
        } else {
            var parte2 = "<p>Agora que sabemos dessa informação vamos montar a equação:</p>"
        }
        if (potenciaQ == 0) {
            var possivelPotenciaQ = ""
            if (`${e} 10${potenciae}`.length > `${Q}`.length) {
                var parteSuperior = ""
                var parteInferior = "parteInferior"
            } else {
                var parteSuperior = "parteSuperior"
                var parteInferior = ""
            }
        } else {
            var possivelPotenciaQ = `⋅ 10<sup>${potenciaQ}</sup> `
            if (`${e} 10${potenciae}`.length > `${Number(Q).toLocaleString("pt-br")} 10${potenciaQ}`.length) {
                var parteSuperior = ""
                var parteInferior = "parteInferior"
            } else {
                var parteSuperior = "parteSuperior"
                var parteInferior = ""
            }
        }
        var equacao1 = criarEquacoes("block", `${Number(Q).toLocaleString("pt-br")} ${possivelPotenciaQ}= n ⋅ ${e.toLocaleString("pt-br")} ⋅ 10<sup>${potenciae}</sup>`)
        var parte3 = `<p>Para podermos efetuar os cálculos, primerio devemos passar os valores da carga elétrica fundamental para o lado oposto, resultando em:</p>`

        var equacao2 = criarEquacoes("flex", ["n = ", parteSuperior, `${Number(Q).toLocaleString("pt-br")} ${possivelPotenciaQ}`, parteInferior, `${e.toLocaleString("pt-br")} ⋅ 10<sup>${potenciae}</sup>`])

        if (potenciaQ != 0) {
            var parte4 = `<p>Com tudo pronto, resolvemos. E para isso é apenas necessário dividir "Q" por "e", tendo como resultado: ${(Q/e).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})}. E quanto as potências, por se tratar de uma divisão devemos subtrair a potência de "e" da potência de "Q" mantendo a base que é 10, ficando:</p>`
            var equacao3 = criarEquacoes("block", `10<sup>${potenciaQ}</sup> ÷ 10<sup>${potenciae}</sup> &#x21D2; 10<sup>${potenciaQ} - (${potenciae})</sup> &#x21D2; 10<sup>${potenciaQ - potenciae}</sup>`)
            var potenciaFinal = ` ⋅ 10<sup>${potenciaQ - potenciae}</sup>`
        } else {
            var equacao3 = ""
            var parte4 = `<p>Com tudo pronto, resolvemos. E para isso é apenas necessário dividir "Q" por "e", tendo como resultado: ${(Q/e).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})}. E quanto a potência de "e", passamos para o lado superior apenas invertendo o sinal de "-" para "+", mas não temos a necessidade de escrever.`
            var potenciaFinal = ` ⋅ 10<sup>${-potenciae}</sup>`
        }
        var parte5 = "<p>Quase pronto:</p>"
        var equacao4 = criarEquacoes("block", `n = ${(Q/e).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})}${potenciaFinal}`)
        var parte6 = "<p>Para finalizar, colocamos em notação científica, ficando dessa maneira:</p>"
        var explicacao = `${parte1}${parte2}${equacao1}${parte3}${equacao2}${parte4}${equacao3}${parte5}${equacao4}${parte6}`

    } else if (Q.length == 0 && n.length != 0) {
        valor = (n * 10** potencian * e * 10** potenciae).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        potenciaResultado = finalizado[1]
        var infinity = finalizado[2]
        equacaoResultado = `Q = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>C</em>`

        if (potencian > 0) {
            var parte1Complementar = `, com potência valendo ${potencian}.`
        } else {
            var parte1Complementar = "."
        }
        var parte1 = `<p>Primeiramente, vamos ver qual valor nós temos. E o valor dado foi o Número de Elétrons, que equivale à ${n.toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})}${parte1Complementar}</p>`
        var parte2 = `<p>Agora em mãos, vamos escrever a fórmula com os dados obtidos:</p>`
        if (potencian == 0) {
            var potencianFinal = ""
            var parte4 = `<p>E para a potência, apenas a repitimos, ou seja, não mexemos nela.</p>`
            var equacao2 = ""
        } else {
            var potencianFinal = ` ⋅ 10<sup>${potencian}</sup>`
            var parte4 = `<p>Para as potências, somamos os seus expoentes mantendo a base 10:</p>`
            var equacao2 = criarEquacoes("block", `10<sup>${potencian}</sup> ⋅ 10<sup>${potenciae}</sup> &#x21D2; 10<sup>${potencian} + (${potenciae})</sup> &#x21D2; ${potenciaResultado.replace("⋅ ", "")}`)
        }
        var equacao1 = criarEquacoes("block", `Q = ${n}${potencianFinal} ⋅ ${e.toLocaleString("pt-br")} ⋅ 10<sup>${potenciae}</sup>`)
        var parte3 = `<p>Com a equação montada, vamos resolvê-la. Como se trata de apenas uma simples operação de multiplicação, primeiro começamos com o "n" e o "e", tendo como resultado: ${(n * e).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})}.</p>`
        var parte5 = "<p>Por fim, colocamos o valor obtido em notação científica caso não esteja, e obtemos o seguinte resultado:</p>"

        var explicacao = `${parte1}${parte2}${equacao1}${parte3}${parte4}${equacao2}${parte5}`
        if (Number(n) < 0 || potencian < 0) {
            equacaoResultado = "O Número de Elétrons (n) e/ou a sua potência não podem ser negativo."
            explicacao = ""
        }

    } else {
        equacaoResultado = ""
    }
    function criarEquacoes(tipo, valores) {
        if (tipo == "block") {
            var block = `<div class="block">${valores}</div>`
            return block

        } else {
            var flex =`<div class="flex"><div class="encontrarValor">${valores[0]}</div><div class="fracao"><div class="${valores[1]}">${valores[2]}</div><div class="${valores[3]}">${valores[4]}</div></div></div>`
            return flex
        }
    }
    final(equacaoResultado, valor, posicao, infinity, explicacao)
}

function reset() {
    document.querySelector(".respostas").innerHTML = ""
}