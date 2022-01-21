import WinnerManager from '../models/WinnerManager';
import Winners from '../views/Winners';
import Garage from '../views/Garage';
import { WinnerDetail } from './CustomEvents';
import GarageManager from '../models/GarageManager';

class WinnerPresenter {
  private readonly winnerModel: WinnerManager;

  private readonly garageModel: GarageManager;

  private readonly winnersView: Winners;

  private readonly garageView: Garage;

  private currentPage: number;

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
    this.currentPage = 1;
    this.detectWinnerHandler();
  }

  // eslint-disable-next-line class-methods-use-this
  init() {
    //
  }

  detectWinnerHandler() {
    document.addEventListener('winner', (async (ev: CustomEvent<WinnerDetail>) => {
      this.garageView.clearOtherWinners();
      this.garageView.toggleBlockUI();
      const carId = ev.detail.id;
      const carTime = ev.detail.time;
      const car = await this.garageModel.getCar(ev.detail.id);
      this.garageView.popupModal(`${car?.name} wins\n with time ${(carTime / 1000).toFixed(3)} s`);
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
