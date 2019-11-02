export interface IObservable {
  add(observer: IObserver): IObserver | void;
  remove(observer: IObserver): IObserver | void;
  notify(): void;
}

export interface IObserver {
  update(): void;
}

export interface IDisplay {
  display(): void;
}

export type IDisplayObserver = IDisplay & IObserver;