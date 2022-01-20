import GarageManager from "../models/GarageManager";
import Garage from "../views/Garage";
import {Details, PageDetail} from "./CustomEvents";
import {getRandomCarName, getRandomHexColor} from "../util/generateRandom";
import {AllCars} from "../types/types";
import RaceManager from "../models/RaceManager";

class GaragePresenter {
  private readonly garageModel: GarageManager;
  private readonly raceModel: RaceManager;
  private readonly view: Garage;
  private readonly carsBatchSize: number;
  private currentGarageCarsCount: number;
  private currentPage: number;
  private carsPerPage: number;
  constructor(garageManager: GarageManager, raceManager: RaceManager, garage: Garage) {
    this.garageModel = garageManager;
    this.raceModel = raceManager;
    this.view = garage;
    this.carsBatchSize = 100;
    this.carsPerPage = 0;

    this.currentGarageCarsCount = 4;
    this.currentPage = 1;

    this.createHandler();
    this.updateHandler();
    this.generateCarsHandler();
    this.selectHandler();
    this.deleteHandler();
    this.paginationHandler();
  }

  async init() {
    this.carsPerPage = this.view.getCarsPerPage();
    await this.updateView();
    this.updatePaginationButtonsStyle();
  }

  async updateView() {
    const { cars, totalCars } = await this.garageModel.getCars(this.currentPage, this.carsPerPage) as AllCars;
    this.currentGarageCarsCount = Number(totalCars);
    this.view.updatePage(this.currentGarageCarsCount.toString(), this.currentPage.toString(), await cars);
  }

   createHandler() {
    document.addEventListener('create-car', (async (ev: CustomEvent<Details>) => {
      if (ev.detail.name) {
        if (ev.detail.color) {
          await this.garageModel.createCar(ev.detail.name, ev.detail.color);
          this.currentGarageCarsCount += 1;
          await this.updateView();
          this.updatePaginationButtonsStyle();
        }
      } else {
        alert('Car\'s name could not be empty!')
      }
    }) as unknown as EventListener)
  }

  updateHandler() {
    document.addEventListener('update-car', (async (ev: CustomEvent<Details>) => {
      if (ev.detail.name) {
        if (ev.detail.color && ev.detail.id) {
          await this.garageModel.updateCar(ev.detail.name, ev.detail.color, ev.detail.id);
          await this.updateView();
        }
      } else {
        alert('Car\'s name could not be empty!')
      }
    }) as unknown as EventListener)
  }

  generateCarsHandler() {
    document.addEventListener('generate-cars', (async () => {
      const promises: Promise<void | number>[] = [];
      for (let i = 0; i < this.carsBatchSize; i += 1) {
       promises.push(this.garageModel.createCar(getRandomCarName(), getRandomHexColor()))
      }
      await Promise.allSettled(promises);
      this.currentGarageCarsCount += 100;
      await this.updateView();
      this.updatePaginationButtonsStyle();
    }))
  }

  selectHandler() {
    document.addEventListener('select-car', (async (ev: CustomEvent<Details>) => {
      if (ev.detail.name && ev.detail.color && ev.detail.id) {
        this.view.setUpdateId(ev.detail.id);
        this.view.updateUpdateBlock(ev.detail.name, ev.detail.color);
      }
    }) as unknown as EventListener)
  }

  deleteHandler() {
    document.addEventListener('delete-car', (async (ev: CustomEvent<Details>) => {
      if (ev.detail.id) {
        await this.garageModel.deleteCar(ev.detail.id);
        this.currentGarageCarsCount -= 1;
        if (this.currentGarageCarsCount / this.carsPerPage <= this.currentPage - 1 && this.currentPage > 1) {
          this.currentPage -= 1;
        }
        await this.updateView();
        this.updatePaginationButtonsStyle();
      }
    }) as unknown as EventListener)
  }

  paginationHandler() {
    document.addEventListener('garage-pagination', (async (ev: CustomEvent<PageDetail>) => {
      if (ev.detail.currentPage > 0 && this.currentGarageCarsCount / this.carsPerPage > this.currentPage) {
        this.currentPage += 1;
        await this.updateView();
      }
      if (ev.detail.currentPage < 0 && this.currentPage > 1) {
        this.currentPage -= 1;
        await this.updateView();
      }
      this.updatePaginationButtonsStyle();
    }) as unknown as EventListener)
  }

  updatePaginationButtonsStyle() {
    if (this.currentPage === 1) {
      this.view.disablePrevButton(true);
    } else {
      this.view.disablePrevButton(false);
    }
    const maxPage = Math.ceil(this.currentGarageCarsCount / this.carsPerPage);
    if (this.currentPage < maxPage) {
      this.view.disableNextButton(false);
    } else {
      this.view.disableNextButton(true);
    }
  }
}

export default GaragePresenter;
