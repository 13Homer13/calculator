class Calculator {
    constructor(topScreen, bottomScreen) {
        this.topScreen = topScreen;
        this.bottomScreen = bottomScreen;
        this.clear();
    }
    clear() {
        this.prevOperand = "";
        this.currOperand = "";
        this.operation = undefined;
    }
    delete() {
        this.currOperand = this.currOperand.slice(0, -1);
    }
    addNumber(num) {
        if (num === "." && this.currOperand.includes(".")) return;
        this.currOperand = this.currOperand.toString() + num.toString();
    }
    chooseOperation(ops) {
        if (this.currOperand === '') return
        if (this.prevOperand !== '') {
            this.compute()
        }
        this.prevOperand = this.currOperand;
        this.currOperand = "";
        this.operation = ops;
    }

    compute() {
        let result;
        let prev = parseFloat(this.prevOperand);
        let curr = parseFloat(this.currOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+': 
                result = prev + curr
                break;
            case '-': 
                result = prev - curr
                break;
            case '/': 
                result = prev / curr
                break;
            case '*':
                result = prev * curr
                break;
            default: return
        }
        this.currOperand = result;
        this.operation = undefined;
        this.prevOperand = "";
    }
    updateDisplay() { 
        this.bottomScreen.innerHTML = this.currOperand;
        if (this.operation !== undefined) {
            this.topScreen.innerHTML = 
            `${this.prevOperand} ${this.operation}`         
        }
        if (this.operation === undefined) {
            this.topScreen.innerHTML = this.prevOperand;
        }
    }
}

const delButton = document.querySelector('[data-delete]')
const numbersButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalButton = document.querySelector('[data-equals');
const previousElement = document.querySelector('[data-prev-operand]');
const currentElement = document.querySelector('[data-curr-operand]');


const calculator = new Calculator(previousElement, currentElement);

numbersButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.addNumber(button.innerText);
        calculator.updateDisplay();
    })
})

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

delButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})
equalButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})
