class CalcController {
  constructor() {
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

  initButtonsEvents() {
    let buttons = document.querySelectorAll('#buttons > g, #parts > g');

    buttons.forEach((btn, index) => {
      this.addEventListenerAll(btn, 'click drag mouseover', (e) => {
        console.log(btn.className.baseVal.replace('btn-', ''));
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
