// Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
    
    // --- LÓGICA DO ACCORDION (Seções Expansíveis) ---
    const headers = document.querySelectorAll(".accordion-header");
    
    headers.forEach(header => {
        header.addEventListener("click", function() {
            const item = this.parentElement;
            
            // Alterna a classe 'ativo' para abrir/fechar via CSS
            item.classList.toggle("ativo");
            
            // Log de depuração (Debugging assistido)
            console.log(`Accordion clicado: ${this.textContent}`);
        });
    });

    // --- LÓGICA DE ACESSIBILIDADE: LEITURA POR VOZ (Requisito 7) ---
    const btnLer = document.getElementById("btn-ler");
    const btnParar = document.getElementById("btn-parar");
    let sinteseVoz = window.speechSynthesis;
    let utterance = null;

    btnLer.addEventListener("click", () => {
        // Pega apenas o texto do artigo principal, ignorando menus e caixas de botões
        const textoParaLer = document.querySelector(".artigo-container").innerText;
        
        // Cancela leituras anteriores ativas
        sinteseVoz.cancel();

        utterance = new SpeechSynthesisUtterance(textoParaLer);
        utterance.lang = "pt-BR";
        utterance.rate = 1.0; // Velocidade

        sinteseVoz.speak(utterance);
        console.log("Leitura de voz iniciada no conteúdo principal.");
    });

    btnParar.addEventListener("click", () => {
        if (sinteseVoz.speaking) {
            sinteseVoz.cancel();
            console.log("Leitura de voz interrompida pelo usuário.");
        }
    });

    // --- INTERAÇÃO DE ALTERNÂNCIA DE TEMA ---
    const btnTema = document.getElementById("btn-tema");
    btnTema.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});