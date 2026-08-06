import Personagem from "../Entitys/personagens.js";
import Plataforma from "../Entitys/plataforma.js";
import Fase1 from "../Data/fase1.js";

const tela1 = document.querySelector("#tela1");
const ctx = tela1.getContext("2d");

tela1.width = window.innerWidth;
tela1.height = window.innerHeight;

const quadrado = 64;

const jogador = new Personagem(Fase1.player.x, Fase1.player.y, Fase1);

function criarCenario() {
  Fase1.paredes.forEach((square) => {
    const p = new Plataforma(square.x, square.y, square.img);
    p.desenhar(ctx);
  });
}

function criarCenario2() {
  Fase1.plataforma1.forEach((square) => {
    const p = new Plataforma(square.x, square.y, square.img);
    p.desenhar(ctx);
  });
}

const MOSTRAR_PAREDES = true;

function desenharParedes() {
  if (!MOSTRAR_PAREDES) return;

  ctx.save();
  ctx.fillStyle = "rgba(255, 0, 0, 0.35)";
  ctx.strokeStyle = "red";
  ctx.lineWidth = 1;

  (Fase1.paredes || []).forEach((parede) => {
    ctx.fillRect(parede.x, parede.y, parede.width, parede.height);
    ctx.strokeRect(parede.x, parede.y, parede.width, parede.height);
  });

  ctx.restore();
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
  // ctx.strokeStyle = "";

  for (let y = 0; y <= tela1.height; y += quadrado) {
    for (let x = 0; x <= tela1.width; x += quadrado) {
      ctx.strokeRect(x + 0.5, y + 0.5, quadrado, quadrado);

      ctx.fillText(`x:${x} y:${y}`, x + 2, y + 10);
    }
  }
}

function desenhar() {
  ctx.clearRect(0, 0, tela1.width, tela1.height);

  desenharGrid();
  criarCenario();
  criarCenario2();

  desenharParedes();

  jogador.atualizar(input);

  jogador.desenhar(ctx);

  requestAnimationFrame(desenhar);
}

desenhar();
