export interface IActivityStrategy {
  begin(): string;
}

export interface IRestStrategy {
  begin(): string;
}

export interface IPerson {
  activityStrategy: IActivityStrategy;
  restStrategy: IRestStrategy;
  workout(): string;
  getRest(): string;
}