'use strict';

var cardsArray = [{
  'name': 'grande1',
  'img': 'img/grande1.png'
}, {
  'name': 'grande2',
  'img': 'img/grande2.png'
}, {
  'name': 'grande4',
  'img': 'img/grande4.png'
}, {
  'name': 'grande5',
  'img': 'img/grande5.png'
}, {
  'name': 'grande6',
  'img': 'img/grande6.png'
}, {
  'name': 'grande7',
  'img': 'img/grande7.png'
}, {
  'name': 'grande8',
  'img': 'img/grande8.png'
}, {
  'name': 'abuelanieto1',
  'img': 'img/abuelanieto1.png'
}, {
  'name': 'nietobebe1',
  'img': 'img/nietobebe1.png'
}, {
  'name': 'todos1',
  'img': 'img/todos1.png'
}, {
  'name': 'grande9',
  'img': 'img/grande9.png'
}, {
  'name': 'grande11',
  'img': 'img/grande10.png'
}, {
  'name': 'grande12',
  'img': 'img/grande11.png'
}];

var levelBtns = document.getElementById('level-buttons');
var scoreDisplay = document.getElementById('score');
var gameGrid = [];
var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;
var score = 0;


function setGameLevel(level) {
  if (level === 'easy') {
    gameGrid = cardsArray.slice(0, 4).concat(cardsArray.slice(0, 4)).sort(function () {
      return 0.5 - Math.random();
    });
  } else if (level === 'medium') {
    gameGrid = cardsArray.slice(0, 8).concat(cardsArray.slice(0, 8)).sort(function () {
      return 0.5 - Math.random();
    });
  } else {
    gameGrid = cardsArray.concat(cardsArray).sort(function () {
      return 0.5 - Math.random();
    });
  }
  createCards();
}

function createCards() {
  var grid = document.createElement('section');
  grid.setAttribute('class', 'grid');
  game.innerHTML = '';  // Limpiar el contenido previo
  game.appendChild(grid);

  gameGrid.forEach(function (item) {
    var name = item.name,
      img = item.img;

    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;

    var front = document.createElement('div');
    front.classList.add('front');

    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = 'url(' + img + ')';

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });

  // Resetear puntuaciones
  count = 0;
  score = 0;
  scoreDisplay.textContent = 'Parejas Encontradas: ' + score;

  // Mover el evento de clic aquí, dentro de la función createCards()
  grid.addEventListener('click', function (event) {
    var clicked = event.target;

    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
      return;
    }

    if (count < 2) {
      count++;
      if (count === 1) {
        firstGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
      } else {
        secondGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
      }

      if (firstGuess && secondGuess) {
        if (firstGuess === secondGuess) {
          score += 1; // Sumar puntos
          setTimeout(match, delay);
        } else if (count > 4) {
          score -= 1; // Restar puntos si fallas después de las primeras 4 cartas
        }
        scoreDisplay.textContent = 'Parejas Encontradas: ' + score;
        setTimeout(resetGuesses, delay);
      }
      previousTarget = clicked;
    }
  });
}

// Función para hacer coincidir las cartas
function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });
}

// Función para resetear las cartas seleccionadas
function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
}

levelBtns.addEventListener('click', function (event) {
  if (event.target.tagName === 'BUTTON') {
    setGameLevel(event.target.dataset.level);
  }
});

// Inicializar el juego en nivel fácil
setGameLevel('easy');

// Variables
document.getElementById('mas').addEventListener('click', function () {
  // Selecciona todas las cartas
  const cards = document.querySelectorAll('.card');

  // Para cada carta, ajusta su tamaño
  cards.forEach(card => {
    // Ajusta el width utilizando calc()
    card.style.width = `calc(${getComputedStyle(card).width} + 50px)`;
    // Ajusta el height utilizando calc()
    card.style.height = `calc(${getComputedStyle(card).height} + 50px)`;
  });
});

document.getElementById('menos').addEventListener('click', function () {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    // Ajusta el width utilizando calc()
    card.style.width = `calc(${getComputedStyle(card).width} - 50px)`;
    // Ajusta el height utilizando calc()
    card.style.height = `calc(${getComputedStyle(card).height} - 50px)`;
  });
});