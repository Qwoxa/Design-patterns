import { DisplayableDevice, TemperatureStation } from './observer';

describe('[observer pattern]', () => {

  let ts: TemperatureStation,
    display1: DisplayableDevice,
    display2: DisplayableDevice;

  beforeEach(() => {
    ts = new TemperatureStation();
    display1 = new DisplayableDevice(ts);
    display2 = new DisplayableDevice(ts);
  });

  it('Should add display to list of observables only once', () => {
    expect(ts.add(display1)).toBe(display1);
    expect(ts.add(display2)).toBe(display2);

    // Second time adding same observers
    expect(ts.add(display1)).toBeUndefined();
    expect(ts.add(display2)).toBeUndefined();
  });

  it('Should remove observers if they exist', () => {
    ts.add(display1);
    ts.add(display2);

    expect(ts.remove(display1)).toBe(display1);
    expect(ts.remove(display2)).toBe(display2);

    // Try removing not subscribed observers
    expect(ts.remove(display1)).toBeUndefined();
    expect(ts.remove(display2)).toBeUndefined();
  });

  it('Should call update method on observers on update', () => {
    ts.add(display1);
    ts.add(display2);

    display1.display = jest.fn();
    display2.display = jest.fn();

    ts.setState(20);
    ts.setState(24);

    expect(display1.display).toBeCalledTimes(2);
    expect(display2.display).toBeCalledTimes(2);
  });

  it('Should correctly update the store value of the observers', () => {
    ts.add(display1);
    ts.add(display2);

    // Mock function prevents the console.log statements calls
    display1.display = jest.fn();
    display2.display = jest.fn();

    ts.setState(20);
    expect(display1.getSubjectValue()).toBe(20);
    expect(display2.getSubjectValue()).toBe(20);

    ts.setState(24);
    expect(display1.getSubjectValue()).toBe(24);
    expect(display2.getSubjectValue()).toBe(24);
  });
});