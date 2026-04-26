function recortarImagem(imgSRC, linhas, colunas) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imgSRC;
    img.onload = () => {
    const blocos = [];
    const dimension = {
      width: img.width / colunas,
      height: img.height / linhas
    };
    
    let idCelula = 0;
    for(let i = 0; i < linhas; i++) {
      for(let j = 0; j < colunas; j++) {
        const canva = document.createElement("canvas");
        canva.id = idCelula;
        canva.classList.add("bloco-baralho");
        
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

async function montarBaralho(linhas, colunas) {
  ativarCarregamento();

  let imageURL = await getImage(tabuleiro.offsetWidth, tabuleiro.offsetHeight);
  const blocos = await recortarImagem(imageURL, linhas, colunas);

  desativarCarregamento();

  while (blocos.length > 0) {
    let bloco = Math.floor(Math.random() * blocos.length);
    baralho.appendChild(blocos[bloco]);
    blocos.splice(bloco, 1);
  }
}


function mostrarMensagem(texto) {
  const msg = document.getElementById("mensagem");

  msg.textContent = texto;
  msg.style.display = "block";

  setTimeout(() => {
    msg.style.display = "none";
  }, 2000);
}

async function montarTabuleiro(linhas, colunas){
    const ima = baralho.getElementsByClassName("bloco-baralho")[0];

    const largura = ima.width;
    const altura = ima.height;

    let idCelula = 1;

    for(let i = 0; i < linhas; i++) {
      for(let j = 0; j < colunas; j++) {
        const celula = document.createElement("div");

        celula.id = idCelula;
        celula.classList.add("bloco-tabuleiro");

        // 
        celula.addEventListener("dragover", (e) => {
          e.preventDefault();
        });

        celula.addEventListener("drop", (e) => {
          e.preventDefault();

          const id = e.dataTransfer.getData("text/plain");
          const bloco = document.getElementById(id);

          celula.appendChild(bloco);

          if(verificarVitoria()) {
              mostrarMensagem("Parabens!!!!!!!!!!!!");
          }
        });
        //

        celula.style.width = largura + "px";
        celula.style.height = altura + "px";

        tabuleiro.appendChild(celula);
        idCelula+=2;
      }
    }
}


function verificarVitoria() {
  const tabu = document.querySelectorAll(".bloco-tabuleiro");

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
  const linhas = 5;
  const colunas = 4;
  await montarBaralho(linhas, colunas);
  await montarTabuleiro(linhas, colunas);
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


const baralho = document.getElementById("baralho");
const tabuleiro = document.getElementById("tabuleiro");


document.addEventListener("DOMContentLoaded", iniciarJogo);




