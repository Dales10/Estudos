var equacaoResultado, valor, dados, infinity, tipoDeFormula
const resCenter = ["res00", "res01", "res02", "res03", "res04", "res05"]
import {gerar, inserir, SelectDistancia, SelectMassa, limpar, final, finalizarResultado, criarEquacoes} from "./codigosFonte.js"

window.addEventListener("load", () => {
    var main = document.querySelector(".main").classList.toString()
    if (main.includes("energiaPotencial")) {
        document.querySelector("#formula").addEventListener("change", formulas)
        document.querySelector("#gerar").addEventListener("click", gerarValores)
        document.querySelector("#verResultado").addEventListener("click", verResultado)
    }
})

function verResultado() {
    energiaPotencial(dados)
}

//Irá colocar as imagens com as fórmulas mostrando como elas são
function formulas() {
    var formula = document.querySelector("#formula").value
    var formulas = document.querySelector("#formulas")
    formulas.innerHTML = ""
    document.querySelector("#gerar").disabled = false

    var divFlex = document.createElement("div")
    divFlex.setAttribute("class", "flex")
    var encontrarValor = document.createElement("div")
    encontrarValor.setAttribute("class", "encontrarValor")
    var fracao = document.createElement("div")
    fracao.setAttribute("class", "fracao")
    var parteSuperior = document.createElement("div")
    parteSuperior.setAttribute("class", "parteSuperior")
    var parteInferior = document.createElement("div", "parteInferior")
    parteInferior.setAttribute("class", "parteInferior")
    if (formula == 0) {
        criarEquacoes(["E<sub>pc</sub> =", "m ⋅ &nbsp;v<sup>2</sup>", "2"])
    } else if (formula == 1) {
        formulas.innerHTML = "E<sub>pg</sub> = m ⋅ &nbsp;g ⋅ &nbsp;h"
    } else if (formula == 2) {
        criarEquacoes(["E<sub>p(elast) =</sub>", "K ⋅ &nbsp;x<sup>2</sup>", "2"])
    } else {
        formulas.innerHTML = "F<sub>e</sub> = K ⋅ &nbsp;x"
    }
    reset()
    load(formula)
}

function gerarValores() {
    var formula = document.querySelector("#formula").value
    var iniciais = []
    if (formula == 0) {
        iniciais = ["Ec", "v", "m"]
    } else if (formula == 1) {
        iniciais = ["Epg", "m", "g", "h"]
    } else if (formula == 2) {
        iniciais = ["Epelast", "k", "x"]
    } else if (formula == 3) {
        iniciais = ["Fe", "k", "x"]
    }
    document.querySelector("#verResultado").disabled = false
    dados = gerar(iniciais)
}

//Irá adicionar tudo que é necessário para coletar as informações na ordem desejada
function load(select) {
    res.innerHTML = ""
    if (select == 0) {
        //Quardam as informações em arrays que serão usadas nos for
        const inputPrincipal = ["Ec", "v2", "m"]
        const inputSecundario = ["Ec-Potencia", "v2-Potencia", "m-Potencia"]
        const text = ["Energia Cinética <strong>(E<sub>c</sub>)</strong>", "Velocidade <strong>(v)</strong>", "Massa <strong>(m)</strong>"]
        inserir(3, inputPrincipal, inputSecundario, resCenter, text, 2, res)
        SelectMassa(2, resCenter)
        limpar(resCenter[3])

    } else if (select == 1) {
        var inputPrincipal = ["Epg", "g", "h", "m"]
        var inputSecundario = ["Epg-Potencia", "g-Potencia", "h-Potencia"]
        var text = ["Energia Potencial Gravitacional <strong>(E<sub>pg</sub>)</strong>", "Gravidade <strong>(g)</strong>", "Altura <strong>(h)</strong>", "Massa <strong>(m)</strong>"]
        inserir(4, inputPrincipal, inputSecundario, resCenter, text, 2, res)
        SelectDistancia(2, resCenter)
        SelectMassa(3, resCenter)
        limpar(resCenter[4])

    } else if (select == 2) {
        var inputPrincipal = ["Epelast", "k", "x2"]
        var inputSecundario = ["Epelast-Potencia", "k-Potencia", "x2-Potencia"]
        var text = ["Energia Potencial Elástica <strong>(E<sub>p(elast)</sub>)</strong>", "Constante Elástica <strong>(K)</strong>", "Deformação Da Mola <strong>x<sup>2</sup></strong>"]
        inserir(3, inputPrincipal, inputSecundario, resCenter, text, 3, res)
        limpar(resCenter[3])

    } else if (select == 3) {
        var inputPrincipal = ["Fe", "k", "x"]
        var inputSecundario = ["Fe-Potencia", "k-Potencia", "x-Potencia"]
        var text = ["Força Elástica <strong>(F<sub>elast</sub>)</strong>", "Constante Elástica <strong>(K)</strong>", "Deformação Da Mola <strong>(x)</strong>"]
        inserir(3, inputPrincipal, inputSecundario, resCenter, text, 3, res)
        limpar(resCenter[3])

    }
}

