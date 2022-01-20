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

  constructor(car: CarProperties) {
    this.id = car.id as number;
    this.name = car.name;
    this.color = car.color;
    this.car = new Car(this.color, this.name, this.id);
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
    const startEngineButton = createHTMLElement('button', 'start__button', 'A');
    const stopEngineButton = createHTMLElement('button', 'stop__button disabled', 'B');
    startEngineButton.addEventListener('click', () => {
      startEngineButton.dispatchEvent(MyCustomEvent('start-engine', {
        id: this.id,
      }));
      startEngineButton.classList.add('disabled');
      stopEngineButton.classList.remove('disabled');
    });

    stopEngineButton.addEventListener('click', () => {
      stopEngineButton.dispatchEvent(MyCustomEvent('stop-engine', {
        id: this.id,
      }));
      startEngineButton.classList.remove('disabled');
      stopEngineButton.classList.add('disabled');
    });
    const carContainer = createHTMLElement('div', 'track__car-container');
    carContainer.append(this.car.renderCar());
    secondLine.append(startEngineButton, stopEngineButton, carContainer);
    return secondLine;
  }

  getCar() {
    return this.car;
  }

  render() {
    return this.track;
  }
}

export default CarTrack;
