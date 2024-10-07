let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let timerInterval;
let timeElapsed = 0;
let movesLog = []; // Array para almacenar las jugadas

// Variables para contar las veces que se presiona "X" y "O"
let xCount = 0;
let oCount = 0;

// Selección de elementos
const cells = document.querySelectorAll('.cell');
const messageDisplay = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const showResultsBtn = document.getElementById('showResultsBtn'); // Botón de resultados
const timeDisplay = document.getElementById('time');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');

// Combinaciones ganadoras
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Manejo del clic en las celdas
cells.forEach(cell => {
    cell.addEventListener('click', cellClick);
});

// Manejo del clic en el botón de reinicio
resetBtn.addEventListener('click', resetGame);

// Manejo del clic en el botón de mostrar resultados
showResultsBtn.addEventListener('click', showResults);

// Función para manejar el clic en una celda
function cellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute('data-index');

    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return; // No permite hacer clic en una celda ocupada
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Aplicar colores según el jugador
    if (currentPlayer === 'X') {
        clickedCell.style.backgroundColor = 'green';  // X -> Verde
        xCount++;  // Incrementar el contador de X
    } else {
        clickedCell.style.backgroundColor = 'red';    // O -> Rojo
        oCount++;  // Incrementar el contador de O
    }

    // Almacenar la jugada en el registro
    movesLog.push({
        player: currentPlayer,
        time: timeElapsed,
        cellIndex: clickedCellIndex
    });

    checkResult();
}

// Función para verificar el resultado
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const [a, b, c] = condition;

        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }

        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        displayWinner(currentPlayer);
        isGameActive = false;
        clearInterval(timerInterval);
        return;
    }

    if (!board.includes('')) {
        messageDisplay.textContent = '¡Es un empate!';
        isGameActive = false;
        clearInterval(timerInterval);
    }

    // Cambiar de jugador
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Función para mostrar el ganador
function displayWinner(winner) {
    const winnerNameX = playerXInput.value || 'Jugador X';
    const winnerNameO = playerOInput.value || 'Jugador O';
    const winnerMessage = winner === 'X' ? `${winnerNameX} gana!` : `${winnerNameO} gana!`;
    messageDisplay.textContent = winnerMessage;
}

// Función para reiniciar el juego
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    messageDisplay.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = 'white';  // Reiniciar los colores a blanco
    });

    // Reiniciar nombres
    playerXInput.value = '';
    playerOInput.value = '';

    // Reiniciar el temporizador
    clearInterval(timerInterval);
    timeElapsed = 0;
    timeDisplay.textContent = timeElapsed;
    timerInterval = setInterval(() => {
        timeElapsed++;
        timeDisplay.textContent = timeElapsed;
    }, 1000);

    // Limpiar el registro de jugadas y reiniciar los contadores
    movesLog = [];
    xCount = 0;  // Reiniciar el contador de X
    oCount = 0;  // Reiniciar el contador de O
}

// Función para mostrar los resultados de las jugadas
function showResults() {
    let resultsMessage = 'Historial de Jugadas:\n\n';
    movesLog.forEach(move => {
        resultsMessage += `Jugador ${move.player} marcó en la celda ${move.cellIndex} al segundo ${move.time}\n`;
    });

    // Mostrar también el conteo de cuántas veces se presionó "X" y "O"
    resultsMessage += `\nTotal de veces que se presionó X: ${xCount}`;
    resultsMessage += `\nTotal de veces que se presionó O: ${oCount}`;

    alert(resultsMessage); // Mostrar el historial en una ventana emergente
}

// Iniciar el temporizador al cargar el juego
timerInterval = setInterval(() => {
    timeElapsed++;
    timeDisplay.textContent = timeElapsed;
}, 1000);


