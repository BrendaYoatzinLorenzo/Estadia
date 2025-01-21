// Define pares de imágenes con sus correspondientes nombres.
const pairs = {
    'img/anchovy.png': 'img/anchovy_name.png',
    'img/clam.png': 'img/clam_name.png',
    'img/lobster.png': 'img/lobster_name.png',
    'img/oyster.png': 'img/oyster_name.png',
    'img/shrimp.png': 'img/shrimp_name.png',
    'img/trout.png': 'img/trout_name.png'
};

// Asigna archivos de audio a cada símbolo.
const audioFiles = {
    'img/anchovy.png': 'anchovy.mp3',
    'img/anchovy_name.png': 'anchovy.mp3',
    'img/clam.png': 'clam.mp3',
    'img/clam_name.png': 'clam.mp3',
    'img/lobster.png': 'lobster.mp3',
    'img/lobster_name.png': 'lobster.mp3',
    'img/oyster.png': 'oyster.mp3',
    'img/oyster_name.png': 'oyster.mp3',
    'img/shrimp.png': 'shrimp.mp3',
    'img/shrimp_name.png': 'shrimp.mp3',
    'img/trout.png': 'trout.mp3',
    'img/trout_name.png': 'trout.mp3'
};

const symbols = Object.keys(pairs).concat(Object.values(pairs));
const totalPairs = Object.keys(pairs).length; 

let cards = []; 
let flippedCards = []; 
let pairsFound = 0; 

function shuffle(array) {
    return array.slice().sort(() => Math.random() - 0.5);
}

function createCard(symbol) {
    const card = document.createElement('div');
    card.classList.add('card');
    const backFace = document.createElement('div');
    backFace.classList.add('back');
    const frontFace = document.createElement('div');
    frontFace.classList.add('front');
    const symbolImage = document.createElement('img');
    symbolImage.src = symbol;
    symbolImage.alt = 'Memory card';
    frontFace.appendChild(symbolImage);

    card.appendChild(backFace);
    card.appendChild(frontFace);
    card.addEventListener('click', () => {
        playAudio(symbol);
        flipCard(card, symbol);
    });
    return card;
}

function playAudio(symbol) {
    const audio = new Audio(audioFiles[symbol]); 
    audio.currentTime = 0; 
    audio.play(); 
}

function flipCard(card, symbol) {
    
    if (
        flippedCards.length < 2 &&
        !flippedCards.includes(card) &&
        !card.classList.contains('flipped')
    ) {
        card.classList.add('flipped'); 
        flippedCards.push({ card, symbol }); 
    }

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}


function checkMatch() {
    const [{ card: card1, symbol: symbol1 }, { card: card2, symbol: symbol2 }] = flippedCards;
    const isMatch = pairs[symbol1] === symbol2 || pairs[symbol2] === symbol1;

    if (isMatch) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        pairsFound++;

        if (pairsFound === totalPairs) {
            setTimeout(() => {
                showWinMessage(); 
            }, 1000);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.querySelector('.symbol').style.display = 'none';
            card2.querySelector('.symbol').style.display = 'none';
        }, 250);
    }
    flippedCards = []; 
}

function initializeGame() {
    cards = shuffle(symbols); 
    pairsFound = 0; 
    flippedCards = []; 

    const gameContainer = document.querySelector('.memory-game'); 
    gameContainer.innerHTML = ''; 
    cards.forEach(symbol => {
        const card = createCard(symbol);
        gameContainer.appendChild(card);
    });
}

initializeGame();

// Obtener el botón de reinicio
const resetButton = document.getElementById('reset-button')
resetButton.addEventListener('click', () => {
    initializeGame();

    const winMessage = document.getElementById('win-message');
    winMessage.style.display = 'none';
});

function showWinMessage() {
    const winMessage = document.getElementById('win-message');
    winMessage.style.display = 'block';
    winMessage.style.animation = 'fadeIn 1s ease-in-out'

    const audio = new Audio('victory.mp3');
    audio.volume = 0.7;
    audio.play();
}