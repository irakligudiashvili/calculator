const outputText = document.querySelector(".output-text");
const numBtns = document.querySelectorAll(".num-btn");
const operationBtns = document.querySelectorAll(".operation-btn");
const equalBtn = document.querySelector(".calc-equal");
const delBtn = document.querySelector(".calc-delete");
const delCharBtn = document.querySelector(".calc-delete-char");

let currentNumber = '';
let previousNumber = '';
let operation = null;

numBtns.forEach(button => {
    button.addEventListener('click', () => {
        if (button.innerText === '.' && currentNumber.includes('.')) return;
        currentNumber += button.innerText;
        updateOutput(currentNumber);
    });
});

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        if (currentNumber === '') return;
        if (previousNumber !== '') {
            calculate();
        }
        operation = button.innerText;
        previousNumber = currentNumber;
        currentNumber = '';
        updateOutput(previousNumber);
    });
});

equalBtn.addEventListener('click', () => {
    if (currentNumber === '' || previousNumber === '') return;
    calculate();
    operation = null;
});

delBtn.addEventListener('click', () => {
    currentNumber = '';
    previousNumber = '';
    operation = null;
    updateOutput('');
});

delCharBtn.addEventListener('click', () => {
    currentNumber = currentNumber.toString().slice(0, -1);
    updateOutput(currentNumber);
});

function calculate() {
    let result;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                updateOutput("We don't do that here");
                currentNumber = '';
                previousNumber = '';
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    currentNumber = result.toString();
    previousNumber = '';
    updateOutput(currentNumber);
}

function updateOutput(value) {
    outputText.innerText = value;
}