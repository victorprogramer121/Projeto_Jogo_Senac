import Personagem from "../Entitys/personagens.js";
import Plataforma from "../Entitys/plataforma.js";
import Inicio from "../Data/inicio.js"
 
const tela = document.querySelector("#tela");
const ctx = tela.getContext("2d");
 
tela.width = window.innerWidth;
tela.height = window.innerHeight;
 
const quadrado = 64;
 
const jogador = new Personagem(
    Inicio.player.x,
    Inicio.player.y,
    Inicio
);
 
function criarCenario() {
  Inicio.plataforma1.forEach((square) => {
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
 
const caixaDialogo = document.querySelector("#caixa-dialogo");
const textoDialogo = document.querySelector("#texto-dialogo");
 
let interacaoAtiva = null;
let timeoutTexto = null;
 
function colide(persognagem, zona) {
  return (
    persognagem.x < zona.x + zona.width &&
    persognagem.x + persognagem.tamanho > zona.x &&
    persognagem.y < zona.y + zona.height &&
    persognagem.y + persognagem.tamanho > zona.y
  );
}
 
function mostrarTexto(texto, duracaoMs) {
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
  const zonas = Inicio.interacoes || [];
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
 
function desenharGrid() {
  ctx.font = "9px Arial";
  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
 
  for (let y = 0; y <= tela.height; y += quadrado) {
    for (let x = 0; x <= tela.width; x += quadrado) {
      ctx.strokeRect(x + 0.5, y + 0.5, quadrado, quadrado);
 
      ctx.fillText(`x:${x} y:${y}`, x + 2, y + 10);
    }
  }
}
 
function desenhar() {
  ctx.clearRect(0, 0, tela.width, tela.height);
 
  desenharGrid();  // Comentar essa linha caso queira tirar o grid
  criarCenario();
  
 
  jogador.atualizar(input);
 
  verificarInteracoes();
 
  jogador.desenhar(ctx);
 
  requestAnimationFrame(desenhar);
}
 
requestAnimationFrame(desenhar);