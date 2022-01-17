import {createHTMLElement} from "../util/createElements";
import './Garage.css';
import {CarProperties} from "../types/types";
import CarTrack from "./CarTrack";

class Garage {
  private readonly garage: HTMLElement;
  private readonly carsNumber: HTMLElement;
  private readonly pageNumber: HTMLElement;
  private readonly raceTrack: HTMLElement;
  private readonly control: HTMLElement;
  private readonly updateBlock: HTMLElement;
  constructor() {
    this.garage = createHTMLElement('div', 'garage');
    this.control = Garage.getGarageControl();
    this.updateBlock = Garage.getUpdateBlock();
    this.carsNumber =  createHTMLElement('h2', 'garage__counter', 'Garage (0)');
    this.pageNumber = createHTMLElement('h3', 'garage__page-number', 'Page #0');
    this.raceTrack = createHTMLElement('div', 'garage__race-track');
    this.garage.append(this.control, this.carsNumber, this.pageNumber, this.raceTrack);
  }

  static getGarageControl() {
    const createContainer = Garage.getCreateBlock();
    const updateContainer = Garage.getUpdateBlock();

    const raceContainer = createHTMLElement('div', 'race');
    const raceButton = createHTMLElement('button', 'race__race', 'race');
    const resetButton = createHTMLElement('button', 'race__reset', 'reset');
    const generateButton = createHTMLElement('button', 'race__generate', 'generate cars');
    raceContainer.append(raceButton, resetButton, generateButton);

    const wrapper = createHTMLElement('div', 'garage__control');
    wrapper.append(createContainer, updateContainer, raceContainer);
    return wrapper;
  }

  static getCreateBlock() {
    const createContainer = createHTMLElement('div', 'create');
    const createInput = createHTMLElement('input', 'create__name') as HTMLInputElement;
    createInput.setAttribute('type', 'text');
    createInput.setAttribute('placeholder', 'Enter car name...');
    const createColor = createHTMLElement('input', 'create__color') as HTMLInputElement;
    createColor.setAttribute('type', 'color');
    const createButton = createHTMLElement('button', 'create__button', 'create');
    createButton.addEventListener('click', () => {
      createButton.dispatchEvent(new CustomEvent('create-car', {
        detail: {
          name: createInput.value,
          color: createColor.value,
        }
      }))
    })
    createContainer.append(createInput, createColor, createButton);
    return createContainer;
  }

  static getUpdateBlock() {
    const updateContainer =  createHTMLElement('div', 'update');
    const  updateInput =  createHTMLElement('input', ' update__name') as HTMLInputElement;
    updateInput.setAttribute('type', 'text');
    updateInput.setAttribute('placeholder', 'Enter car name...');
    const  updateColor =  createHTMLElement('input', ' update__color') as HTMLInputElement;
    updateColor.setAttribute('type', 'color');
    const  updateButton =  createHTMLElement('button', ' update__button', 'update');
    updateButton.addEventListener('click', () => {
      updateButton.dispatchEvent(new CustomEvent('create-car', {
        detail: {
          name: updateInput.value,
          color: updateColor.value,
        }
      }))
    })
    updateContainer.append( updateInput,  updateColor,  updateButton);
    return updateContainer;
  }

  updateCarsNumber(num: string) {
    this.carsNumber.innerHTML = `Garage (${num})`
  }

  updatePageNumber(num: string) {
    this.pageNumber.innerHTML = `Page #${num}`
  }

  updateRaceTrack(cars: CarProperties[]) {
    this.raceTrack.innerHTML = '';
    cars.forEach(car => {
      this.raceTrack.append(new CarTrack(car).render());
    })
  }

  render() {
    return this.garage;
  }
}

export default Garage;
