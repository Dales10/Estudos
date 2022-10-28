var equacaoResultado, valor, dados, infinity, tipoDeFormula
const resCenter = ["res00", "res01", "res02", "res03", "res04", "res05"]
import {criarEquacoes, gerar, randomSimple, inserir, SelectSubmultiplos, SelectDistancia, limpar, final, finalizarResultado} from "./codigosFonte.js"

window.addEventListener("load", () => {
    var main = document.querySelector(".main").classList.toString()
    if (main.includes("eletricidade")) {
        document.querySelector("#formula").addEventListener("change", formulas)
        document.querySelector("#gerar").addEventListener("click", gerarValores)
        document.querySelector("#verResultado").addEventListener("click", verResultado)
    }
})

function verResultado() {
    eletricidade(dados)
}

//Irá colocar as imagens com as fórmulas mostrando como elas são
function formulas() {
    var formula = document.querySelector("#formula").value
    document.querySelector("#gerar").disabled = false

    if (formula == 0) {
        criarEquacoes(["F<sub>e</sub> = K", "|q<sub>1</sub>| ⋅ &nbsp;|q<sub>2</sub>|", "d<sup>2</sup>"])
    } else if (formula == 1) {
        criarEquacoes(["E =", "F<sub>e</sub>", "|q|"])
    } else if (formula == 2) {
        criarEquacoes(["E =", "K ⋅ &nbsp;|Q|", "d<sup>2</sup>"])
    } else if (formula == 3) {
        criarEquacoes(["V =", "E<sub>pe</sub>", "q"])
    } else if (formula == 4) {
        criarEquacoes(["V =", "K ⋅ &nbsp;Q", "d"])
    } else if (formula == 5) {
        criarEquacoes(["E<sub>pe</sub> =", "K ⋅ &nbsp;Q ⋅ &nbsp;q", "d"])
    } else if (formula == 6) {
        document.querySelector("#formulas").innerHTML = "τ<sub>AB</sub> = q ⋅ &nbsp;U<sub>AB</sub>"
        document.querySelector("#ou").innerHTML = "ou"
        document.querySelector("#formulas2").innerHTML = "τ<sub>AB</sub> = q ⋅ &nbsp;(V<sub>A</sub> - V<sub>B</sub>)"
    } else {
        criarEquacoes(["E =", "U", "d"])
        document.querySelector("#ou").innerHTML = "ou"
        criarEquacoes(["E =", "(V<sub>a</sub> - V<sub>b</sub>)", "d"], 2)
    }
    reset()
    load(formula)
}

function gerarValores() {
    var formula = document.querySelector("#formula").value
    var iniciais = []
    var determinar = randomSimple(0, 1)
    if (formula == 0) {
        iniciais = ["Fe", "k", "Q", "q", "d"]
    } else if (formula == 1) {
        iniciais = ["E", "Fe", "q"]
    } else if (formula == 2) {
        iniciais = ["E", "k", "d", "Q"]
    } else if (formula == 3) {
        iniciais = ["V", "Epe", "q"]
    } else if (formula == 4) {
        iniciais = ["V", "k", "Q", "d"]
    } else if (formula == 5) {
        iniciais = ["Epe", "k", "Q", "q", "d"]
    } else if (formula == 6) {
        if (determinar == 0) {
            iniciais = ["tau", "U", "q"]
        } else {
            iniciais = ["tau", "Va", "Vb", "q"]
        }
    } else {
        if (determinar == 0) {
            iniciais = ["E", "U", "d"]
        } else {
            iniciais = ["E", "Va", "Vb", "d"]
        }
    }
    document.querySelector("#verResultado").disabled = false
    dados = gerar(iniciais)
}

