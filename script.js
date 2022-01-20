class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear () {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand.toString()
        this.currentOperand = ''

    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return

        }

        let newPrev = this.previousOperand.toString()
        let newCurrent = this.currentOperand.toString()
        this.previousOperand = `${newPrev} ${this.operation} ${newCurrent} = `;
        this.currentOperand = computation
        this.operation = undefined

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        console.log(decimalDigits);

        let intergerDisplay 
        if (isNaN(intergerDigits)) {
            intergerDisplay = ''
        } else {
            intergerDisplay  = intergerDigits.toLocaleString('en', {
            maximumFractionDigits: 0
            })
        }

        if (decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`
        } else {
            return intergerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandText.innerText = 
        this.getDisplayNumber(this.currentOperand);
        if (this.operation != null ) {
            this.previousOperandText.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandText.innerText = this.previousOperand
        }
        
    }
}

const numberBtn = document.querySelectorAll('[data-number]');
const operatorBtn = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
})

operatorBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()
    })
})

clearBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay();
});

equalsBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

