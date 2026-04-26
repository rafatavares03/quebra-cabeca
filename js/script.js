const baralho = document.getElementById("baralho");
const tabuleiro = document.getElementById("tabuleiro");
const niveis = [[5,3],[6,4],[10,10]];
let arrastando = false;

let nivelAtual = 1;
const jogo = {
  img: null
}

function recortarImagem(imgSRC) {
  const linhas = niveis[nivelAtual][0];
  const colunas = niveis[nivelAtual][1];
  return new Promise((resolve) => {
    if(jogo.img === null) {
      reject("Imagem não carregada");
    } 
    const img = new Image();
    img.src = jogo.img;
    img.onload = () => {
    const blocos = [];
    const dimension = {
      height: Math.floor(tabuleiro.offsetHeight / linhas),
      width: Math.floor(tabuleiro.offsetWidth / colunas),
    };
    
    let idCelula = 0;
    for(let i = 0; i < linhas; i++) {
      for(let j = 0; j < colunas; j++) {
        const canva = document.createElement("canvas");
        canva.id = idCelula;
        canva.classList.add("bloco");
        
        canva.draggable = true;

        canva.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", canva.id);
          e.dataTransfer.effectAllowed = "move";
        });

        canva.width = dimension.width;
        canva.height = dimension.height;

        const canvaContext = canva.getContext("2d");
        canvaContext.drawImage(
          img,
          dimension.width * j, dimension.height * i,
          dimension.width, dimension.height,
          0, 0,
          dimension.width, dimension.height
        );
        
        blocos.push(canva);
        idCelula+=2;
      }
    }
    
    resolve(blocos);
  }
  })
}

async function getImage(width, height) {
  const url = `https://picsum.photos/${width}/${height}`;
  const response = await fetch(url);
  return response.url;
}

function ativarCarregamento() {
  const loaders = document.querySelectorAll(".loader");
  loaders.forEach((loader) => {
    loader.style.display = 'block';
  })
}

function desativarCarregamento() {
  const loaders = document.querySelectorAll(".loader");
  loaders.forEach((loader) => {
    loader.style.display = 'none';
  })
}

async function montarBaralho() {
  const blocos = await recortarImagem();

  while (blocos.length > 0) {
    let bloco = Math.floor(Math.random() * blocos.length);
    baralho.appendChild(blocos[bloco]);
    blocos.splice(bloco, 1);
  }
}


function mostrarResultado(texto) {
  const modal = document.getElementById("resultado-modal");
  const resultadoContainer = document.getElementById("resultado");
  const h1 = document.createElement('h1');
  h1.innerHTML = "Parabéns, você venceu!"
  const img = document.createElement('img');
  img.src = jogo.img

  resultadoContainer.appendChild(h1);
  resultadoContainer.appendChild(img);
  modal.classList.remove('hide');
}

async function montarTabuleiro(){
    const peca = baralho.getElementsByClassName("bloco")[0];

    const linhas = niveis[nivelAtual][0];
    const colunas = niveis[nivelAtual][1];
    const largura = peca.width;
    const altura = peca.height;
    
    let idCelula = 1;
    
    for(let i = 0; i < linhas; i++) {
      for(let j = 0; j < colunas; j++) {
        const celula = document.createElement("div");

        celula.id = idCelula;
        celula.classList.add("tabuleiro-container");
        
        celula.addEventListener("dragleave", () => {
          celula.classList.remove("destacado");
        });
        
        // 
        celula.addEventListener("dragover", (e) => {
          celula.classList.add("destacado");
          e.preventDefault();
        });

        celula.addEventListener("drop", (e) => {
          celula.classList.remove("destacado");
          e.preventDefault();
          
          const id = e.dataTransfer.getData("text/plain");
          const bloco = document.getElementById(id);
          
          celula.appendChild(bloco);
          
          if(verificarVitoria()) {
            mostrarResultado();
          }
        });
        //
        
        celula.style.width = largura + "px";
        celula.style.height = altura + "px";
        
        tabuleiro.appendChild(celula);
        idCelula+=2;
      }
    }
    tabuleiro.style.display = "grid";
    tabuleiro.style.gap = "0";
  tabuleiro.style.gridTemplateRows = `repeat(${linhas}, ${altura}px)`;
  tabuleiro.style.gridTemplateColumns = `repeat(${colunas}, ${largura}px)`;
}

function limparBaralho() {
  while(baralho.children.length > 1) {
    baralho.removeChild(baralho.lastChild);
  }
}

function limparTabuleiro() {
  tabuleiro.innerHTML = ""
}


function verificarVitoria() {
  const tabu = document.querySelectorAll(".tabuleiro-container");

  for (let celula of tabu) {
    if (celula.children.length === 0) {
      return false;
    }

    const bloco = celula.children[0];

    if ((Number(bloco.id) + 1) !== Number(celula.id)) {
      return false;
    }
  }

  return true;
}


async function iniciarJogo(){
  ativarCarregamento();
  jogo.img = await getImage(tabuleiro.offsetWidth, tabuleiro.offsetHeight);
  await montarBaralho();
  await montarTabuleiro();
  desativarCarregamento();

  baralho.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  baralho.addEventListener("drop", (e) => {
    e.preventDefault();

    const id = e.dataTransfer.getData("text/plain");
    const bloco = document.getElementById(id);

    baralho.appendChild(bloco);
  });
  
  // resolverJogo();
}


function resolverJogo() {
  const celulas = document.querySelectorAll(".bloco-tabuleiro");

  celulas.forEach((celula) => {
    const idEsperado = Number(celula.id) - 1;
    const bloco = document.getElementById(idEsperado);

    if (bloco) {
      celula.appendChild(bloco);
    }
  });
}

document.addEventListener("DOMContentLoaded", iniciarJogo);
document.querySelector("#nivel").addEventListener("change", async (e) => {
  const nivelSelecionado = e.target.value;
  if(nivelSelecionado !== nivelAtual) {
    ativarCarregamento();
    nivelAtual = nivelSelecionado;
    limparBaralho();
    limparTabuleiro();
    await montarBaralho();
    await montarTabuleiro();
    desativarCarregamento();
  }
});

document.querySelector("#resultado-modal").addEventListener("click", (e) => {
  const modal = document.querySelector("#resultado-modal");
  if(e.target === modal) {
    const resultado = document.querySelector("#resultado");
    resultado.innerHTML = '';
    modal.classList.add('hide');
  }
})

document.addEventListener("dragstart", () => {
  arrastando = true;
});

document.addEventListener("dragend", () => {
  arrastando = false;
});

document.addEventListener("dragover", (e) => {
  if(!arrastando) return;

  const margem = 150;
  const velocidade = 5;

  if (e.clientY < margem) {
    window.scrollBy(0, -velocidade);
  } else if (window.innerHeight - e.clientY < margem) {
    window.scrollBy(0, velocidade);
  }
});