//Irá adicionar tudo que é necessário para coletar as informações na ordem desejada
function load(formula) {
    res.innerHTML = ""
    if (formula == 0) {
        //Quardam as informações em arrays que serão usadas nos for
        const inputPrincipal = ["Fe", "k", "Q", "q", "d"]
        const inputSecundario = ["Fe-Potencia", "k-Potencia"]
        const text = ["Força Elétrica <strong>(F<sub>e</sub>)</strong>", "Constante Eletrostática <strong>(K)</strong>", "Carga Fonte <strong>(Q)</strong>", "Carga de Prova <strong>(q)</strong>", "Distância <strong>(d)</strong>"]
        inserir(5, inputPrincipal, inputSecundario, resCenter, text, 2, res)
        SelectSubmultiplos(2, resCenter, 1)
        SelectSubmultiplos(3, resCenter, 0)
        SelectDistancia(4, resCenter)
        limpar(resCenter[5])

    } else if (formula == 1) {
        var inputPrincipal = ["E", "Fe", "q"]
        var inputSecundario = ["E-Potencia", "Fe-Potencia"]
        var text = ["Campo Elétrico <strong>(E)</strong>", "Força Elétrica <strong>(F<sub>e</sub>)</strong>", "Carga de Prova <strong>(q)</strong>"]
        inserir(3, inputPrincipal, inputSecundario, resCenter, text, 2, res)
        SelectSubmultiplos(2, resCenter, 0)
        limpar(resCenter[3])

    } else if (formula == 2) {
        var inputPrincipal = ["E", "k", "d", "Q"]
        var inputSecundario = ["E-Potencia", "k-Potencia"]
        var text = ["Campo Elétrico <strong>(E)</strong>", "Constante Eletrostática <strong>(K)</strong>", "Distancia <strong>(d)</strong>", "Carga Fonte <strong>(Q)</strong>"]
        inserir(4, inputPrincipal, inputSecundario, resCenter, text, 2, res)
        SelectDistancia(2, resCenter)
        SelectSubmultiplos(3, resCenter, 1)
        limpar(resCenter[5])

    } else if (formula == 3) {
        var inputPrincipal = ["V", "Epe", "q"]
        var inputSecundario = ["V-Potencia", "Epe-Potencia"]
        var text = ["Potencial Elétrico <strong>(V)</strong>", "Energia Potencial Elétrica <strong>(E<sub>pe</sub>)</strong>", "Carga de Prova <strong>(q)</strong>"]
        inserir(3, inputPrincipal, inputSecundario, resCenter, text, 2, res)
        SelectSubmultiplos(2, resCenter, 0)
        limpar(resCenter[3])

    } else if (formula == 4) {
        var inputPrincipal = ["V", "k", "Q", "d"]
        var inputSecundario = ["V-Potencia", "k-Potencia"]
        var text = ["Potencial Elétrico <strong>(V)</strong>", "Constante Eletrostática <strong>(K)</strong>", "Carga Fonte <strong>(Q)</strong>", "Distância <strong>(d)</strong>"]
        inserir(4, inputPrincipal, inputSecundario, resCenter, text, 2, res)
        SelectSubmultiplos(2, resCenter, 1)
        SelectDistancia(3, resCenter)
        limpar(resCenter[4], "clear4")

    } else if (formula == 5) {
        var inputPrincipal = ["Epe", "k", "Q", "q", "d"]
        var inputSecundario = ["Epe-Potencia", "k-Potencia"]
        var text = ["Energia Potencial Elétrica <strong>(E<sub>pe</sub>)</strong>", "Constante Eletrostática <strong>(K)</strong>", "Carga Fonte <strong>(Q)</strong>", "Carga de Prova <strong>(q)</strong>", "Distância <strong>(d)</strong>"]
        inserir(5, inputPrincipal, inputSecundario, resCenter, text, 2, res)
        SelectSubmultiplos(2, resCenter, 1)
        SelectSubmultiplos(3, resCenter, 0)
        SelectDistancia(4, resCenter)
        limpar(resCenter[5])

    } else if (formula == 6) {
        var inputPrincipal = ["tau", "U", "Va", "Vb", "q"]
        var inputSecundario = ["tau-Potencia", "U-Potencia", "Va-Potencia", "Vb-Potencia"]
        var text = ["Trabalho <strong>(τ)</strong>", "Diferença de Potencial Elétrico <strong>(U<sub>AB</sub>)</strong>", "Potencial Elétrico A <strong>(V<sub>A</sub>)</strong>", "Potencial Elétrico B <strong>(V<sub>B</sub>)</strong>", "Carga de Prova <strong>(q)</strong>"]
        inserir(5, inputPrincipal, inputSecundario, resCenter, text, 4, res)
        SelectSubmultiplos(4, resCenter, 0)
        limpar(resCenter[5])

    } else if (formula == 7) {
        var inputPrincipal = ["E", "U", "Va", "Vb", "d"]
        var inputSecundario = ["E-Potencia", "U-Potencia", "Va-Potencia", "Vb-Potencia", "d-Potencia"]
        var text = ["Campo Elétrico <strong>(E)</strong>", "Diferença de Potencial Elétrico <strong>(U<sub>AB</sub>)</strong>", "Potencial Elétrico A <strong>(V<sub>A</sub>)</strong>", "Potencial Elétrico B <strong>(V<sub>B</sub>)</strong>", "Distância <strong>(d)</strong>"]
        inserir(5, inputPrincipal, inputSecundario, resCenter, text, 4, res)
        SelectDistancia(4, resCenter)
        limpar(resCenter[5])

    }
}

