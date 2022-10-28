window.addEventListener("load", () => {
    const top_btn = document.querySelector(".top-btn")
    document.querySelector(".menu-bar").addEventListener("click", menu)
    top_btn.addEventListener("click", () => {
        window.scrollTo(0, 0)
    })
    document.addEventListener("scroll", ocultar)
    ocultar()

    document.querySelector("#principal").addEventListener("click", () => window.open("../principal/index.html", "_self"))
    document.querySelector("#primeiro").addEventListener("click", () => window.open("../primeiroAno/primeiroAno.html", "_self"))
    document.querySelector("#segundo").addEventListener("click", () => window.open("../segundoAno/segundoAno.html", "_self"))
    document.querySelector("#terceiro").addEventListener("click", () => window.open("../terceiroAno/terceiroAno.html", "_self"))

    var main = document.querySelector(".main").classList.toString()
    if (main.includes("formulas")) {
        if (main.includes("1")) {
            document.querySelector("#energiaPotencial").addEventListener("click", () => window.open("../primeiroAno/energiaPotencial.html", "_self"))
        } else if (main.includes("2")) {

        } else if (main.includes("3")) {
           document.querySelector("#eletricidade").addEventListener("click", () => window.open("../terceiroAno/eletricidade.html", "_self")) 
           document.querySelector("#eletrodinamica").addEventListener("click", () => window.open("../terceiroAno/eletrodinamica.html", "_self"))
        }
    }
})
var loop

function menu() {
    document.querySelector(".menu-bar").classList.toggle("change")

    if (loop == 1) {
        document.querySelector("#opcoes").style = "left: -240px;"
        document.querySelector(".main").style.opacity = 1
        loop = 0
    } else {
        document.querySelector("#opcoes").style = "left: 0px;"
        document.querySelector(".main").style.opacity = .5
        loop = 1
    }
}

function ocultar() {
    if(window.scrollY > 250) {
        document.querySelector(".top-btn").style.display = "flex"
    } else {
        document.querySelector(".top-btn").style.display = "none"
    }
}