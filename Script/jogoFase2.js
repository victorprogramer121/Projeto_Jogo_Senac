import Personagem from "../Entitys/personagens.js";
import Plataforma from "../Entitys/plataforma.js";
import Fase2 from "../Data/fase2.js"
 
const tela2 = document.querySelector("#tela2");
const ctx = tela2.getContext("2d");
 
tela2.width = window.innerWidth;
tela2.height = window.innerHeight;
 
const quadrado = 64;
 
const jogador = new Personagem(
    Fase2.player.x,
    Fase2.player.y,
    Fase2
);
 
function criarCenario() {
    Fase2.plataforma1.forEach((square) => {
    const p = new Plataforma(square.x, square.y, square.img);
    p.desenhar(ctx);
  });
}
 
const input = {
  direita: false,
  esquerda: false,
  cima: false,
  baixo: false,
};
 
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "d":
      input.direita = true;
      break;
 
    case "a":
      input.esquerda = true;
      break;
 
    case "w":
      input.cima = true;
      break;
 
    case "s":
      input.baixo = true;
      break;
  }
});
 
// Quando solta a tecla
document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "d":
      input.direita = false;
      break;
 
    case "a":
      input.esquerda = false;
      break;
 
    case "w":
      input.cima = false;
      break;
 
    case "s":
      input.baixo = false;
      break;
  }
});
 
function desenharGrid() {
  ctx.font = "9px Arial";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
 
  for (let y = 0; y <= tela2.height; y += quadrado) {
    for (let x = 0; x <= tela2.width; x += quadrado) {
      ctx.strokeRect(x + 0.5, y + 0.5, quadrado, quadrado);
 
      ctx.fillText(`x:${x} y:${y}`, x + 2, y + 10);
    }
  }
}
 
function desenhar() {
  ctx.clearRect(0, 0, tela2.width, tela2.height);
 
  desenharGrid();
  criarCenario();
 
  jogador.atualizar(input);
 
 
 
  jogador.desenhar(ctx);
 
 
  requestAnimationFrame(desenhar);
}
 
desenhar();