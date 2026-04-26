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

async function montarTabuleiro(linhas, colunas){
    const ima = baralho.getElementsByClassName("bloco-baralho")[0];

    const largura = ima.getBoundingClientRect().width;
    const altura = ima.getBoundingClientRect().height;

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
        });
        //

        celula.style.width = largura + "px";
        celula.style.height = altura + "px";

        tabuleiro.appendChild(celula);
        idCelula+=2;
      }
    }
}


async function iniciarJogo(){
  const linhas = 5;
  const colunas = 4;
  await montarBaralho(linhas, colunas);
  await montarTabuleiro(linhas, colunas);
}




const baralho = document.getElementById("baralho");
const tabuleiro = document.getElementById("tabuleiro");

baralho.addEventListener("dragover", (e) => {
  e.preventDefault();
});

baralho.addEventListener("drop", (e) => {
  e.preventDefault();

  const id = e.dataTransfer.getData("text/plain");
  const bloco = document.getElementById(id);

  baralho.appendChild(bloco);
});



document.addEventListener("DOMContentLoaded", iniciarJogo);




