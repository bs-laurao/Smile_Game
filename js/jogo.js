// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos IDs e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  // Mostra o botão "Jogar Novamente" alterando a classe CSS
  btnJogarNovamente.className = 'visivel';
  // Oculta o botão "Reiniciar" alterando a classe CSS
  btnReiniciar.className = 'invisivel';
}

// Função "Jogar Novamente"
function jogarNovamente() {
  jogar = true;
  // Armazena todas as divs na variável "divis"
  let divis = document.getElementsByTagName("div");
  // Percorre todas as divs armazenadas
  for (let i = 0; i < divis.length; i++) {
    // Verifica se são as divs com IDs 0, 1, 2, 3 ou 4
    if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3 || divis[i].id == 4) {
      // Altera a classe CSS das divs 0, 1, 2, 3 e 4
      divis[i].className = "inicial";
      // Remove a imagem do Smile, se existir
      const imgSmile = divis[i].querySelector('#imagem');
      if (imgSmile) {
        imgSmile.remove();
      }
      // Remove a imagem de erro, se existir
      const imgErro = divis[i].querySelector('#imagemErro');
      if (imgErro) {
        imgErro.remove();
      }
    }
  }
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  // Calcula o desempenho em porcentagem
  desempenho = (acertos / tentativas) * 100;
  // Escreve o placar com os valores atualizados
  document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";
}

// Função executada quando o jogador acerta
function acertou(obj) {
  obj.className = "acertou";
  const img = new Image();
  img.id = "imagem";
  img.src = "https://i.pinimg.com/736x/92/d9/77/92d9771ac5ae5f02c66c2fec39923cb6.jpg";
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.borderRadius = "50%";
  img.style.objectFit = "cover";
  img.style.position = "absolute";
  obj.appendChild(img);
}

function erro(obj) {
  obj.className = "errou";
  const img = new Image();
  img.id = "imagemErro";
  img.src = "https://i.pinimg.com/736x/33/a6/09/33a609ab09d1350583058e75f67c404e.jpg";
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.borderRadius = "50%";
  img.style.objectFit = "cover";
  img.style.position = "absolute";
  obj.appendChild(img);
}



// Função que sorteia um número aleatório entre 0 e 2 e verifica se o jogador acertou
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;
    if (tentativas == 5) {
      // Oculta o botão "Jogar Novamente"
      btnJogarNovamente.className = 'invisivel';
      // Mostra o botão "Reiniciar"
      btnReiniciar.className = 'visivel';
    }
    // A variável "sorteado" recebe um valor inteiro aleatório
    let sorteado = Math.floor(Math.random() * 5);
    if (obj.id == sorteado) {
      acertou(obj);
      acertos++;
    } else {
      erro(obj);
      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);
    }
    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar Novamente"');
  }
}

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
