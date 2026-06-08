// Aguarda o carregamento completo da árvore DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // SEÇÃO INTERATIVA: ACCORDION (BENEFÍCIOS DE IA NO CAMPO)
    // ==========================================================================
    const headersAccordion = document.querySelectorAll('.accordion-header');

    headersAccordion.forEach(header => {
        header.addEventListener('click', function() {
            const itemPai = this.parentElement;
            const estaAtivo = itemPai.classList.contains('ativo');
            const icone = this.querySelector('.icone-status');
            
            // Fecha todos os itens abertos (efeito colapso único)
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('ativo');
                const btn = item.querySelector('.accordion-header');
                if (btn) btn.setAttribute('aria-expanded', 'false');
                const ico = item.querySelector('.icone-status');
                if (ico) ico.textContent = '+';
            });

            // Se o item clicado não estava ativo, abre ele
            if (!estaAtivo) {
                itemPai.classList.add('ativo');
                this.setAttribute('aria-expanded', 'true');
                icone.textContent = '−';
            }
        });
    });

    // ==========================================================================
    // SEÇÃO INTERATIVA: FORMULÁRIO & COMENTÁRIOS
    // ==========================================================================
    const formSeminario = document.getElementById('form-seminario');
    const formComentario = document.getElementById('form-comentario');
    const txtComentario = document.getElementById('txt-comentario');
    const listaComentarios = document.getElementById('lista-comentarios');

    formSeminario.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Inscrição realizada com sucesso! Prepare-se para o futuro do Agro.');
        formSeminario.reset();
    });

    formComentario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const texto = txtComentario.value.trim();
        if(texto === '') return;

        // Criando elemento visual dinamicamente para o comentário
        const card = document.createElement('div');
        card.classList.add('card-comentario');
        
        const paragrafo = document.createElement('p');
        paragrafo.textContent = texto;
        
        card.appendChild(paragrafo);
        listaComentarios.prepend(card); // Insere no topo da lista
        
        txtComentario.value = '';
    });

    // ==========================================================================
    // SISTEMA DE ACESSIBILIDADE AVANÇADA (Fontes, Contraste e Speech API)
    // ==========================================================================
    const raizElemento = document.documentElement;
    const botaoAumentar = document.getElementById('btn-aumentar-fonte');
    const botaoDiminuir = document.getElementById('btn-diminuir-fonte');
    const botaoContraste = document.getElementById('btn-modo-contraste');
    const botaoLerVoz = document.getElementById('btn-ler-voz');
    const botaoPararVoz = document.getElementById('btn-parar-voz');

    let fatorAtual = 1;

    // Controle de Tamanho de Fonte
    botaoAumentar.addEventListener('click', () => {
        if(fatorAtual < 1.4) {
            fatorAtual += 0.1;
            raizElemento.style.setProperty('--fator-fonte', fatorAtual);
        }
    });

    botaoDiminuir.addEventListener('click', () => {
        if(fatorAtual > 0.8) {
            fatorAtual -= 0.1;
            raizElemento.style.setProperty('--fator-fonte', fatorAtual);
        }
    });

    // Alternar modo escuro / claro
    botaoContraste.addEventListener('click', () => {
        document.body.classList.toggle('modo-claro');
    });

    // SpeechSynthesis API (Leitura de Voz Inteligente)
    let expressaoFala = null;

    botaoLerVoz.addEventListener('click', () => {
        // Interrompe leituras remanescentes
        window.speechSynthesis.cancel();

        // Captura o conteúdo estruturado limpando tags de botões e imagens
        const containerAlvo = document.getElementById('texto-leitura');
        if(!containerAlvo) return;

        // Pega os parágrafos e citações puras do artigo
        const blocosDeTexto = containerAlvo.querySelectorAll('p, blockquote, h2');
        let textoCompleto = "";
        
        blocosDeTexto.forEach(bloco => {
            textoCompleto += bloco.textContent + " . ";
        });

        expressaoFala = new SpeechSynthesisUtterance(textoCompleto);
        expressaoFala.lang = 'pt-BR';
        expressaoFala.rate = 1.0; // Velocidade natural

        // Gerenciamento de estado dos botões da interface
        expressaoFala.onstart = () => {
            botaoLerVoz.disabled = true;
            botaoPararVoz.disabled = false;
        };

        expressaoFala.onend = () => {
            botaoLerVoz.disabled = false;
            botaoPararVoz.disabled = true;
        };

        window.speechSynthesis.speak(expressaoFala);
    });

    botaoPararVoz.addEventListener('click', () => {
        window.speechSynthesis.cancel();
        botaoLerVoz.disabled = false;
        botaoPararVoz.disabled = true;
    });
});