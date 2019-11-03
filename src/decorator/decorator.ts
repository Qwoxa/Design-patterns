import { IDrink, IDrinkDecorator } from './interfaces';

// Concrete classes
export class Coffee implements IDrink {
  price() {
    return 10;
  }

  description() {
    return 'Coffee';
  }
}

export class Tea implements IDrink {
  price() {
    return 2;
  }

  description() {
    return 'Tea';
  }
}

// Decorators
export class CaramelDecorator extends IDrinkDecorator {
  constructor(protected _drink: IDrink) {
    super();
  }
  
  price() {
    return this._drink.price() + 2;
  }

  description() {
    return `${this._drink.description()} + Caramel`
  }
}

export class MilkDecorator extends IDrinkDecorator {
  constructor(protected _drink: IDrink) {
    super();
  }
  
  price() {
    return this._drink.price() + 3;
  }

  description() {
    return `${this._drink.description()} + Milk`
  }
}