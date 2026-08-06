const Fase1 = {
  id: "Fase1",
  nome: "Fase1",

  tileSize: 64,
  width: 64,
  height: 64,

  player: {
    velocidade: 4,
    x: 1024,
    y: 320,
    img: "../Imagem/personagens/clara.png",
  },
  plataforma1: [
    {
      id: "ch_1",
      x: 1144,
      y: 378,
      width: 0,
      height: 0,
      img: "../Imagem/cenario/assets/armario/armario1.png",
      efeito: false,
    },
    // {
    //   id: "ch_2",
    //   x: 1152,
    //   y: 320,
    //   width: 64,
    //   height: 64,
    //   img: "",
    //   efeito: false,
    // },
    // {
    //   id: "ch_3",
    //   x: 1216,
    //   y: 384,
    //   width: 64,
    //   height: 64,
    //   img: "",
    //   efeito: false,
    // },
  ],
  // PAREDES INVISÍVEIS — cada objeto é um retângulo de colisão
  // x, y = posição do pixel (canto superior esquerdo)
  // width, height = tamanho da área bloqueada
  paredes: [
    {
      id: "parede_1",
      x: 1186,
      y: 400,
      width: 0.5,
      height: 0.5,
      img: "",
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

export default Fase1;
