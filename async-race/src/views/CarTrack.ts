import {createHTMLElement} from "../util/createElements";
import {CarProperties} from "../types/types";
import Car from "./Car";
import './CarTrack.css';
import {MyCustomEvent} from "../presenter/CustomEvents";

class CarTrack {
  private readonly id: number;
  private readonly name: string;
  private readonly track: HTMLElement;
  constructor(car: CarProperties) {
    this.id = car.id as number;
    this.name = car.name;
    this.track = this.createTrack(car.color, this.id, this.name);
  }

  createTrack(color: string, id: number, name: string) {
    const track = createHTMLElement('div', 'track');
    const flagContainer = createHTMLElement('div', 'track__flag');
    track.append(this.getFirstLine(color, id, name), this.getSecondLine(color, id, name), flagContainer);
    return track;
  }

  getFirstLine(color: string, id: number, name: string) {
    const firstLine = createHTMLElement('div', 'track__first-line');
    const selectButton = createHTMLElement('button', 'select__button', 'select');
    selectButton.addEventListener('click', () => {
      selectButton.dispatchEvent(MyCustomEvent('select-car', {
        name: name,
        color: color,
        id: id,
      }))
    })
    const removeButton = createHTMLElement('button', 'remove__button', 'remove');
    removeButton.addEventListener('click', () => {
      removeButton.dispatchEvent(MyCustomEvent('delete-car', {
        id: this.id,
      }))
    })
    const carName = createHTMLElement('div', 'track__car-name', name);
    firstLine.append(selectButton, removeButton, carName);
    return firstLine;
  }

  getSecondLine(color: string, id: number, name: string) {
    const secondLine = createHTMLElement('div', 'track__second-line');
    const startEngineButton = createHTMLElement('button', 'start__button', 'A');
    startEngineButton.addEventListener('click', () => {
      startEngineButton.dispatchEvent(MyCustomEvent('start-engine', {
        id: this.id,
      }))
      startEngineButton.classList.add('disabled');
      stopEngineButton.classList.remove('disabled');
    })
    const stopEngineButton = createHTMLElement('button', 'stop__button disabled', 'B');
    stopEngineButton.addEventListener('click', () => {
      stopEngineButton.dispatchEvent(MyCustomEvent('stop-engine', {
        id: this.id,
      }))
      startEngineButton.classList.remove('disabled');
      stopEngineButton.classList.add('disabled');
    })
    const carContainer = createHTMLElement('div', 'track__car-container');
    const innerCar = new Car(color, name, id);
    carContainer.append(innerCar.renderCar())
    secondLine.append(startEngineButton, stopEngineButton, carContainer);
    return secondLine;
  }

  render() {
    return this.track;
  }
}

export default CarTrack;
