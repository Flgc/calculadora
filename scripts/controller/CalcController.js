class CalcController {
  constructor() {
    this._displayCalc = '0';
    this._currentDate;
    this.initialize();
  }

  initialize() {
    let displayCalcE1 = document.querySelector('#display');
    let dateEl = document.querySelector('#data');
    let timeEl = document.querySelector('#hora');

    displayCalcE1.innerHTML = '';
    dateEl.innerHTML = '';
    timeEl.innerHTML = '';
  }

  get displayCalc() {
    return this._displayCalc;
  }

  set displayCalc(value) {
    this._displayCalc = value;
  }

  get currentDate() {
    return this._currentDate;
  }

  set currentDate(value) {
    this._currentDate = value;
  }
}
