import { IPerson, IActivityStrategy, IRestStrategy } from './interfaces';

export class Person implements IPerson {
  constructor(
    public activityStrategy: IActivityStrategy,
    public restStrategy: IRestStrategy
  ) {}
  
  public workout(): string {
    return this.activityStrategy.begin();
  }
  
  public getRest(): string {
    return this.restStrategy.begin();
  }
}