//Redireciona os eventos (keyup e change) dos input e select para a função com a equação que será usada
export function energiaPotencial(dados) {
    var formula = document.querySelector("#formula").value
    var dados1 = ""
    var dados2 = ""
    var dados3 = ""
    if (Array.isArray(dados)) {
        dados1 = dados[0]
        dados2 = dados[1]
        dados3 = dados[2]
    }
    if (formula == 0) {
        equacao1(dados1, dados2, dados3)
    } else if (formula == 1) {
        equacao2(dados1, dados2, dados3)
    } else if (formula == 2) {
        equacao3(dados1, dados2, dados3)
    } else if (formula == 3) {
        equacao4(dados1, dados2, dados3)
    }
}

function equacao1(dados1, dados2, dados3) {
    var potenciaResultado
    var posicao = 0
    var Ec = document.querySelector("#Ec").value.replace(",", ".")
    var v = document.querySelector("#v2").value.replace(",", ".")
    var m = document.querySelector("#m").value.replace(",", ".")

    var potenciaEc = Number(document.querySelector("#Ec-Potencia").value)
    var potenciav = Number(document.querySelector("#v2-Potencia").value)
    var potenciam = Number(document.querySelector("#massa").value)

    if (dados1.length != 0 && dados2.length != 0 && dados3.length != 0) {
        posicao = 1
        Ec = ""
        v = ""
        m = ""
        for (var loop = 0; loop < 2; loop++) {
            if (dados1[loop] == "Ec") {
                Ec = dados2[loop]
                potenciaEc = dados3[loop]
            } else if (dados1[loop] == "v") {
                v = dados2[loop].replace(",", ".")
                potenciav = dados3[loop]
            } else if (dados1[loop] == "m") {
                m = dados2[loop]
                potenciam = dados3[loop]
            }
        }
    }

    if (Ec.length == 0 && v.length != 0 && m.length != 0) {
        valor = (Number(m) * 10** potenciam * (Number(v) * 10** potenciav)** 2/ 2).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `Ec = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>J</em>`

    } else if (v.length == 0 && m.length != 0 && Ec.length != 0) {
        valor = (2 * Number(Ec) * 10** potenciaEc/ m * 10** potenciam).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        
        var valorRaiz = Math.sqrt(2 * Number(Ec) * 10** potenciaEc/ m * 10** potenciam).toExponential()
        var finalizadoRaiz = finalizarResultado(valorRaiz)
        var valorRaiz = finalizadoRaiz[0]
        var potenciaResultadoRaiz = finalizadoRaiz[1]
        equacaoResultado = `v<sup>2</sup> = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>m/s<sup>2</sup></em><br>v = ${Number(valorRaiz).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultadoRaiz} <em>m/s</em>`
        if (2 * Number(Ec) * 10** potenciaEc/ m * 10** potenciam < 0) {
            equacaoResultado = `v<sup>2</sup> = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>m/s<sup>2</sup></em><br>Não existe raiz quadrada de número negativo.`
        }

    } else if (m.length == 0 && Ec.length != 0 && v.length != 0) {
        valor = (2 * Number(Ec) * 10** potenciaEc/ ((Number(v) * 10** potenciav)** 2)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `m = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>kg</em>`
        if (2 * Number(Ec) * 10** potenciaEc/ (Number(v) * 10** potenciav)** 2 < 0) {
            equacaoResultado = "Esses valores tem como resultado uma massa negativa, que logo não existe."
        }

    } else {
        equacaoResultado = ""
    }
    final(equacaoResultado, valor, posicao, infinity)
}

function equacao2(dados1, dados2, dados3) {
    var potenciaResultado
    var posicao = 0
    var Epg = document.querySelector("#Epg").value.replace(",", ".")
    var g = document.querySelector("#g").value.replace(",", ".")
    var h = document.querySelector("#h").value.replace(",", ".")
    var m = document.querySelector("#m").value.replace(",", ".")

    var potenciaEpg = Number(document.querySelector("#Epg-Potencia").value)
    var potenciag = Number(document.querySelector("#g-Potencia").value)
    var potenciah = Number(document.querySelector("#distancia").value)
    var potenciam = Number(document.querySelector("#massa").value)

    if (dados1.length != 0 && dados2.length != 0 && dados3.length != 0) {
        posicao = 1
        Epg = ""
        g = ""
        h = ""
        m = ""
        for (var loop = 0; loop < 3; loop++) {
            if (dados1[loop] == "Epg") {
                Epg = dados2[loop]
                potenciaEpg = dados3[loop]
            } else if (dados1[loop] == "g") {
                g = dados2[loop].replace(",", ".")
                potenciag = dados3[loop]
            } else if (dados1[loop] == "h") {
                h = dados2[loop]
                potenciah = dados3[loop]
            } else if (dados1[loop] == "m") {
                m = dados2[loop]
                potenciam = dados3[loop]
            }
        }
    }

    if (Epg.length == 0 && g.length != 0 && h.length != 0 && m.length != 0) {
        valor = (Number(m) * 10** potenciam * Number(g) * 10** potenciag * Number(h) * 10** potenciah).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `Epg = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>J</em>`

    } else if (g.length == 0 && h.length != 0 && m.length != 0 && Epg.length != 0) {
        valor = 1
        equacaoResultado = "O valor da aceleração da gravidade é 9,8 m/s<sup>2</sup>"
    } else if (h.length == 0 && m.length != 0 && Epg.length != 0 && g.length != 0) {
        valor = (Number(Epg) * 10** potenciaEpg/ Number(g) * 10** potenciag/ Number(m) * 10** potenciam).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `h = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>m</em>`

    } else if (m.length == 0 && Epg.length != 0 && g.length != 0 && h.length != 0) {
        valor = (Number(Epg) * 10** potenciaEpg/ Number(h) * 10** potenciah/ Number(g) * 10** potenciag).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `m = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>kg</em>`

    } else {
        equacaoResultado = ""
    }
    final(equacaoResultado, valor, posicao, infinity)

}

function equacao3(dados1, dados2, dados3) {
    var potenciaResultado
    var posicao = 0
    var Epelast = document.querySelector("#Epelast").value.replace(",", ".")
    var k = document.querySelector("#k").value.replace(",", ".")
    var x = document.querySelector("#x2").value.replace(",", ".")

    var potenciaEpelast = Number(document.querySelector("#Epelast-Potencia").value)
    var potenciak = Number(document.querySelector("#k-Potencia").value)
    var potenciax = Number(document.querySelector("#x2-Potencia").value)
    
    if (dados1.length != 0 && dados2.length != 0 && dados3.length != 0) {
        posicao = 1
        Epelast = ""
        k = ""
        x = ""
        for (var loop = 0; loop < 2; loop++) {
            if (dados1[loop] == "Epelast") {
                Epelast = dados2[loop].replace(",", ".")
                potenciaEpelast = dados3[loop]
            } else if (dados1[loop] == "k") {
                k = dados2[loop].replace(",", ".")
                potenciak = dados3[loop]
            } else if (dados1[loop] == "loop") {
                x = dados2[loop]
                potenciax = dados3[loop]
            }
        }
    }

    if (Epelast.length == 0 && k.length != 0 && x.length != 0) {
        valor = (Number(k) * 10**potenciak * (Number(x) * 10** potenciax)** 2/ 2).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `E<sub>p(elast)</sub> = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>J</em>`

    } else if (k.length == 0 && x.length != 0 && Epelast.length != 0) {
        valor = (Number(Epelast) * 10** potenciaEpelast * 2/ Number(x) * 10** potenciax)
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `K = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>N/m</em>`

    } else if (x.length == 0 && Epelast.length != 0 && k.length != 0) {
        valor = (Number(Epelast) * 10** potenciaEpelast * 2/ Number(k) * 10** potenciak).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        
        var valorRaiz = Math.sqrt(Number(Epelast) * 10** potenciaEpelast * 2/ Number(k) * 10** potenciak).toExponential()
        var finalizadoRaiz = finalizarResultado(valorRaiz)
        var valorRaiz = finalizadoRaiz[0]
        var potenciaResultadoRaiz = finalizadoRaiz[1]
        equacaoResultado = `x<sup>2</sup> = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>m</em><br>x = ${Number(valorRaiz).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultadoRaiz} <em>m</em>`
        if (Number(Epelast) * 10** potenciaEpelast * 2/ Number(k) * 10** potenciak < 0) {
            equacaoResultado = `x<sup>2</sup> = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>m</em><br>Não existe raiz quadrada de número negativo.`
        }

    } else {
        equacaoResultado = ""
    }
    final(equacaoResultado, valor, posicao, infinity)
}

function equacao4(dados1, dados2, dados3) {
    var potenciaResultado
    var posicao = 0
    var Fe = document.querySelector("#Fe").value.replace(",", ".")
    var k = document.querySelector("#k").value.replace(",", ".")
    var x = document.querySelector("#x").value.replace(",", ".")

    var potenciaFe = Number(document.querySelector("#Fe-Potencia").value)
    var potenciak = Number(document.querySelector("#k-Potencia").value)
    var potenciax = Number(document .querySelector("#x-Potencia").value)

    if (dados1.length != 0 && dados2.length != 0 && dados3.length != 0) {
        posicao = 1
        Fe = ""
        k = ""
        x = ""
        for (let loop = 0; loop < 2; loop++) {
            if (dados1[loop] == "Fe") {
                Fe = dados2[loop]
                potenciaFe = dados3[loop]
            } else if (dados1[loop] == "k") {
                k = dados2[loop].replace(",", ".")
                potenciak = dados3[loop]
            } else if (dados1[loop] == "x") {
                x = dados2[loop]
                potenciax = dados3[loop]
            }
        }
    }

    if (Fe.length == 0 && k.length != 0 && x.length != 0) {
        valor = (Number(k) * 10** potenciak * Number(x) * 10** potenciax).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `Fe = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>N</em>`

    } else if (k.length == 0 && x.length != 0 && Fe.length != 0) {
        valor = (Number(Fe) * 10** potenciaFe/ (Number(x) * 10** potenciax)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `K = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>N/m</em>`

    } else if (x.length == 0 && Fe.length != 0 && k.length != 0) {
        valor = (Number(Fe) * 10** potenciaFe/ (Number(k) * 10** potenciak)).toExponential()
        var finalizado = finalizarResultado(valor)
        valor = finalizado[0]
        var potenciaResultado = finalizado[1]
        infinity = finalizado[2]
        equacaoResultado = `x = ${Number(valor).toLocaleString("pt-br", {minimumFractionDigits: 0, maximumFractionDigits: 5})} ${potenciaResultado} <em>m</em>`

    } else {
        equacaoResultado = ""
    }
    final(equacaoResultado, valor, posicao, infinity)

}

function reset() {
    document.querySelector(".respostas").innerHTML = ""
}