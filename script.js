const keyToBraille = { 'f': 0, 'd': 1, 's': 2, 'j': 3, 'k': 4, 'l': 5 };
const brailleDict = {
    "あ": "100000", "い": "110000", "う": "100100", "え": "110100", "お": "010100",
    "か": "100001", "き": "110001", "く": "100101", "け": "110101", "こ": "010101",
    "さ": "100011", "し": "110011", "す": "100111", "せ": "110111", "そ": "010111",
    "た": "101010", "ち": "111010", "つ": "101110", "て": "111110", "と": "011110",
    "な": "101000", "に": "111000", "ぬ": "101100", "ね": "111100", "の": "011100",
    "は": "101001", "ひ": "111001", "ふ": "101101", "へ": "111101", "ほ": "011101",
    "ま": "101011", "み": "111011", "む": "101111", "め": "111111", "も": "011111",
    "や": "001100", "ゆ": "001101", "よ": "001110", "ら": "100010", "り": "110010",
    "る": "100110", "れ": "110110", "ろ": "010110", "わ": "001000", "を": "001010",
    "ん": "001011"
};
let score = 0;
let user_input = ["0", "0", "0", "0", "0", "0"];
let currentKana = "";
let currentBraille = "";
const kanaDiv = document.getElementById('kana');
const keysDiv = document.getElementById('keys');
const scoreDiv = document.getElementById('score');
const resultDiv = document.getElementById('result');

function randomKana() {
    const keys = Object.keys(brailleDict);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    currentKana = randomKey;
    currentBraille = brailleDict[randomKey];
    kanaDiv.textContent = currentKana;
}

function resetInput() {
    user_input = ["0", "0", "0", "0", "0", "0"];
    document.querySelectorAll('.key').forEach(key => {
        key.classList.remove('pressed');
    });
}

function checkInput() {
    if (user_input.join('') === currentBraille) {
        resultDiv.textContent = "正确!";
        resultDiv.style.color = "green";
        score += 10;
        scoreDiv.textContent = `积分: ${score}`;
        resetInput();
        setTimeout(randomKana, 1000);
    } else {
        resultDiv.textContent = "错误!";
        resultDiv.style.color = "red";
        resetInput();
    }
}

keysDiv.addEventListener('click', event => {
    const key = event.target.id.split('-')[1];
    if (keyToBraille.hasOwnProperty(key)) {
        const pos = keyToBraille[key];
        user_input[pos] = user_input[pos] === "0" ? "1" : "0";
        event.target.classList.toggle('pressed');
    }
});

document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    if (keyToBraille.hasOwnProperty(key)) {
        const pos = keyToBraille[key];
        user_input[pos] = user_input[pos] === "0" ? "1" : "0";
        document.getElementById(`key-${key}`).classList.toggle('pressed');
    } else if (key === ' ') {
        checkInput();
    }
});

randomKana();
