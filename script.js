const PLAYER1 = 'fa-circle-o';
const PLAYER2 = 'fa-times';
let round = 1;
let i = 1;
const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
const combinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

let pick = (event) => {
    const { row, column } = event.target.dataset;
    const turn = round % 2 === 0 ? PLAYER2 : PLAYER1;
    if (board[row][column] !== '') return;
    console.log(turn)
    if (turn == "fa-circle-o"){
        i++;
        const place = document.querySelector('.board');
        place.addEventListener('click', () => {
        document.getElementById('string').innerHTML = "Kolej gracza X";})
    }else {
        const place = document.querySelector('.board');
        place.addEventListener('click', () => {
        document.getElementById('string').innerHTML = "Kolej gracza O";})
        i++;
    }
    event.target.classList.add(turn);
    board[row][column] = turn;
    round++;
    console.log(check());
}

let clikc_counter = () => {
    let side = document.querySelector('.board');
    console.log(side)
    side.addEventListener('click', () => {
        if (i == 10) {
            alert('Remis nikt nie wygrał!')
            location.reload();
        }
        
    });
};

clikc_counter();

const boxes = [...document.querySelectorAll('.box')];
boxes.forEach(box => box.addEventListener('click', pick));

let check = () => {
    const result = board.reduce((total, row) => total.concat(row));
    let winner = null;
    let moves = {
        'fa-times': [],
        'fa-circle-o': []
    };
    result.forEach((field, index) => moves[field] ? moves[field].push(index) : null);
    combinations.forEach(combination => {
        if (combination.every(index => moves[PLAYER1].indexOf(index) > -1)) {
            winner = alert('Wygrywa: Gracz O');
            location.reload();
        }
        if (combination.every(index => moves[PLAYER2].indexOf(index) > -1)) {
            winner = alert('Wygrywa: Gracz X ');
            location.reload();
        }
    });
}
