class Personagem {
  constructor(x, y, dados) {
    this.x = x;
    this.y = y;

    // "dados" é o objeto da fase atual (Inicio, Fase1, Fase2 ou Fase3).
    // Antes a classe importava "Inicio" fixo, por isso fase1/2/3
    // sempre usavam a velocidade, o sprite e as paredes do início.
    this.dados = dados;

    this.velocidade = dados.player.velocidade;

    // SPRITE
    this.img = new Image();
    this.img.src = dados.player.img;

    this.tamanho = 64;

    // DIREÇÃO
    this.direcao = "baixo";
    this.estado = "idle";

    // ANIMAÇÃO
    this.linha = 0;

    this.framesWalk = [0, 1, 2, 3];

    this.indiceFrame = 0;
    this.frame = 0;

    this.tempoFrame = 0;
    this.intervaloFrame = 120; // ↑ mais estável (100 pode ficar rápido demais)
  }

  atualizar(input, deltaTime) {
    this.mover(input);
    this.animar(deltaTime);
  }

  // Verifica se um retângulo (x, y, tamanho, tamanho) colide com alguma parede
  colideComParede(x, y) {
    const paredes = this.dados.paredes || [];

    for (const parede of paredes) {
      const colide =
        x < parede.x + parede.width &&
        x + this.tamanho > parede.x &&
        y < parede.y + parede.height &&
        y + this.tamanho > parede.y;

      if (colide) return true;
    }

    return false;
  }

  mover(input) {
    let andando = false;

    // Move eixo X e eixo Y separadamente,
    // testando colisão antes de confirmar cada um.
    // Isso permite "deslizar" na parede em vez de travar de vez.

    if (input.direita) {
      const novoX = this.x + this.velocidade;
      if (!this.colideComParede(novoX, this.y)) this.x = novoX;
      this.direcao = "direita";
      andando = true;
    }

    if (input.esquerda) {
      const novoX = this.x - this.velocidade;
      if (!this.colideComParede(novoX, this.y)) this.x = novoX;
      this.direcao = "esquerda";
      andando = true;
    }

    if (input.cima) {
      const novoY = this.y - this.velocidade;
      if (!this.colideComParede(this.x, novoY)) this.y = novoY;
      this.direcao = "cima";
      andando = true;
    }

    if (input.baixo) {
      const novoY = this.y + this.velocidade;
      if (!this.colideComParede(this.x, novoY)) this.y = novoY;
      this.direcao = "baixo";
      andando = true;
    }

    this.estado = andando ? "walk" : "idle";
  }

  animar(deltaTime) {
    // direção → linha correta da sprite
    if (this.direcao === "baixo") this.linha = 0;
    if (this.direcao === "direita") this.linha = 1;
    if (this.direcao === "cima") this.linha = 2;
    if (this.direcao === "esquerda") this.linha = 3;

    // idle trava frame
    if (this.estado === "idle") {
      this.frame = 0;
      this.indiceFrame = 0;
      this.tempoFrame = 0;
      return;
    }

    // segurança caso deltaTime venha quebrado
    if (!deltaTime) deltaTime = 16;

    this.tempoFrame += deltaTime;

    // loop de animação estável
    while (this.tempoFrame >= this.intervaloFrame) {
      this.tempoFrame -= this.intervaloFrame;

      this.indiceFrame = (this.indiceFrame + 1) % this.framesWalk.length;

      this.frame = this.framesWalk[this.indiceFrame];
    }
  }

  desenhar(ctx) {
    if (!this.img.complete) return;

    ctx.drawImage(
      this.img,

      this.frame * this.tamanho,
      this.linha * this.tamanho,

      this.tamanho /* x*/,
      this.tamanho /* y*/,

      this.x,
      this.y,

      this.tamanho,
      this.tamanho
    );
  }
}

export default Personagem;
