export abstract class IDrink {
  public abstract price(): number;
  public abstract description(): string;
}

export abstract class IDrinkDecorator extends IDrink {
  protected drink: IDrink | undefined;
}