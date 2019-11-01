import { IActivityStrategy, IRestStrategy } from './interfaces';

export class MeditateStrategy implements IActivityStrategy {
  public begin(): string {
    return 'Meditating...';
  }
}

export class PlayFootballStrategy implements IActivityStrategy {
  public begin(): string {
    return 'Playing football...';
  }
}

export class TakeANapStrategy implements IRestStrategy {
  public begin(): string {
    return 'Sleeping...';
  }
}

export class EatingSweetsStrategy implements IRestStrategy {
  public begin(): string {
    return 'Eating sweets...';
  }
}