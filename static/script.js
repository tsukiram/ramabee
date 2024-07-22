let commands = [];
let beePos = [];
let hivePos = [];
let direction = 0; // 0: up, 1: right, 2: down, 3: left

document.addEventListener('DOMContentLoaded', function() {
    fetch('/init')
        .then(response => response.json())
        .then(data => {
            beePos = data.bee;
            hivePos = data.hive;
            renderGrid();
        });
});

function renderGrid() {
    const container = document.getElementById('grid-container');
    container.innerHTML = '';

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const div = document.createElement('div');
            div.className = 'grid-item';

            if (i === beePos[0] && j === beePos[1]) {
                const beeImg = document.createElement('img');
                beeImg.src = 'static/beebot.png';
                beeImg.alt = 'Bee';
                beeImg.width = 30;
                beeImg.className = 'bee';
                beeImg.style.transform = `rotate(${direction * 90}deg)`;
                div.appendChild(beeImg);
            } else if (i === hivePos[0] && j === hivePos[1]) {
                const hiveImg = document.createElement('img');
                hiveImg.src = 'static/hive.png';
                hiveImg.alt = 'Hive';
                hiveImg.width = 30;
                div.appendChild(hiveImg);
            }

            container.appendChild(div);
        }
    }
}

function addCommand(command) {
    commands.push(command);
    updateCommandsList();
}

function executeCommands() {
    let delay = 0;
    commands.forEach(command => {
        setTimeout(() => {
            if (command === 'forward') {
                moveForward();
            } else if (command === 'left') {
                turnLeft();
            } else if (command === 'right') {
                turnRight();
            }
            renderGrid();
        }, delay);
        delay += 500; // Delay to allow for the transition
    });
    setTimeout(checkWin, delay);
    commands = [];
    updateCommandsList();
}

function moveForward() {
    if (direction === 0 && beePos[0] > 0) beePos[0]--;
    else if (direction === 1 && beePos[1] < 7) beePos[1]++;
    else if (direction === 2 && beePos[0] < 7) beePos[0]++;
    else if (direction === 3 && beePos[1] > 0) beePos[1]--;
}

function turnLeft() {
    direction = (direction + 3) % 4;
}

function turnRight() {
    direction = (direction + 1) % 4;
}

function checkWin() {
    if (beePos[0] === hivePos[0] && beePos[1] === hivePos[1]) {
        document.getElementById('message-modal').style.display = 'block';
    }
}

function closeModal() {
    document.getElementById('message-modal').style.display = 'none';
    initGame();
}

function initGame() {
    fetch('/init')
        .then(response => response.json())
        .then(data => {
            beePos = data.bee;
            hivePos = data.hive;
            direction = 0;
            renderGrid();
        });
}

function updateCommandsList() {
    const commandsList = document.getElementById('commands-list');
    commandsList.innerHTML = '';
    commands.forEach(command => {
        const li = document.createElement('li');
        li.textContent = command;
        commandsList.appendChild(li);
    });
}

function resetCommands() {
    commands = [];
    updateCommandsList();
}
