"use strict";

class Calculator {
  _output = document.querySelector(".output__result");
  _parentEl = document.querySelector(".container");
  _text = "";
  _errorMessage = "ERROR";

  constructor() {
    this._parentEl.addEventListener("click", this._init.bind(this));
  }

  _init(e) {
    if (!e.target.classList.contains("btn")) return;

    const preInput = e.target.dataset.input;

    this._activateNumber(preInput, e);
    this._activateSymbol(preInput, e);

    this._activateNegative(preInput);
    this._activatePercent(preInput);

    this._activateEqual(preInput);
    this._activateReset(preInput);
  }

  _activateNumber(preInput, e) {
    if (!e.target.classList.contains("btn--number")) return;
    this._text += preInput;
    this._renderMessage(this._text);
  }

  _activateSymbol(preInput, e) {
    if (!e.target.classList.contains("btn--symbol") || preInput === "=") return;
    this._text +=
      Number.isInteger(+this._text) || Number.isInteger(+this._text.slice(-1))
        ? preInput
        : "";

    this._renderMessage(this._text);
  }

  _activateReset(preInput) {
    preInput === "reset" && this._clearInput();
  }

  _activateEqual(preInput) {
    try {
      if (preInput === "=") {
        if (!Number.isInteger(+this._text.slice(-1)))
          throw new Error(this._errorMessage);
        this._text = Number.isInteger(eval(this._text))
          ? eval(this._text)
          : eval(this._text).toFixed(5).replaceAll("0", "");

        if (!Number.isFinite(+this._text)) throw new Error(this._errorMessage);
        this._renderMessage(this._text);
      }
    } catch (err) {
      this._renderError(this._errorMessage);
    }
  }

  _activateNegative(preInput) {
    if (preInput !== "negative" || this._output.innerHTML === "0") return;
    const modText = this._text.toString().split("");

    modText.slice(0, 1)[0] !== "-" ? modText.unshift("-") : modText.shift();
    this._text = modText.join("");

    this._renderMessage(this._text);
  }

  _activatePercent(preInput) {
    if (preInput !== "/100") return;
    this._text += preInput;
    this._renderMessage(this._text);
  }

  _clearInput() {
    this._text = "";
    this._output.innerHTML = "0";
  }
  _renderError(message) {
    this._output.innerHTML = message;
  }
  _renderMessage(message) {
    this._output.innerHTML = message;
  }
}

const calculator = new Calculator();
