const Fase2 = {
  id: "Fase2",
  nome: "Fase2",

  tileSize: 64,
  width: 64,
  height: 64,

  player: {
    velocidade: 4,
    x: 128,
    y: 128,
    img: "../Imagem/personagens/clara.png",
  },
  plataforma1: [
    {
      id: "ch_1",
      x: 128,
      y: 128,
      width: 64,
      height: 64,
      img: "",
      efeito: false,
    },
  ],
  // PAREDES INVISÍVEIS — cada objeto é um retângulo de colisão
  // x, y = posição do pixel (canto superior esquerdo)
  // width, height = tamanho da área bloqueada
  paredes: [
    {
      id: "parede_1",
      x: 1152,
      y: 405,
      width: 64,
      height: 64,
    },
  ],
  interacoes: [
    {
      id: "porta_casa",
      x: 768,
      y: 512,
      width: 16,
      height: 64,
      tipo: "porta",
      destino: "fase3.html", // link para a fase dois
    },
    {
      id: "porta_casa2",
      x: 768,
      y: 576,
      width: 24,
      height: 64,
      tipo: "porta",
      destino: "fase3.html", // link para a fase dois
    },
  ],
  caixa1: {
    id: "c1_1",
    x: 64,
    y: 0,
    width: 64,
    height: 64,
    img: "",
    efeito: {
      status: true,
    },
  },
  elemento1: {
    id: "e1_1",
    x: 64,
    y: 0,
    width: 64,
    height: 64,
    img: "",
    status: true,
    texto: "",
  },
};

export default Fase2;
