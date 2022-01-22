import WinnerManager from '../models/WinnerManager';
import Winners from '../views/Winners';
import Garage from '../views/Garage';
import { WinnerDetail } from './CustomEvents';
import GarageManager from '../models/GarageManager';
import { AllWinners, CarProperties } from '../types/types';

class WinnerPresenter {
  private readonly winnerModel: WinnerManager;

  private readonly garageModel: GarageManager;

  private readonly winnersView: Winners;

  private readonly garageView: Garage;

  private currentPage: number;

  private readonly winnersPerPage: number;

  private currentWinnersCount: number;

  constructor(
    garageManager: GarageManager,
    winnerManager: WinnerManager,
    garageView: Garage,
    winnersView: Winners,
  ) {
    this.garageModel = garageManager;
    this.winnerModel = winnerManager;
    this.winnersView = winnersView;
    this.garageView = garageView;
    this.currentWinnersCount = 1;
    this.currentPage = 1;
    this.winnersPerPage = this.winnersView.getWinnersPerPage();
    this.detectWinnerHandler();
  }

  async init() {
    await this.updateWinnersView();
  }

  async updateWinnersView() {
    const { totalWinners, winners } = await this.winnerModel.getWinners(
      this.currentPage,
      this.winnersPerPage,
    ) as AllWinners;
    this.winnersView.updatePageNumber(this.currentPage.toString());
    this.winnersView.updateWinnersNumber(totalWinners);
    const cars: Promise<CarProperties>[] = [];
    (await winners).forEach((winner) => {
      cars.push(this.getCarProperty(winner.id));
    });
    const carsRawData = await Promise.allSettled(cars);
    const carsData = (carsRawData
      .filter((r) => r.status === 'fulfilled') as PromiseFulfilledResult<CarProperties>[])
      .map((r) => r.value);
    this.winnersView.updateTable(carsData, await winners);
  }

  async getCarProperty(id: number): Promise<CarProperties> {
    return this.garageModel.getCar(id);
  }

  detectWinnerHandler() {
    document.addEventListener('winner', (async (ev: CustomEvent<WinnerDetail>) => {
      this.garageView.clearOtherWinners();
      this.garageView.toggleBlockUI();
      const carId = ev.detail.id;
      const carTime = Number((ev.detail.time / 1000).toFixed(3));
      const car = await this.garageModel.getCar(ev.detail.id);
      this.garageView.popupModal(`${car?.name} wins\n with time ${carTime} s`);
      const winner = await this.winnerModel.getWinner(carId);
      if (await winner) {
        if (winner.time > carTime) {
          await this.winnerModel.updateWinner({
            id: carId,
            wins: winner.id + 1,
            time: carTime,
          });
        }
      } else {
        await this.winnerModel.createWinner({
          id: carId,
          wins: 1,
          time: carTime,
        });
      }
    }) as unknown as EventListener);
  }
}

export default WinnerPresenter;
