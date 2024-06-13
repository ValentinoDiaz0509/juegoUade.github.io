const totalPairs = 7;
const speciesNames = [
    'Yaguareté', 'Puma', 'Andino', 'Tucán', 'Vicuña', 'Ñandú', 'Cóndor'
];

let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;
let matchedPairs = 0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

function activate(e) {
    if (currentMove < 2 && !e.target.classList.contains('active')) {
        e.target.classList.add('active');
        selectedCards.push(e.target);

        if (++currentMove === 2) {
            currentAttempts++;
            document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

            if (selectedCards[0].querySelector('.face').innerHTML === selectedCards[1].querySelector('.face').innerHTML) {
                selectedCards.forEach(card => card.classList.add('matched'));
                selectedCards = [];
                currentMove = 0;
                matchedPairs++;

                if (matchedPairs === totalPairs) {
                    setTimeout(() => {
                        alert("¡Ganaste!");
                        resetGame();
                    }, 500);
                }
            } else {
                setTimeout(() => {
                    selectedCards.forEach(card => card.classList.remove('active'));
                    selectedCards = [];
                    currentMove = 0;
                }, 600);
            }
        }
    }
}

function resetGame() {
    cards.forEach(card => card.remove());
    cards = [];
    selectedCards = [];
    valuesUsed = [];
    currentMove = 0;
    currentAttempts = 0;
    matchedPairs = 0;
    document.querySelector('#stats').innerHTML = '0 intentos';

    startGame();
}

function startGame() {
    for (let i = 0; i < totalPairs * 2; i++) {
        let div = document.createElement('div');
        div.innerHTML = cardTemplate;
        cards.push(div);
        document.querySelector('#game').append(cards[i]);
        randomSpecies();
        let speciesIndex = valuesUsed[i];
        cards[i].querySelector('.face').innerHTML = speciesNames[speciesIndex];
        cards[i].querySelector('.card').addEventListener('click', activate);
    }
}

function randomSpecies() {
    let rnd = Math.floor(Math.random() * speciesNames.length);
    let values = valuesUsed.filter(value => value === rnd);
    if (values.length < 2) {
        valuesUsed.push(rnd);
    } else {
        randomSpecies();
    }
}

startGame();
