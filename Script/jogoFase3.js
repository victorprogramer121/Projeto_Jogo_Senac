import Personagem from "../Entitys/personagens.js";
import Plataforma from "../Entitys/plataforma.js";
import Fase3 from "../Data/fase3.js";

const tela3 = document.querySelector("#tela3");
const ctx = tela3.getContext("2d");

tela3.width = window.innerWidth;
tela3.height = window.innerHeight;

const quadrado = 64;

const jogador = new Personagem(Fase3.player.x, Fase3.player.y, Fase3);

function criarCenario() {
  Fase3.plataforma1.forEach((square) => {
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

  for (let y = 0; y <= tela3.height; y += quadrado) {
    for (let x = 0; x <= tela3.width; x += quadrado) {
      ctx.strokeRect(x + 0.5, y + 0.5, quadrado, quadrado);

      ctx.fillText(`x:${x} y:${y}`, x + 2, y + 10);
    }
  }
}

function desenhar() {
  ctx.clearRect(0, 0, tela3.width, tela3.height);

  desenharGrid();
  criarCenario();

  jogador.atualizar(input);

  jogador.desenhar(ctx);

  requestAnimationFrame(desenhar);
}

desenhar();
