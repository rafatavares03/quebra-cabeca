const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const image = document.getElementById("source");
const baralho = document.getElementById("baralho");

image.addEventListener("load", (e) => {
  const imgBlocks = []
  const imgDimension = {
    width: image.clientWidth / 3,
    height: image.clientHeight / 3
  }
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
        const canva = document.createElement("canvas");
        canva.width = imgDimension.width;
        canva.height = imgDimension.height;
        canva.classList.add("bloco");
        baralho.appendChild(canva)
        const canvaContext = canva.getContext("2d")
        canvaContext.drawImage(image, imgDimension.width * j, imgDimension.height * i, imgDimension.width, imgDimension.height, 0, 0, imgDimension.width, imgDimension.height)
    }
  }
  console.log(imgDimension.width, imgDimension.height);
});

