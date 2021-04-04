class StringBuilder {
  constructor(baseString = '') {
    this.value = baseString;
  }

  append(baseString) {
    this.value += baseString;
    return this;
  }

  prepend(baseString) {
    this.value = baseString + this.value;
    return this;
  }

  pad(baseString) {
    this.value = baseString + this.value + baseString;
    return this;
  }
}

const builder = new StringBuilder('.');

builder
      .append('^')
      .prepend('^')
      .pad('=');

console.log(builder);
