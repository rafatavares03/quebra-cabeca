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
    
    for(let i = 0; i < linhas; i++) {
      for(let j = 0; j < colunas; j++) {
        const canva = document.createElement("canvas");
        canva.width = dimension.width;
        canva.height = dimension.height;
        canva.classList.add("bloco");

        const canvaContext = canva.getContext("2d");
        canvaContext.drawImage(
          img,
          dimension.width * j, dimension.height * i,
          dimension.width, dimension.height,
          0, 0,
          dimension.width, dimension.height
        );
        
        blocos.push(canva);
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
  ativarCarregamento();
  let imageURL = await getImage(tabuleiro.offsetWidth, tabuleiro.offsetHeight);
  recortarImagem(imageURL, 5, 4).then((blocos) => {
    desativarCarregamento();
    while(blocos.length > 0) {
      let bloco = Math.floor(Math.random() * blocos.length);
      baralho.appendChild(blocos[bloco]);
      blocos.splice(bloco, 1);
    }
  });
}

const baralho = document.getElementById("baralho");
const tabuleiro = document.getElementById("tabuleiro");

document.addEventListener("DOMContentLoaded", montarBaralho());