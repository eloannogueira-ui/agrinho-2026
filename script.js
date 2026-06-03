// Aguarda o carregamento completo da árvore DOM
document.addEventListener('DOMContentLoaded', () => {
    inicializarAccordion();
    inicializarAcessibilidade();
    inicializarFormularios();
});

/**
 * Lógica do Componente Accordion Interativo
 */
function inicializarAccordion() {
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            
            // Fecha todos os outros accordions (efeito sanfona single-open)
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.style.maxHeight = null;
            });
            document.querySelectorAll('.accordion-header').forEach(item => {
                item.setAttribute('aria-expanded', 'false');
            });

            // Alterna o estado do item clicado
            if (!isExpanded) {
                header.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

/**
 * Core de Acessibilidade: Controle de fontes, cores e SpeechSynthesis API
 */
function inicializarAcessibilidade() {
    let escalaAtual = 1;
    const body = document.body;
    let somUtterance = null;

    // Elementos de Controle
    const btnAumentar = document.getElementById('btn-aumentar');
    const btnDiminuir = document.getElementById('btn-diminuir');
    const btnTema = document.getElementById('btn-tema');
    const btnOuvir = document.getElementById('btn-ouvir');
    const btnParar = document.getElementById('btn-parar');

    // Escalonamento de Fontes
    btnAumentar.addEventListener('click', () => {
        if(escalaAtual < 1.4) {
            escalaAtual += 0.1;
            document.documentElement.style.setProperty('--fator-escala', escalaAtual);
        }
    });

    btnDiminuir.addEventListener('click', () => {
        if(escalaAtual > 0.8) {
            escalaAtual -= 0.1;
            document.documentElement.style.setProperty('--fator-escala', escalaAtual);
        }
    });

    // Alternador de Tema Escuro/Claro
    btnTema.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });

    // Leitura por Voz Inteligente (Ignora controles, foca apenas na tag <main>)
    btnOuvir.addEventListener('click', () => {
        // Evita sobreposição de vozes paralelas
        window.speechSynthesis.cancel();

        const conteudoPrincipal = document.querySelector('.conteudo-artigo');
        if (!conteudoPrincipal) return;

        // Captura apenas o texto puro do artigo principal
        const textoParaLer = conteudoPrincipal.innerText;

        somUtterance = new SpeechSynthesisUtterance(textoParaLer);
        somUtterance.lang = 'pt-BR';
        somUtterance.rate = 1.1; // Velocidade confortável

        window.speechSynthesis.speak(somUtterance);
    });

    btnParar.addEventListener('click', () => {
        window.speechSynthesis.cancel();
    });
}

/**
 * Validação e Envio dos Formulários da Página
 */
function inicializarFormularios() {
    const formSeminario = document.getElementById('form-seminario');
    const formComentario = document.getElementById('form-comentario');
    const listaComentarios = document.getElementById('lista-comentarios');

    formSeminario.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Inscrição realizada com sucesso! Verifique seu e-mail corporativo.');
        formSeminario.reset();
    });

    formComentario.addEventListener('submit', (e) => {
        e.preventDefault();
        const texto = document.getElementById('texto-comentario').value;
        
        // Estruturação dinâmica do novo comentário na tela
        const novoComentario = document.createElement('div');
        novoComentario.style.padding = '1rem';
        novoComentario.style.marginTop = '1rem';
        novoComentario.style.backgroundColor = 'rgba(0,0,0,0.03)';
        novoComentario.style.borderRadius = '8px';
        novoComentario.innerHTML = `<strong>Leitor Anônimo:</strong> <p>${texto}</p>`;
        
        listaComentarios.appendChild(novoComentario);
        formComentario.reset();
    });
}