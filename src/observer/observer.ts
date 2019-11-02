import { IObservable, IObserver, IDisplayObserver } from './interfaces';


/**
 * Concrete observable
 */
export class TemperatureStation implements IObservable {
  private temperature = 0;
  private _observers: IObserver[] = [];

  public add(observer: IObserver): IObserver | void {
    if (!this._observers.find(o => o === observer)) {
      this._observers.push(observer);
      return observer;
    }
  }

  public remove(observer: IObserver): IObserver | void {
    const index = this._observers.findIndex(o => o === observer);

    if (~index) {
      return this._observers.splice(index, 1)[0];
    }
  }
  
  public notify(): void {
    this._observers.forEach(o => o.update());
  }

  public getState(): number {
    return this.temperature;
  }

  public setState(newState: number): void {
    this.temperature = newState;
    this.notify();
  }
}

/**
 * Concrete observers
 */
export class DisplayableDevice implements IDisplayObserver {
  private _observable: TemperatureStation;
  private _subject: number | undefined;

  constructor(observable: TemperatureStation) {
    this._observable = observable;
  }

  public update(): void {
    this._subject = this._observable.getState();
    this.display();
  }

  public display(): void {
    console.log(`Now it's ${this._subject}`);
  }

  public getSubjectValue(): number | undefined {
    return this._subject;
  }
}