//Redireciona os eventos (keyup e change) dos input e select para a função com a equação que será usada
export function eletricidade(dados) {
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
    } else if (select == 1) {
        equacao2(dados1, dados2, dados3)
    } else if (select == 2) {
        equacao3(dados1, dados2, dados3)
    } else if (select == 3) {
        equacao4(dados1, dados2, dados3)
    } else if (select == 4) {
        equacao5(dados1, dados2, dados3)
    } else if (select == 5) {
        equacao6(dados1, dados2, dados3)
    } else if (select == 6) {
        equacao7(dados1, dados2, dados3)
    } else if (select == 7) {
        equacao8(dados1, dados2, dados3)
    }
}

function equacao1(dados1, dados2, dados3) {
    var potenciaResultado
    var posicao = 0
    var Fe = document.querySelector("#Fe").value.replace(",", ".")
    var k = document.querySelector("#k").value.replace(",", ".")
    var Q = document.querySelector("#Q").value.replace(",", ".")
    var q = document.querySelector("#q").value.replace(",", ".")
    var d = document.querySelector("#d").value.replace(",", ".")
    
    var potenciaFe = Number(document.querySelector("#Fe-Potencia").value)
    var potenciak = Number(document.querySelector("#k-Potencia").value)
    var potenciaQ = Number(document.querySelector("#submultiplo_Q").value)
    var potenciaq = Number(document.querySelector("#submultiplo_q").value)
    var potenciaComprimento = Number(document.querySelector("#distancia").value)

    if (dados1.length != 0 && dados2.length != 0 && dados3.length != 0) {
        posicao = 1
        Fe = ""
        k = ""
        Q = ""
        q = ""
        d = ""
        for (var loop = 0; loop < 4; loop++) {
            if (dados1[loop] == "Fe") {
                Fe = dados2[loop]
                potenciaFe = dados3[loop]
            } else if (dados1[loop] == "k") {
                k = dados2[loop].replace(",", ".")
                potenciak = dados3[loop]
            } else if (dados1[loop] == "Q") {
                Q = dados2[loop]
                potenciaQ = dados3[loop]
            } else if (dados1[loop] == "q") {
                q = dados2[loop]
                potenciaq = dados3[loop]
            } else if (dados1[loop] == "d") {
                d = dados2[loop]
                potenciaComprimento = dados3[loop]
            }
        }
    }
    var K = k

    //Se não for digitado um valor para K, será atribuído o valor 9 para ele e 9 para a sua potência
    if(k.length == 0) {
        k = 9
        potenciak = 9
    }

    //Caso a carga de prova seja negativa, deixa o valor digitado positivo
    if (Number(Q) < 0) {
        Q = - Number(Q)
    }

    //Caso a carga de prova seja negativa, deixa o valor digitado positivo
    if (Number(q) < 0) {
        q = - Number(q)
    }

    //Parte resposánvel pelos cálculos com base nos dados coletados
    if (Fe.length == 0 && Q.length != 0 && Q.length != 0 && d.length != 0) {
        valor = (Number(k) * 10** potenciak * Number(Q) * 10** potenciaQ * Number(q) * 10** potenciaq/ ((Number(d) * 10** potenciaComprimento)**2)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `Fe = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>N</em>`

    } else if (Q.length == 0 && d.length != 0 && Fe.length != 0 && q.length != 0) {
        valor = ((Number(d) * 10** potenciaComprimento)** 2 * Number(Fe) * 10** potenciaFe/ (Number(q) * 10** potenciaq/ Number(k) * 10** potenciak)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `Q = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>C</em>`

    } else if (K.length == 0 && d.length != 0 && Fe.length != 0 && q.length != 0 && Q.length != 0) {
        valor = ((Number(d) * 10** potenciaComprimento)** 2 * Number(Fe) * 10** potenciaFe/ (Number(q) * 10** potenciaq/ Number(Q) * 10** potenciaQ)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `K = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>N • m²/C²</em>`

    } else if (q.length == 0 && d.length != 0 && Fe.length != 0 && Q.length != 0) {
        valor = ((Number(d) * 10** potenciaComprimento)** 2 * Number(Fe) * 10** potenciaFe/ (Number(k) * 10** potenciak)/ (Number(Q) * 10** potenciaQ)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `q = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>C</em>`

    } else if (d.length == 0 && Q.length != 0 && q.length != 0 && Fe.length != 0) {
        valor = (Number(k) * 10** potenciak * Number(Q) * 10** potenciaQ * Number(q) * 10** potenciaq/ (Number(Fe) * 10** potenciaFe)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]

        var valorRaiz = Math.sqrt(Number(k) * 10** potenciak * Number(Q) * 10** potenciaQ * Number(q) * 10** potenciaq/ (Number(Fe) * 10** potenciaFe)).toExponential()
        var finalizadoRaiz = finalizarResultado(valorRaiz)
        var valorRaiz = finalizadoRaiz[0]
        var potenciaResultadoRaiz = finalizadoRaiz[1]
        equacaoResultado = `d<sup>2</sup> = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>m²</em><br>d = ${Number(valorRaiz).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultadoRaiz} <em>m</em>`
        if (Number(k) * 10** potenciak * Number(Q) * 10** potenciaQ * Number(q) * 10** potenciaq/ Number(Fe) * 10** potenciaFe < 0) {
            equacaoResultado = "Esses valores tem como resultado uma distância negativa, que logo não existe."
        }
    } else {
        equacaoResultado = ""
    }
    final(equacaoResultado, valor, posicao, infinity)
}

function equacao2(dados1, dados2, dados3) {
    var posicao = 0
    var E = document.querySelector("#E").value.replace(",", ".")
    var Fe = document.querySelector("#Fe").value.replace(",", ".")
    var q = document.querySelector("#q").value.replace(",", ".")

    var potenciaE = Number(document.querySelector("#E-Potencia").value)
    var potenciaFe = Number(document.querySelector("#Fe-Potencia").value)
    var potenciaq = Number(document.querySelector("#submultiplo_q").value)

    if (dados1.length != 0 && dados2.length != 0 && dados3.length != 0) {
        posicao = 1
        E = ""
        Fe = ""
        q = ""
        for (var loop = 0; loop < 3; loop++) {
            if (dados1[loop] == "E") {
                E = dados2[loop]
                potenciaE = dados3[loop]
            } else if (dados1[loop] == "Fe") {
                Fe = dados2[loop]
                potenciaFe = dados3[loop]
            } else if (dados1[loop] == "q") {
                q = dados2[loop]
                potenciaq = dados3[loop]
            }
        }
    }

    //Caso a carga de prova seja negativa, deixa o valor digitado positivo
    if (Number(q) < 0) {
        q = - Number(q)
    }

    //Parte resposánvel pelos cálculos com base nos dados coletados
    if (E.length == 0 && Fe.length != 0 && q.length != 0) {
        valor = (Number(Fe) * 10** potenciaFe/ (Number(q) * 10** potenciaq)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `E = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>N/C</em>`
        
    } else if (Fe.length == 0 && q.length != 0 && E.length != 0) {
        valor = (Number(q) * 10** potenciaq * Number(E) * 10** potenciaE).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `Fe = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>N</em>`

    } else if (q.length == 0 && Fe.length != 0 && E.length != 0) {
        valor = (Number(Fe) * 10** potenciaFe/ (Number(E) * 10** potenciaE)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `q = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>C</em>`

    } else {
        equacaoResultado = ""
    }
    final(equacaoResultado, valor, posicao, infinity)
}

function equacao3(dados1, dados2, dados3) {
    var posicao = 0
    var E = document.querySelector("#E").value.replace(",", ".")
    var k = document.querySelector("#k").value.replace(",", ".")
    var Q = document.querySelector("#Q").value.replace(",", ".")
    var d = document.querySelector("#d").value.replace(",", ".")

    var potenciaE = Number(document.querySelector("#E-Potencia").value)
    var potenciak = Number(document.querySelector("#k-Potencia").value)
    var potenciaQ = Number(document .querySelector("#submultiplo_Q").value)
    var potenciaComprimento = Number(document.querySelector("#distancia").value)

    if (dados1.length != 0 && dados2.length != 0 && dados3.length != 0) {
        posicao = 1
        E = ""
        k = ""
        Q = ""
        d = ""

        for (var loop = 0; loop < 4; loop++) {
            if (dados1[loop] == "E") {
                E = dados2[loop]
                potenciaE = dados3[loop]
            } else if (dados1[loop] == "k") {
                k = dados2[loop].replace(",", ".")
                potenciak = dados3[loop]
            } else if (dados1[loop] == "Q") {
                Q = dados2[loop]
                potenciaQ = dados3[loop]
            } else if (dados1[loop] == "d") {
                d = dados2[loop]
                potenciaComprimento = dados3[loop]
            }
        }
    }
    var K = k

    //Se não for digitado um valor para K, será atribuído o valor 9 para ele e 9 para a sua potência
    if(k.length == 0) {
        k = 9
        potenciak = 9
    }

    //Caso a carga fonte seja negativa, deixa o valor digitado positivo
    if (Number(Q) < 0) {
        Q = - Number(Q)
    }

    if (E.length == 0 && Q.length != 0 && d.length != 0) {
        valor = (Number(k) * 10** potenciak * Number(Q) * 10** potenciaQ/ ((Number(d) * 10** potenciaComprimento)** 2)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `E = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>N/C</em>`

    } else if (K.length == 0 && d.length != 0 && E.length != 0 && Q.length != 0) {
        valor = ((Number(d) * 10** potenciaComprimento)** 2 * Number(E) * 10** potenciaE/ (Q * 10** potenciaQ)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `K = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>N • m²/C²</em>`

    } else if (Q.length == 0 && d.length != 0 && E.length != 0) {
        valor = ((Number(d) * 10** potenciaComprimento)** 2 * Number(E) * 10** potenciaE/ (Number(k) * 10** potenciak)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `Q = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>C</em>`

    } else if (d.length == 0 && Q.length != 0 && E.length != 0) {
        valor = (Number(k) * 10** potenciak * Number(Q) * 10** potenciaQ/ (Number(E) * 10** potenciaE)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]

        var valorRaiz = Math.sqrt(Number(k) * 10** potenciak * Number(Q) * 10** potenciaQ/ (Number(E) * 10** potenciaE)).toExponential()
        var finalizadoRaiz = finalizarResultado(valorRaiz)
        var valorRaiz = finalizadoRaiz[0]
        var potenciaResultadoRaiz = finalizadoRaiz[1]
        equacaoResultado = `d² = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>m²</em><br>d = ${Number(valorRaiz).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultadoRaiz} <em>m</em>`
        if (Number(k) * 10** potenciak * Number(Q) * 10** potenciaQ/ Number(E) * 10** potenciaE < 0) {
            equacaoResultado = "Esses valores tem como resultado uma distância negativa, que logo não existe."
        }

    } else {
        equacaoResultado = ""
    }
    final(equacaoResultado, valor, posicao, infinity)
}

function equacao4(dados1, dados2, dados3) {
    var posicao = 0
    var V = document.querySelector("#V").value.replace(",", ".")
    var Epe = document.querySelector("#Epe").value.replace(",", ".")
    var q = document.querySelector("#q").value.replace(",", ".")

    var potenciaV = Number(document.querySelector("#V-Potencia").value)
    var potenciaEpe = Number(document.querySelector("#Epe-Potencia").value)
    var potenciaq = Number(document.querySelector("#submultiplo_q").value)

    if (dados1.length != 0 && dados2.length != 0 && dados3.length != 0) {
        posicao = 1
        V = ""
        Epe = ""
        q = ""
        for (var loop = 0; loop < 3; loop++) {
            if (dados1[loop] == "V") {
                V = dados2[loop]
                potenciaV = dados3[loop]
            } else if (dados1[loop] == "Epe") {
                Epe = dados2[loop].replace(",", ".")
                potenciaEpe = dados3[loop]
            } else if (dados1[loop] == "q") {
                q = dados2[loop]
                potenciaq = dados3[loop]
            }
        }
    }

    //Parte resposánvel pelos cálculos com base nos dados coletados
    if (V.length == 0 && Epe.length != 0 && q.length != 0) {
        valor = (Number(Epe) * 10** potenciaEpe/ (Number(q) * 10** potenciaq)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `V = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>V</em>`
        
    } else if (Epe.length == 0 && V.length != 0 && q.length != 0) {
        valor = (Number(V) * 10** potenciaV * Number(q) * 10** potenciaq).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `Epe = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>J</em>`

    } else if (q.length == 0 && Epe.length != 0 && V.length != 0) {
        valor = (Number(Epe) * 10** potenciaEpe/ (Number(V) * 10** potenciaV)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `q = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>C</em>`

    } else {
        equacaoResultado = ""
    }
    final(equacaoResultado, valor, posicao, infinity)
}

function equacao5(dados1, dados2, dados3) {
    var posicao = 0
    var V = document.querySelector("#V").value.replace(",", ".")
    var k = document.querySelector("#k").value.replace(",", ".")
    var Q = document.querySelector("#Q").value.replace(",", ".")
    var d = document.querySelector("#d").value.replace(",", ".")

    var potenciaV = document.querySelector("#V-Potencia").value
    var potenciak = document.querySelector("#k-Potencia").value
    var potenciaQ = Number(document .querySelector("#submultiplo_Q").value)
    var potenciaComprimento = Number(document.querySelector("#distancia").value)

    if (dados1.length != 0 && dados2.length != 0 && dados3.length != 0) {
        posicao = 1
        V = ""
        k = ""
        Q = ""
        d = ""
        for (var loop = 0; loop < 4; loop++) {
            if (dados1[loop] == "V") {
                V = dados2[loop]
                potenciaV = dados3[loop]
            } else if (dados1[loop] == "k") {
                k = dados2[loop].replace(",", ".")
                potenciak = dados3[loop]
            } else if (dados1[loop] == "Q") {
                Q = dados2[loop]
                potenciaQ = dados3[loop]
            } else if (dados1[loop] == "d") {
                d = dados2[loop]
                potenciaComprimento = dados3[loop]
            }
        }
    }
    var K = k

    //Se não for digitado um valor para K, será atribuído o valor 9 para ele e 9 para a sua potência
    if(k.length == 0) {
        k = 9
        potenciak = 9
    }

    //Parte resposánvel pelos cálculos com base nos dados coletados
    if (V.length == 0 && Q.length != 0 && d.length != 0) {
        valor = (Number(k) * 10** potenciak * Number(Q) * 10** potenciaQ/ (Number(d) * 10** potenciaComprimento)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `V = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>V</em>`

    } else if (K.length == 0 && V.length != 0 && d.length != 0 && Q.length != 0) {
        valor = (Number(V) * 10** potenciaV * Number(d) * 10** potenciaComprimento/ (Number(Q) * 10** potenciaQ)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `K = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>N • m²/C²</em>`

    } else if (Q.length == 0 && V.length != 0 && d.length != 0) {
        valor = (Number(V) * 10** potenciaV * Number(d) * 10** potenciaComprimento/ (Number(k) * 10** potenciak)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `Q = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>C</em>`

    } else if (d.length == 0 && Q.length != 0 && V.length != 0) {
        valor = (Number(k) * 10** potenciak * Number(Q) * 10** potenciaQ/ (Number(V) * 10** potenciaV)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `d = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>m</em>`
        if (Number(k) * 10** potenciak * Number(Q) * 10** potenciaQ/ Number(V) * 10** potenciaV < 0) {
            equacaoResultado = "Esses valores tem como resultado uma distância negativa, que logo não existe."
        }

    } else {
        equacaoResultado = ""
    }
    final(equacaoResultado, valor, posicao, infinity)
}

function equacao6(dados1, dados2, dados3) {
    var posicao = 0
    var Epe = document.querySelector("#Epe").value.replace(",", ".")
    var k = document.querySelector("#k").value.replace(",", ".")
    var Q = document.querySelector("#Q").value.replace(",", ".")
    var q = document.querySelector("#q").value.replace(",", ".")
    var d = document.querySelector("#d").value.replace(",", ".")

    var potenciaEpe = Number(document.querySelector("#Epe-Potencia").value)
    var potenciak = Number(document.querySelector("#k-Potencia").value)
    var potenciaQ = Number(document .querySelector("#submultiplo_Q").value)
    var potenciaq = Number(document.querySelector("#submultiplo_q").value)
    var potenciaComprimento = Number(document.querySelector("#distancia").value)

    if (dados1.length != 0 && dados2.length != 0 && dados3.length != 0) {
        posicao = 1
        Epe = ""
        k = ""
        Q = ""
        q = ""
        d = ""
        for (var loop = 0; loop < 4; loop++) {
            if (dados1[loop] == "Epe") {
                Epe = dados2[loop]
                potenciaEpe = dados3[loop]
            } else if (dados1[loop] == "k") {
                k = dados2[loop].replace(",", ".")
                potenciak = dados3[loop]
            } else if (dados1[loop] == "Q") {
                Q = dados2[loop]
                potenciaQ = dados3[loop]
            } else if (dados1[loop] == "q") {
                q = dados2[loop]
                potenciaq = dados3[loop]
            } else if (dados1[loop] == "d") {
                d = dados2[loop]
                potenciaComprimento = dados3[loop]
            }
        }
    }
    var K = k

    //Se não for digitado um valor para K, será atribuído o valor 9 para ele e 9 para a sua potência
    if(k.length == 0) {
        k = 9
        potenciak = 9
    }
    
    //Parte resposánvel pelos cálculos com base nos dados coletados
    if (Epe.length == 0 && Q.length != 0 && q.length != 0 && d.length != 0) {
        valor = (Number(k) * 10** potenciak * Number(Q) * 10** potenciaQ * Number(q) * 10** potenciaq/ (Number(d) * 10** potenciaComprimento)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `Epe = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>J</em>`

    } else if (K.length == 0 && d.length != 0 && Epe.length != 0 && q.length != 0 && Q.length != 0) {
        valor = (Number(d) * 10** potenciaComprimento * Number(Epe) * 10** potenciaEpe/ (Number(q) * 10** potenciaq)/ (Number(Q) * 10** potenciaQ)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `K = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>N • m²/C²</em>`

    } else if (Q.length == 0 && d.length != 0 && Epe.length != 0 && q.length != 0) {
        valor = (Number(d) * 10** potenciaComprimento * Number(Epe) * 10** potenciaEpe/ (Number(q) * 10** potenciaq)/ (Number(k) * 10** potenciak)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `Q = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>C</em>`

    } else if (q.length == 0 && d.length != 0 && Epe.length != 0 && Q.length != 0) {
        valor = (Number(d) * 10** potenciaComprimento * Number(Epe) * 10** potenciaEpe/ (Number(k) * 10** potenciak)/ (Number(Q) * 10** potenciaQ)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `q = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>C</em>`

    } else if (d.length == 0 && K.length != 0 && q.length != 0 && Q.length != 0 && Epe.length != 0) {
        valor = (Number(k) * 10** potenciak * Number(q) * 10** potenciaq * Number(Q) * 10** potenciaQ/ (Number(Epe) * 10** potenciaEpe)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `d = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>m</em>`
        if (Number(K) * 10** potenciaK * Number(q) * 10** potenciaq * Number(Q) * 10** potenciaQ/ Number(Epe) * 10** potenciaEpe < 0) {
            equacaoResultado = "Esses valores tem como resultado uma distância negativa, que logo não existe."
        }

    } else {
        equacaoResultado = ""
    }
    final(equacaoResultado, valor, posicao, infinity)
}

function equacao7(dados1, dados2, dados3) {
    var posicao = 0
    var t = document.querySelector("#tau").value.replace(",", ".")
    var q = document.querySelector("#q").value.replace(",", ".")
    var U = document.querySelector("#U").value.replace(",", ".")
    var Va = document.querySelector("#Va").value.replace(",", ".")
    var Vb = document.querySelector("#Vb").value.replace(",", ".")

    var potenciat = Number(document.querySelector("#tau-Potencia").value)
    var potenciaq = Number(document.querySelector("#submultiplo_q").value)
    var potenciaU = Number(document.querySelector("#U-Potencia").value)
    var potenciaVa = Number(document.querySelector("#Va-Potencia").value)
    var potenciaVb = Number(document.querySelector("#Vb-Potencia").value)

    if (dados1.length != 0 && dados2.length != 0 && dados3.length != 0) {
        posicao = 1
        t = ""
        q = ""
        U = ""
        Va = ""
        Vb = ""
        for (var loop = 0; loop < 4; loop++) {
            if (dados1[loop] == "tau") {
                t = dados2[loop]
                potenciat = dados3[loop]
            } else if (dados1[loop] == "q") {
                q = dados2[loop]
                potenciaq = dados3[loop]
            } else if (dados1[loop] == "U") {
                U = dados2[loop]
                potenciaU = dados3[loop]
            } else if (dados1[loop] == "Va") {
                Va = dados2[loop]
                potenciaVa = dados3[loop]
            } else if (dados1[loop] == "Vb") {
                Vb = dados2[loop]
                potenciaVb = dados3[loop]
            }
        }
    }

    if (Va.length != 0 && Vb.length != 0) {
        U = Number(Va) * 10** potenciaVa - Number(Vb) * 10** potenciaVb
    } else if (U.length != 0) {
        U = Number(U) * 10** potenciaU
    }

    //Parte resposánvel pelos cálculos com base nos dados coletados
    if ((t.length == 0 && q.length != 0 && U.length != 0) || (t.length == 0 && q.length != 0 && Va.length != 0 && Vb.length != 0)) {
        valor = (Number(q) * 10** potenciaq * U).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `t = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>J</em>`

    } else if (U.length == 0 && Va.length == 0 && Vb.length == 0 && t.length != 0 && q.length != 0) {
        valor = (Number(t) * 10** potenciat/ (Number(q) * 10** potenciaq)).toExponential()   
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `U = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>V</em>`

    } else if ((q.length == 0 && t.length != 0 && U.length != 0) || (q.length == 0 && t.length != 0 && Va.length != 0 && Vb.length != 0)) {
        valor = (Number(t) * 10** potenciat/ U).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `q = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} <em>C</em>`

    } else if (Va.length == 0 && U.length == 0 && t.length != 0 && q.length != 0 && Vb.length != 0) {
        valor = ((Number(t) * 10** potenciat +(Number(q) * 10** potenciaq * Number(Vb) * 10** potenciaVb))/ (Number(q) * 10** potenciaq)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `Va = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>V</em>`

    } else if (Vb.length == 0 && U.length == 0 && t.length != 0 && q.length != 0 && Va.length != 0) {
        valor = ((Number(Vb) * 10** potenciaVb -(Number(q) * 10** potenciaq * Number(Va) * 10** potenciaVa))/ (Number(q) * 10** potenciaq)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `Vb = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>V</em>`

    } else if (Va.length != 0 && Vb.length != 0 && t.length ==0 && q.length == 0 && U.length == 0) {
        equacaoResultado = `U = ${U} <em>V</em>`
    } else {
        equacaoResultado = ""
    }
    final(equacaoResultado, valor, posicao, infinity)
}

function equacao8(dados1, dados2, dados3) {
    var posicao = 0
    var E = document.querySelector("#E").value.replace(",", ".")
    var U = document.querySelector("#U").value.replace(",", ".")
    var Va = document.querySelector("#Va").value.replace(",", ".")
    var Vb = document.querySelector("#Vb").value.replace(",", ".")
    var d = document.querySelector("#d").value.replace(",", ".")

    var potenciaE = Number(document.querySelector("#E-Potencia").value)
    var potenciaU = Number(document.querySelector("#U-Potencia").value)
    var potenciaVa = Number(document.querySelector("#Va-Potencia").value)
    var potenciaVb = Number(document.querySelector("#Vb-Potencia").value)
    var potenciaComprimento = Number(document.querySelector("#distancia").value)

    if (dados1.length != 0 && dados2.length != 0 && dados3.length != 0) {
        posicao = 1
        E = ""
        U = ""
        Va = ""
        Vb = ""
        d = ""
        for (var loop = 0; loop < 5; loop++) {
            if (dados1[loop] == "E") {
                E = dados2[loop]
                potenciaE = dados3[loop]
            } else if (dados1[loop] == "U") {
                U = dados2[loop]
                potenciaU = dados3[loop]
            } else if (dados1[loop] == "Va") {
                Va = dados2[loop]
                potenciaVa = dados3[loop]
            } else if (dados1[loop] == "Vb") {
                Vb = dados2[loop]
                potenciaVb = dados3[loop]
            } else if (dados1[loop] == "d") {
                d = dados2[loop]
                potenciaComprimento = dados3[loop]
            }
        }
    }
    var u = U

    if (Va.length != 0 && Vb.length != 0) {
        U = Number(Va) * 10** potenciaVa - Number(Vb) * 10** potenciaVb
    } else if (U.length != 0) {
        U = Number(U) * 10** potenciaU
    }

    //Parte resposánvel pelos cálculos com base nos dados coletados
    if ((E.length == 0 && u.length == 0 && Va.length != 0 && Vb.length != 0 && d.length != 0) || (E.length == 0 && Va.length == 0 && Vb.length == 0 && u.length != 0 && d.length != 0)) {
        valor = (U/ (Number(d) * 10** potenciaComprimento)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `E = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>V/m</em>`
        
    } else if ( Va == 0 && u.length == 0 && E.length != 0 && d.length != 0 && Vb.length != 0) {
        valor = (Number(E) * 10** potenciaE * Number(d) * 10** potenciaComprimento + Number(Vb) * 10** potenciaVb).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `Va = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} <em>V</em>`

    } else if (Vb == 0 && u.length == 0 && E.length != 0 && d.length != 0 && Va.length != 0) {
        valor = ((Number(E) * 10** potenciaE * Number(d) * 10** potenciaComprimento - Number(Va) * 10** potenciaVa) * (-1)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `Vb = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} <em>V</em>`

    } else if (u.length == 0 && Va.length == 0 && Vb.length == 0 && E.length != 0 && d.length != 0) {
        valor = (Number(E) * 10** potenciaE * Number(d) * 10** potenciaComprimento).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `U = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>V</em>`

    } else if ((d.length == 0 && Va.length == 0 && Vb.length == 0 && u.length != 0 && E.length != 0) || (d.length == 0 && u.length == 0 && Va.length != 0 && Vb.length != 0 && E.length != 0)) {
        valor = (U/ (Number(E) * 10** potenciaE)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `d = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>m</em>`
        if (U/ (Number(E) * 10** potenciaE) < 0) {
            equacaoResultado = "Esses valores tem como resultado uma distância negativa, que logo não existe."
        }

    } else if (Va.length != 0 && Vb.length != 0 && E.length == 0 && u.length == 0 && d.length == 0){
        equacaoResultado = `U = ${U} <em>V</em>`
    } else {
        equacaoResultado = ""
    }
    final(equacaoResultado, valor, posicao, infinity)
}

function reset() {
    document.querySelector(".respostas").innerHTML = ""
}