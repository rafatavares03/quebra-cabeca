function recortarImagem(imgSRC, blocosQTD) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imgSRC;
    img.onload = () => {
    const blocos = [];
    const dimension = {
      width: img.width / blocosQTD,
      height: img.height / blocosQTD
    };
    
    for(let i = 0; i < blocosQTD; i++) {
      for(let j = 0; j < blocosQTD; j++) {
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

document.addEventListener("DOMContentLoaded", async () => {
  let imageURL = await getImage(800,800);
  recortarImagem(imageURL, 5).then((blocos) => {
    let baralho = document.getElementById("baralho");
    while(blocos.length > 0) {
      let bloco = Math.floor(Math.random() * blocos.length);
      baralho.appendChild(blocos[bloco]);
      blocos.splice(bloco, 1);
    }
  });
});

