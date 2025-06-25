function play() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('menu-diff').style.display = 'flex';
  }
  
  function sobre() {
    alert("Este é um jogo da memória. Encontre todos os pares de cartas!");
  }
  
  let cartas = [];
  let cartasViradas = [];
  let paresEncontrados = 0;
  let totalPares = 0;
  let tentativas = 0;
  
  const emojis = ['🍎','🍌','🍇','🍉','🍓','🍒','🍍','🥝','🥑','🍋','🥥','🍑'];
  
  function escolherDificuldade(nivel) {
    let numPares;
  
    switch (nivel) {
      case 'facil': numPares = 4; break;
      case 'medio': numPares = 8; break;
      case 'dificil': numPares = 12; break;
      default: numPares = 4;
    }
  
    totalPares = numPares;
    document.getElementById('menu-diff').style.display = 'none';
    document.getElementById('card').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
  
    const tituloNivel = {
      facil: 'Modo Fácil',
      medio: 'Modo Médio',
      dificil: 'Modo Difícil'
    };
    document.getElementById('nivel-titulo').textContent = tituloNivel[nivel];
  
    iniciarJogo(numPares);
  }
  
  function iniciarJogo(numPares) {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
  
    if (numPares === 4 || numPares === 8) {
      gameBoard.style.gridTemplateColumns = 'repeat(4, 100px)';
    } else {
      gameBoard.style.gridTemplateColumns = 'repeat(6, 100px)';
    }
  
    cartas = [];
    for (let i = 0; i < numPares; i++) {
      cartas.push(emojis[i]);
      cartas.push(emojis[i]);
    }
  
    cartas = shuffle(cartas);
    tentativas = 0;
    paresEncontrados = 0;
    cartasViradas = [];
    atualizarTentativas();
  
    cartas.forEach((emoji, index) => {
      const cartaElemento = document.createElement('div');
      cartaElemento.classList.add('card-item');
      cartaElemento.dataset.valor = emoji;
      cartaElemento.dataset.index = index;
      cartaElemento.textContent = '';
      cartaElemento.addEventListener('click', virarCarta);
      gameBoard.appendChild(cartaElemento);
    });
  }
  
  function virarCarta(e) {
    const carta = e.currentTarget;
  
    if (carta.classList.contains('flipped') || carta.classList.contains('matched')) return;
  
    carta.textContent = carta.dataset.valor;
    carta.classList.add('flipped');
    cartasViradas.push(carta);
  
    if (cartasViradas.length === 2) {
      document.getElementById('game-board').style.pointerEvents = 'none';
      setTimeout(() => {
        checarPar();
        document.getElementById('game-board').style.pointerEvents = 'auto';
      }, 600);
    }
  }
  
  function checarPar() {
    const [carta1, carta2] = cartasViradas;
  
    if (carta1.dataset.valor === carta2.dataset.valor) {
      carta1.classList.add('matched');
      carta2.classList.add('matched');
      paresEncontrados++;
    } else {
      carta1.textContent = '';
      carta2.textContent = '';
      carta1.classList.remove('flipped');
      carta2.classList.remove('flipped');
    }
  
    tentativas++;
    atualizarTentativas();
    cartasViradas = [];
  
    if (paresEncontrados === totalPares) {
      setTimeout(() => {
        alert(`Parabéns! Você completou o jogo em ${tentativas} tentativas! 🎉`);
      }, 300);
    }
  }
  
  function atualizarTentativas() {
    document.getElementById('tentativas').textContent = `Tentativas: ${tentativas}`;
  }
  
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  
  function resetGame() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('card').style.display = 'flex';
    document.getElementById('main-menu').style.display = 'flex';
    document.getElementById('menu-diff').style.display = 'none';
  }
  