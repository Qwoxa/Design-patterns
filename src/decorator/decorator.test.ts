import {
  Coffee,
  Tea,
  MilkDecorator,
  CaramelDecorator
} from './decorator';

describe('[decorator pattern]', () => {
  it('Generates the correct description and price', () => {
    const coffeeWithCaramel = new CaramelDecorator(new Coffee());
    const teaWithMilk = new MilkDecorator(new Tea());
    const coffeeWithMilkAndCaramel =
      new CaramelDecorator(new MilkDecorator(new Coffee));

    expect(coffeeWithCaramel.description()).toBe('Coffee + Caramel');
    expect(teaWithMilk.description()).toBe('Tea + Milk');
    expect(coffeeWithMilkAndCaramel.description())
      .toBe('Coffee + Milk + Caramel');

    expect(coffeeWithCaramel.price()).toBe(12);
    expect(teaWithMilk.price()).toBe(5);
    expect(coffeeWithMilkAndCaramel.price()).toBe(15);
  });
});