import Personagem from "../Entitys/personagens.js";
import Plataforma from "../Entitys/plataforma.js";
import fase2 from "../Data/fase2.js";

const tela2 = document.querySelector("#tela2");
const ctx = tela2.getContext("2d");

tela2.width = window.innerWidth;
tela2.height = window.innerHeight;

const quadrado = 64;

const jogador = new Personagem(fase2.player.x, fase2.player.y, fase2);

function criarCenario() {
  fase2.paredes.forEach((square) => {
    const p = new Plataforma(square.x, square.y, square.img);
    p.desenhar(ctx);
  });
}

function criarCenario2() {
  fase2.plataforma1.forEach((square) => {
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

  (fase2.paredes || []).forEach((parede) => {
    ctx.fillRect(parede.x, parede.y, parede.width, parede.height);
    ctx.strokeRect(parede.x, parede.y, parede.width, parede.height);
  });

  ctx.restore();
}

const MOSTRAR_INTERACOES = true;

function desenharInteracoes() {
  if (!MOSTRAR_INTERACOES) return;

  ctx.save();
  ctx.lineWidth = 1;

  (fase2.interacoes || []).forEach((zona) => {
    if (zona.tipo === "porta") {
      ctx.fillStyle = "rgba(0, 200, 0, 0.35)";
      ctx.strokeStyle = "lime";
    } else if (zona.tipo === "texto") {
      ctx.fillStyle = "rgba(0, 120, 255, 0.35)";
      ctx.strokeStyle = "dodgerblue";
    } else {
      ctx.fillStyle = "rgba(255, 255, 0, 0.35)";
      ctx.strokeStyle = "yellow";
    }

    ctx.fillRect(zona.x, zona.y, zona.width, zona.height);
    ctx.strokeRect(zona.x, zona.y, zona.width, zona.height);
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

  for (let y = 0; y <= tela2.height; y += quadrado) {
    for (let x = 0; x <= tela2.width; x += quadrado) {
      ctx.strokeRect(x + 0.5, y + 0.5, quadrado, quadrado);

      ctx.fillText(`x:${x} y:${y}`, x + 2, y + 10);
    }
  }
}

const caixaDialogo = document.querySelector("#caixa-dialogo");
const textoDialogo = document.querySelector("#texto-dialogo");

let interacaoAtiva = null;
let timeoutTexto = null;

function colide(personagem, zona) {
  return (
    personagem.x < zona.x + zona.width &&
    personagem.x + personagem.tamanho > zona.x &&
    personagem.y < zona.y + zona.height &&
    personagem.y + personagem.tamanho > zona.y
  );
}

function mostrarTexto(texto, duracaoMs) {
  if (!caixaDialogo || !textoDialogo) return;

  textoDialogo.textContent = texto;
  caixaDialogo.classList.remove("oculto");

  if (timeoutTexto) clearTimeout(timeoutTexto);

  timeoutTexto = setTimeout(() => {
    caixaDialogo.classList.add("oculto");
    timeoutTexto = null;
  }, duracaoMs);
}

function irParaPorta(destino) {
  window.location.href = destino;
}

function verificarInteracoes() {
  const zonas = fase2.interacoes || [];
  let tocandoAlgumaZona = false;

  for (const zona of zonas) {
    if (colide(jogador, zona)) {
      tocandoAlgumaZona = true;

      if (interacaoAtiva === zona.id) continue;

      interacaoAtiva = zona.id;

      if (zona.tipo === "porta") {
        irParaPorta(zona.destino);
      }

      if (zona.tipo === "texto") {
        mostrarTexto(zona.texto, zona.duracao || 20000);
      }
    }
  }

  if (!tocandoAlgumaZona) interacaoAtiva = null;
}

function desenhar() {
  ctx.clearRect(0, 0, tela2.width, tela2.height);

  desenharGrid();
  criarCenario();
  criarCenario2();

  desenharParedes();
  desenharInteracoes();

  jogador.atualizar(input);

  verificarInteracoes();

  jogador.desenhar(ctx);

  requestAnimationFrame(desenhar);
}

desenhar();
