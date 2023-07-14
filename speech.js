const textarea = document.querySelector("#textarea")
const btnGravar = document.querySelector("#btnGravar")
const btnParar = document.querySelector("#btnParar")
const btnBaixarPDF = document.querySelector("#btnBaixarPDF")
const btnBaixarDoc = document.querySelector("#btnBaixarDoc")
const btnLimpar = document.querySelector("#btnLimpar")

class speechApi {
    constructor() {
        const SpeechToText = window.SpeechRecognition ||
                            window.webkitSpeechRecognition
        this.speechApi = new SpeechToText()
        this.output = textarea.output
        this.speechApi.continuous = true
        this.speechApi.lang = 'pt-BR'

        this.speechApi.onresult = e => {
            var resultIndex = e.resultIndex
            var transcript = e.results[resultIndex][0].transcript

            textarea.value += transcript
        }
    }

    start() {
        this.speechApi.start()
    }

    stop() {
        this.speechApi.stop()
    }
}

var speech = new speechApi()

var titulo = ("Fala convertida em texto com o B-Convert");


    btnParar.disabled = true
    btnBaixarPDF.disabled = true
    btnBaixarDoc.disabled = true
    btnLimpar.disabled = true

textarea.addEventListener('click', () => {    
    btnBaixarPDF.disabled = false
    btnBaixarDoc.disabled = false
    btnLimpar.disabled = false
})

btnGravar.addEventListener('click', () => {
    btnGravar.disabled = true;
    btnParar.disabled = false;
    speech.start()
})

btnParar.addEventListener('click', () => {
    btnGravar.disabled = false;
    btnParar.disabled = true;
    btnBaixarPDF.disabled = false
    btnBaixarDoc.disabled = false
    btnLimpar.disabled = false

    speech.stop()
})

btnBaixarPDF.addEventListener('click', () => {
    var text = textarea.value
    //var filename = "B-Convert.pdf"

    // Instanciar o jsPDF
    var doc = new jsPDF();
    
    // Conteúdo do PDF
    //doc.setFontStyle('bold').setFontSize(12).text(titulo + "\n" + linhas + "\n", 10, 10);
    //quebrar linhas
    var linhas = doc.splitTextToSize(text, 200);
    //doc.text(linhas, 10, 10)

    doc.setFontStyle('bold').setFontSize(12).text(linhas, 10, 10);
    
    // Nomear e salvar PDF
    doc.save('B-Convert.pdf');

    //download(doc, filename)
    
    btnBaixarDoc.disabled = true
    btnBaixarPDF.disabled = true
})

btnBaixarDoc.addEventListener('click', () => {
    var text = textarea.value
    var filename = "B-Convert.doc"

    download(titulo + "\n\n" + text, filename)

    btnBaixarPDF.disabled = true
    btnBaixarDoc.disabled = true
})

function download(text, filename) {
    var element = document.createElement('a')

    element.setAttribute('href', 'data:text/plaincharset=UTF-8,' +
    encodeURIComponent(text))

    element.setAttribute('download', filename)

    element.style.display = 'none'

    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}

btnLimpar.addEventListener('click', () => {
    textarea.value = ""
    btnGravar.disabled = false
    btnParar.disabled = true
    btnBaixarPDF.disabled = true
    btnBaixarDoc.disabled = true
    btnLimpar.disabled = true
    speech.stop()
})
