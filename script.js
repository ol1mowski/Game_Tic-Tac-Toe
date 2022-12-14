const PLAYER1 = 'fa-circle-o';
const PLAYER2 = 'fa-times';
let start_game = new Date().getTime();
let round = 1;
let win = false;
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
        if (i == 10 && win == false) {
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
            let end_game = new Date().getTime();
            const gameTime = (end_game - start_game) / 1000;
            winner = alert(`Wygrywa gracz O w czasie ${gameTime} sekund`);
            location.reload();
            win = true;
        }
        if (combination.every(index => moves[PLAYER2].indexOf(index) > -1)) {
            let end_game = new Date().getTime();
            const gameTime = (end_game - start_game) / 1000;
            winner = alert(`Wygrywa gracz X w czasie ${gameTime} sekund`)
            location.reload();
            win = true;
        }
    });
}

//Dark Mode

const swichMode = document.querySelector('button');
let theme = localStorage.getItem('theme');

swichMode.addEventListener('click', () => {
    if (theme == 'dark') {
        document.querySelector('body').classList.remove('dark');
        document.querySelector('body').classList.add('light');
        theme = 'light';
    }else {
        document.querySelector('body').classList.remove('light');
        document.querySelector('body').classList.add('dark');
        theme = 'dark';
    }
    localStorage.setItem('theme', theme);
});

if (theme == 'dark') {
    document.querySelector('body').classList.add('light');
    theme = 'light';
}

if (theme == 'light') {
    document.querySelector('body').classList.add('dark');
    theme = 'dark';
}