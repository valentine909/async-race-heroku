import {createHTMLElement} from "../util/createElements";
import {CarProperties} from "../types/types";
import Car from "./Car";
import './CarTrack.css';

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
    const firstLine = createHTMLElement('div', 'track__first-line');
    const selectButton = createHTMLElement('button', 'select__button', 'select');
    const removeButton = createHTMLElement('button', 'remove__button', 'remove');
    const carName = createHTMLElement('div', 'track__car-name', name);
    firstLine.append(selectButton, removeButton, carName)

    const secondLine = createHTMLElement('div', 'track__second-line');
    const startEngineButton = createHTMLElement('button', 'start__button', 'A');
    const stopEngineButton = createHTMLElement('button', 'stop__button', 'B');
    const carContainer = createHTMLElement('div', 'track__car-container');
    const innerCar = new Car(color, name, id);
    carContainer.append(innerCar.renderCar())
    secondLine.append(startEngineButton, stopEngineButton, carContainer);

    const flagContainer = createHTMLElement('div', 'track__flag');
    track.append(firstLine, secondLine, flagContainer);
    return track;
  }

  render() {
    return this.track;
  }
}

export default CarTrack;
