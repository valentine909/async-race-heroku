import {createHTMLElement} from "../util/createElements";
import './Garage.css';
import {CarProperties} from "../types/types";
import CarTrack from "./CarTrack";
import {MyCustomEvent} from "../controller/CustomEvents";
import Pagination from "./Pagination";

class Garage {
  private readonly garage: HTMLElement;
  private readonly carsNumber: HTMLElement;
  private readonly pageNumber: HTMLElement;
  private readonly raceTrack: HTMLElement;
  private updateId: number;
  private readonly updateBlock: HTMLElement;
  private readonly carsPerPage: number;
  private readonly pagination: Pagination;
  constructor() {
    this.carsPerPage = 7;
    this.garage = createHTMLElement('div', 'garage');
    this.updateId = -1;
    this.updateBlock = this.getUpdateBlock();
    this.pagination = new Pagination('garage');
    this.carsNumber =  createHTMLElement('h2', 'garage__counter', 'Garage (0)');
    this.pageNumber = createHTMLElement('h3', 'garage__page-number', `Page #${1}`);
    this.raceTrack = createHTMLElement('div', 'garage__race-track');
    this.garage.append(this.getGarageControl(), this.carsNumber, this.pageNumber, this.raceTrack, this.pagination.render());
  }

  getGarageControl() {
    const createContainer = Garage.getCreateBlock();
    const updateContainer = this.updateBlock;
    const raceContainer = this.getRaceBlock();
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
      createButton.dispatchEvent(MyCustomEvent('create-car', {
        name: createInput.value,
        color: createColor.value,
      }));
      createInput.value = '';
      createColor.value = '#000000'
    })
    createContainer.append(createInput, createColor, createButton);
    return createContainer;
  }

  getUpdateBlock() {
    const updateContainer =  createHTMLElement('div', 'update disabled');
    const  updateInput =  createHTMLElement('input', ' update__name') as HTMLInputElement;
    updateInput.setAttribute('type', 'text');
    updateInput.setAttribute('placeholder', 'Enter car name...');
    const  updateColor =  createHTMLElement('input', ' update__color') as HTMLInputElement;
    updateColor.setAttribute('type', 'color');
    const  updateButton =  createHTMLElement('button', ' update__button', 'update');
    updateButton.addEventListener('click', () => {
      updateButton.dispatchEvent(MyCustomEvent('update-car', {
        name: updateInput.value,
        color: updateColor.value,
        id: this.getUpdateId(),
      }));
      updateInput.value = '';
      updateColor.value = '#000000';
      this.updateBlock.classList.add('disabled');
    })
    updateContainer.append(updateInput,  updateColor,  updateButton);
    return updateContainer;
  }

  getRaceBlock() {
    const raceContainer = createHTMLElement('div', 'race');
    const raceButton = createHTMLElement('button', 'race__race', 'race');
    const resetButton = createHTMLElement('button', 'race__reset', 'reset');

    const generateButton = createHTMLElement('button', 'race__generate', 'generate cars');
    generateButton.addEventListener('click', () => {
      generateButton.dispatchEvent(MyCustomEvent('generate-cars'));
    })

    raceContainer.append(raceButton, resetButton, generateButton);
    return raceContainer;
  }

  getCarsPerPage() {
    return this.carsPerPage;
  }

  setUpdateId(num: number) {
    this.updateId = num;
  }

  getUpdateId() {
    return this.updateId;
  }

  updateUpdateBlock(carName: string, carColor: string) {
    (this.updateBlock.firstChild as HTMLInputElement).value = carName;
    (this.updateBlock.children[1] as HTMLInputElement).value = carColor;
    this.updateBlock.classList.remove('disabled');
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

  updatePage(carsNumber: string, pageNumber: string, cars: CarProperties[]) {
    this.updateCarsNumber(carsNumber);
    this.updatePageNumber(pageNumber);
    this.updateRaceTrack(cars);
  }

  disablePrevButton(flag: boolean) {
    this.pagination.disablePrev(flag);
  }

  disableNextButton(flag: boolean) {
    this.pagination.disableNext(flag);
  }

  render() {
    return this.garage;
  }
}

export default Garage;
