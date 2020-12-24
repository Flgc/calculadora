class CalcController {
  constructor() {
    this._operation = [];
    this._locale = 'pt-BR';
    this._displayCalcE1 = document.querySelector('#display');
    this._dateEl = document.querySelector('#data');
    this._timeEl = document.querySelector('#hora');
    this._currentDate;
    this.initialize();
    this.initButtonsEvents();
  }

  initialize() {
    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);
  }

  addEventListenerAll(element, events, fn) {
    events.split(' ').forEach((event) => {
      element.addEventListener(event, fn, false);
    });
  }

  clearAll() {
    this._operation = [];
  }

  clearEntry() {
    this._operation.pop();
  }

  setError() {
    this.displayCalc = 'Error';
  }

  getLastOperation() {
    return this._operation[this._operation.length - 1];
  }

  setLastOperation(value) {
    this._operation[this._operation.length - 1] = value;
  }

  isOperator(value) {
    //Returned true or false
    return ['+', '-', '*', '%', '/'].indexOf(value) > -1;
  }

  pushOperation(value) {
    this._operation.push(value);
    if (this._operation.length > 3) {
      this.calc();
    }
  }

  calc() {
    let last = this._operation.pop();
    let result = eval(this._operation.join(''));
    this._operation = [result, last];

    this.setLastNumberToDisplay();
  }

  setLastNumberToDisplay() {
    let lastNumber;
    for (let i = this._operation.length - 1; i >= 0; i--) {
      if (!this.isOperator(this._operation[i])) {
        lastNumber = this._operation[i];
        break;
      }
    }

    this.displayCalc = lastNumber;
  }

  addOperation(value) {
    if (isNaN(this.getLastOperation())) {
      // String
      if (this.isOperator(value)) {
        // Change operator
        this.setLastOperation(value);
      } else if (isNaN(value)) {
        // another string
        console.log('another string: ', value);
      } else {
        this.pushOperation(value);

        this.setLastNumberToDisplay();
      }
    } else {
      if (this.isOperator(value)) {
        //is operator? (yes)
        this.pushOperation(value);
      } else {
        // Number converted to string
        let newValue = this.getLastOperation().toString() + value.toString();
        this.setLastOperation(parseInt(newValue));

        this.setLastNumberToDisplay();
      }
    }
  }

  execBtn(value) {
    switch (value) {
      case 'ac':
        this.clearAll();
        break;
      case 'ce':
        this.clearEntry();
        break;
      case 'soma':
        this.addOperation('+');
        break;
      case 'subtracao':
        this.addOperation('-');
        break;
      case 'divisao':
        this.addOperation('/');
        break;
      case 'multiplicacao':
        this.addOperation('*');
        break;
      case 'porcento':
        this.addOperation('%');
        break;
      case 'igual':
        break;
      case 'ponto':
        this.addOperation('.');
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.addOperation(parseInt(value));
        break;
      default:
        this.setError();
        break;
    }
  }

  initButtonsEvents() {
    let buttons = document.querySelectorAll('#buttons > g, #parts > g');

    buttons.forEach((btn, index) => {
      this.addEventListenerAll(btn, 'click drag', (e) => {
        let textBtn = btn.className.baseVal.replace('btn-', '');
        this.execBtn(textBtn);
      });

      this.addEventListenerAll(btn, 'click drag mouseover', (e) => {
        btn.style.cursor = 'pointer';
      });
    });
  }

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  }

  get displayTime() {
    return this._timeEl.innerHTML;
  }

  set displayTime(value) {
    return (this._timeEl.innerHTML = value);
  }

  get displayDate() {
    return this._dateEl.innerHTML;
  }

  set displayDate(value) {
    return (this._dateEl.innerHTML = value);
  }

  get displayCalc() {
    return this._displayCalcE1.innerHTML;
  }

  set displayCalc(value) {
    this._displayCalcE1.innerHTML = value;
  }

  get currentDate() {
    return new Date();
  }

  set currentDate(value) {
    this._currentDate = value;
  }
}
