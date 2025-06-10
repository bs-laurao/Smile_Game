// Elementos DOM
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');
const resposta = document.getElementById('resposta');

// Estado do jogo
const estado = {
    desempenho: 0,
    tentativas: 0,
    acertos: 0,
    jogar: true,
    elementos: document.querySelectorAll('#linha1 > div')
};

// Funções de manipulação de UI
function atualizaPlacar() {
    estado.desempenho = (estado.acertos / estado.tentativas) * 100 || 0;
    resposta.innerHTML = `Placar - Acertos: ${estado.acertos} Tentativas: ${estado.tentativas} Desempenho: ${Math.round(estado.desempenho)}%`;
}

function adicionaImagem(elemento, url, classe) {
    elemento.className = classe;
    elemento.innerHTML = `<img src="${url}" class="imagem-jogo">`;
}

function limparElementos() {
    estado.elementos.forEach(el => {
        el.className = "inicial";
        el.innerHTML = "";
    });
}

// Lógica do jogo
function reiniciar() {
    estado.desempenho = 0;
    estado.tentativas = 0;
    estado.acertos = 0;
    estado.jogar = true;
    
    limparElementos();
    atualizaPlacar();
    btnJogarNovamente.classList.remove('invisivel');
    btnReiniciar.classList.add('invisivel');
}

function jogarNovamente() {
    estado.jogar = true;
    limparElementos();
}

function verifica(obj) {
    if (!estado.jogar) {
        alert('Clique em "Jogar Novamente"');
        return;
    }

    estado.jogar = false;
    estado.tentativas++;
    
    // Controle de botões
    if (estado.tentativas === 5) {
        btnJogarNovamente.classList.add('invisivel');
        btnReiniciar.classList.remove('invisivel');
    }

    const sorteado = Math.floor(Math.random() * 5);
    const objSorteado = document.getElementById(sorteado);
    
    if (obj.id == sorteado) {
        adicionaImagem(obj, "https://i.pinimg.com/736x/92/d9/77/92d9771ac5ae5f02c66c2fec39923cb6.jpg", "acertou");
        estado.acertos++;
    } else {
        adicionaImagem(obj, "https://i.pinimg.com/736x/33/a6/09/33a609ab09d1350583058e75f67c404e.jpg", "errou");
        adicionaImagem(objSorteado, "https://i.pinimg.com/736x/92/d9/77/92d9771ac5ae5f02c66c2fec39923cb6.jpg", "acertou");
    }

    atualizaPlacar();
}

// Event Listeners
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);

// Inicialização
reiniciar();