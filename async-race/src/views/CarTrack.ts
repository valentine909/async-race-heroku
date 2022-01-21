import { createHTMLElement } from '../util/createElements';
import { CarProperties } from '../types/types';
import Car from './Car';
import './CarTrack.css';
import { MyCustomEvent } from '../presenter/CustomEvents';

class CarTrack {
  private readonly id: number;

  private readonly name: string;

  private readonly track: HTMLElement;

  private readonly car: Car;

  private readonly color: string;

  private readonly startEngineButton: HTMLElement;

  private readonly stopEngineButton: HTMLElement;

  constructor(car: CarProperties) {
    this.id = car.id as number;
    this.name = car.name;
    this.color = car.color;
    this.car = new Car(this.color, this.name, this.id);
    this.startEngineButton = createHTMLElement('button', 'start__button', 'A');
    this.stopEngineButton = createHTMLElement('button', 'stop__button disabled', 'B');
    this.track = this.createTrack();
  }

  createTrack() {
    const track = createHTMLElement('div', 'track');
    const flagContainer = createHTMLElement('div', 'track__flag');
    track.append(this.getFirstLine(), this.getSecondLine(), flagContainer);
    return track;
  }

  getFirstLine() {
    const firstLine = createHTMLElement('div', 'track__first-line');
    const selectButton = createHTMLElement('button', 'select__button', 'select');
    selectButton.addEventListener('click', () => {
      selectButton.dispatchEvent(MyCustomEvent('select-car', {
        name: this.name,
        color: this.color,
        id: this.id,
      }));
    });
    const removeButton = createHTMLElement('button', 'remove__button', 'remove');
    removeButton.addEventListener('click', () => {
      removeButton.dispatchEvent(MyCustomEvent('delete-car', {
        id: this.id,
      }));
    });
    const carName = createHTMLElement('div', 'track__car-name', this.name);
    firstLine.append(selectButton, removeButton, carName);
    return firstLine;
  }

  getSecondLine() {
    const secondLine = createHTMLElement('div', 'track__second-line');

    this.startEngineButton.addEventListener('click', () => {
      this.startEngineButton.dispatchEvent(MyCustomEvent('start-engine', {
        id: this.id,
      }));
      this.startEngineButton.classList.add('disabled');
      this.stopEngineButton.classList.remove('disabled');
    });

    this.stopEngineButton.addEventListener('click', () => {
      this.stopEngineButton.dispatchEvent(MyCustomEvent('stop-engine', {
        id: this.id,
      }));
      this.startEngineButton.classList.remove('disabled');
      this.stopEngineButton.classList.add('disabled');
    });
    const carContainer = createHTMLElement('div', 'track__car-container');
    carContainer.append(this.car.renderCar());
    secondLine.append(this.startEngineButton, this.stopEngineButton, carContainer);
    return secondLine;
  }

  getStartButton() {
    return this.startEngineButton;
  }

  getStopButton() {
    return this.stopEngineButton;
  }

  getCar() {
    return this.car;
  }

  render() {
    return this.track;
  }
}

export default CarTrack;
