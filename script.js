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
        this.operation = ops;
        this.prevOperand = this.currOperand;
        this.currOperand = "";
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
        this.bottomScreen.innerText = this.currOperand;
        if (this.operation !== undefined) {
            this.topScreen.innerText = 
            `${this.prevOperand} ${this.operation}`         
        }
        else if (this.prevOperand === "" && this.currOperand === "") {
            this.topScreen.innerText = "";
            this.bottomScreen.innerText = "";
        }
        else if (this.operation === undefined) {
            this.topScreen.innerText = this.prevOperand;
        }
       
    }
    log() {
        console.log(this.prevOperand);
        console.log(this.currOperand);
        console.log(this.operation);

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
