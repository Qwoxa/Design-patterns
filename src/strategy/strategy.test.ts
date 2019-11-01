import { Person } from './person';
import * as strategies from './strategies';

describe('Person class [strategy pattern]', () => {
    it('Play football | take a nap strategies', () => {
      const person = new Person(
        new strategies.PlayFootballStrategy(),
        new strategies.TakeANapStrategy()
      );

      expect(person.workout()).toBe('Playing football...');
      expect(person.getRest()).toBe('Sleeping...');
    });

    it('Meditate | eat sweets strategies', () => {
      const person = new Person(
        new strategies.MeditateStrategy(),
        new strategies.EatingSweetsStrategy()
      );

      expect(person.workout()).toBe('Meditating...');
      expect(person.getRest()).toBe('Eating sweets...');
    });
});